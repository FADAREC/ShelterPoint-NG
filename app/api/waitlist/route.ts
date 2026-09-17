import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { prisma } from '@/lib/prisma';
import { sendWelcomeEmail, sendAdminNotification } from '@/lib/email';
import { trackEvent, incrementSignupCount } from '@/lib/analytics';
import { checkRateLimit } from '@/lib/rate-limit';

const emailSchema = z.object({
  email: z.string().email('Invalid email address'),
  referralCode: z.string().optional(),
});

const profileSchema = z.object({
  email: z.string().email(),
  name: z.string().min(2, 'Name must be at least 2 characters').max(100),
  role: z.enum(['seeker', 'owner', 'both']),
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
        { error: 'Too many attempts. Please try again later.' },
        { status: 429 }
      );
    }

    const body = await request.json();

    // Progressive profile completion
    if (body.name && body.role && body.area) {
      const profileResult = profileSchema.safeParse(body);
      if (!profileResult.success) {
        return NextResponse.json(
          { errors: profileResult.error.flatten().fieldErrors },
          { status: 400 }
        );
      }

      const data = profileResult.data;
      const existing = await prisma.waitlist.findUnique({
        where: { email: data.email },
      });

      if (!existing) {
        return NextResponse.json(
          { error: 'Please join the waitlist first with your email.' },
          { status: 404 }
        );
      }

      const updated = await prisma.waitlist.update({
        where: { email: data.email },
        data: {
          name: data.name,
          role: data.role,
          area: data.area,
          profileCompleted: true,
        },
      });

      await trackEvent({
        event: 'profile_completed',
        data: { role: data.role, area: data.area },
        ipAddress,
        userAgent,
      });

      return NextResponse.json({
        success: true,
        message: 'Profile completed',
        referralCode: updated.referralCode,
        inspectionCredits: updated.inspectionCredits,
      });
    }

    // Email-only signup
    const emailResult = emailSchema.safeParse(body);
    if (!emailResult.success) {
      return NextResponse.json(
        { errors: emailResult.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    const { email, referralCode } = emailResult.data;

    const existing = await prisma.waitlist.findUnique({
      where: { email },
    });

    if (existing) {
      return NextResponse.json({
        success: true,
        message: 'Already on the waitlist',
        spotNumber: 0,
        referralCode: existing.referralCode,
        alreadyExists: true,
      }, { status: 409 });
    }

    // Handle referral
    let referredBy: string | null = null;
    if (referralCode) {
      const referrer = await prisma.waitlist.findUnique({
        where: { referralCode },
      });
      if (referrer) {
        referredBy = referralCode;
        await prisma.waitlist.update({
          where: { id: referrer.id },
          data: {
            referralCount: { increment: 1 },
            inspectionCredits: { increment: 1 },
          },
        });
        await trackEvent({
          event: 'referral_converted',
          data: { referrerCode: referralCode },
          ipAddress,
          userAgent,
        });
      }
    }

    const waitlistEntry = await prisma.waitlist.create({
      data: {
        email,
        referredBy,
        ipAddress,
        userAgent,
        referrer,
      },
    });

    const stats = await incrementSignupCount();

    // Fire and forget emails
    sendWelcomeEmail({
      name: email.split('@')[0],
      email,
      role: 'pending',
      area: 'pending',
      spotNumber: stats.signupCount,
      referralCode: waitlistEntry.referralCode,
    }).then(async (result) => {
      if (result.success) {
        await prisma.waitlist.update({
          where: { id: waitlistEntry.id },
          data: {
            emailSent: true,
            emailSentAt: new Date(),
          },
        });
      }
    }).catch(console.error);

    sendAdminNotification({
      name: email.split('@')[0],
      email,
      role: 'pending',
      area: 'pending',
      spotNumber: stats.signupCount,
    }).catch(console.error);

    await trackEvent({
      event: 'signup_success',
      data: {
        spotNumber: stats.signupCount,
        hasReferral: !!referredBy,
      },
      ipAddress,
      userAgent,
    });

    return NextResponse.json({
      success: true,
      message: 'Successfully joined waitlist',
      spotNumber: stats.signupCount,
      referralCode: waitlistEntry.referralCode,
    });

  } catch (error) {
    console.error('Waitlist API error:', error);

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
