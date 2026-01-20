import { prisma } from './prisma';

interface AnalyticsEvent {
  event: string;
  data?: Record<string, any>;
  ipAddress?: string;
  userAgent?: string;
}

export async function trackEvent(eventData: AnalyticsEvent) {
  try {
    await prisma.analytics.create({
      data: {
        event: eventData.event,
        data: eventData.data || {},
        ipAddress: eventData.ipAddress,
        userAgent: eventData.userAgent,
      },
    });
  } catch (error) {
    console.error('Analytics tracking error:', error);
  }
}

export async function getGlobalStats() {
  try {
    let stats = await prisma.globalStats.findFirst();
    
    if (!stats) {
      // Initialize stats
      stats = await prisma.globalStats.create({
        data: {
          signupCount: 0,
          spotsLeft: 500,
        },
      });
    }
    
    return stats;
  } catch (error) {
    console.error('Get stats error:', error);
    return {
      signupCount: 0,
      spotsLeft: 500,
      lastUpdated: new Date(),
    };
  }
}

export async function incrementSignupCount() {
  try {
    const stats = await prisma.globalStats.findFirst();
    
    if (stats) {
      return await prisma.globalStats.update({
        where: { id: stats.id },
        data: {
          signupCount: { increment: 1 },
          spotsLeft: { decrement: 1 },
          lastUpdated: new Date(),
        },
      });
    }
    
    return await prisma.globalStats.create({
      data: {
        signupCount: 1,
        spotsLeft: 499,
      },
    });
  } catch (error) {
    console.error('Increment stats error:', error);
    throw error;
  }
}