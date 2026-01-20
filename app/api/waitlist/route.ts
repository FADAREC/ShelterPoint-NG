import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { prisma } from '@/lib/prisma';
import { sendWelcomeEmail, sendAdminNotification } from '@/lib/email';
import { trackEvent, incrementSignupCount } from '@/lib/analytics';
import { checkRateLimit } from '@/lib/rate-limit';

const waitlistSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').max(100),
  email: z.string().email('Invalid email address'),
  role: z.enum(['seeker', 'owner', 'both'], {
    errorMap: () => ({ message: 'Please select a valid role' }),
  }),
  area: z.string().min(1, 'Please select an area'),
});

export async function POST(request: NextRequest) {
  try {
    const ipAddress = request.headers.get('x-forwarded-for') || 
                      request.headers.get('x-real-ip') || 
                      'unknown';
    const userAgent = request.headers.get('user-agent') || 'unknown';
    const referrer = request.headers.get('referer') || null;

    const isAllowed = await checkRateLimit(ipAddress);
    if (!isAllowed) {
      await trackEvent({
        event: 'signup_rate_limited',
        ipAddress,
        userAgent,
      });
      
      return NextResponse.json(
        { error: 'Too many signup attempts. Please try again in an hour.' },
        { status: 429 }
      );
    }

    const body = await request.json();
    const validationResult = waitlistSchema.safeParse(body);

    if (!validationResult.success) {
      const errors = validationResult.error.flatten().fieldErrors;
      return NextResponse.json({ errors }, { status: 400 });
    }

    const data = validationResult.data;

    const existing = await prisma.waitlist.findUnique({
      where: { email: data.email },
    });

    if (existing) {
      return NextResponse.json(
        { error: 'This email is already on the waitlist.' },
        { status: 409 }
      );
    }

    // Create waitlist entry
    const waitlistEntry = await prisma.waitlist.create({
      data: {
        name: data.name,
        email: data.email,
        role: data.role,
        area: data.area,
        ipAddress,
        userAgent,
        referrer,
      },
    });

    const stats = await incrementSignupCount();

    // Send welcome email
    const emailResult = await sendWelcomeEmail({
      name: data.name,
      email: data.email,
      role: data.role,
      area: data.area,
      spotNumber: stats.signupCount,
    });

    if (emailResult.success) {
      await prisma.waitlist.update({
        where: { id: waitlistEntry.id },
        data: {
          emailSent: true,
          emailSentAt: new Date(),
        },
      });
    }

    sendAdminNotification({
      name: data.name,
      email: data.email,
      role: data.role,
      area: data.area,
      spotNumber: stats.signupCount,
    }).catch(err => console.error('Admin notification failed:', err));

    await trackEvent({
      event: 'signup_success',
      data: {
        role: data.role,
        area: data.area,
        spotNumber: stats.signupCount,
      },
      ipAddress,
      userAgent,
    });

    return NextResponse.json({
      success: true,
      message: 'Successfully joined waitlist',
      spotNumber: stats.signupCount,
    });

  } catch (error) {
    console.error('Waitlist API error:', error);
    
    // Track error
    await trackEvent({
      event: 'signup_error',
      data: { error: String(error) },
    }).catch(() => {});

    return NextResponse.json(
      { error: 'An error occurred. Please try again.' },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const stats = await prisma.globalStats.findFirst();
    
    return NextResponse.json({
      signupCount: stats?.signupCount || 0,
      spotsLeft: stats?.spotsLeft || 500,
      lastUpdated: stats?.lastUpdated || new Date(),
    });
  } catch (error) {
    console.error('Stats API error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch stats' },
      { status: 500 }
    );
  }
}