import { prisma } from './prisma';

const RATE_LIMIT_WINDOW = 60 * 60 * 1000; // 1 hour
const MAX_REQUESTS = parseInt(process.env.WAITLIST_RATE_LIMIT || '10');

export async function checkRateLimit(ipAddress: string): Promise<boolean> {
  try {
    const oneHourAgo = new Date(Date.now() - RATE_LIMIT_WINDOW);
    
    const recentSignups = await prisma.waitlist.count({
      where: {
        ipAddress,
        createdAt: {
          gte: oneHourAgo,
        },
      },
    });
    
    return recentSignups < MAX_REQUESTS;
  } catch (error) {
    console.error('Rate limit check error:', error);
    return true; // Fail open
  }
}