const STORAGE_KEYS = {
  STATS: 'shelterpoint_stats',
  USER_SIGNED_UP: 'shelterpoint_user_signup',
} as const;

const DEFAULT_STATS: WaitlistStats = {
  signupCount: 378,
  spotsLeft: 122,
  lastUpdated: Date.now(),
};

export function getWaitlistStats(): WaitlistStats {
  if (typeof window === 'undefined') return DEFAULT_STATS;
  
  try {
    const stored = localStorage.getItem(STORAGE_KEYS.STATS);
    if (!stored) return DEFAULT_STATS;
    
    const stats: WaitlistStats = JSON.parse(stored);
    const hoursSinceUpdate = (Date.now() - stats.lastUpdated) / (1000 * 60 * 60);
    
    // Reset if data is older than 24 hours
    if (hoursSinceUpdate > 24) {
      return DEFAULT_STATS;
    }
    
    return stats;
  } catch {
    return DEFAULT_STATS;
  }
}

export function updateWaitlistStats(increment: number = 1): WaitlistStats {
  if (typeof window === 'undefined') return DEFAULT_STATS;
  
  const current = getWaitlistStats();
  const updated: WaitlistStats = {
    signupCount: current.signupCount + increment,
    spotsLeft: Math.max(current.spotsLeft - increment, 50),
    lastUpdated: Date.now(),
  };
  
  try {
    localStorage.setItem(STORAGE_KEYS.STATS, JSON.stringify(updated));
  } catch {
    // Storage failed, continue anyway
  }
  
  return updated;
}

export function hasUserSignedUp(): boolean {
  if (typeof window === 'undefined') return false;
  return localStorage.getItem(STORAGE_KEYS.USER_SIGNED_UP) === 'true';
}

export function markUserSignedUp(): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(STORAGE_KEYS.USER_SIGNED_UP, 'true');
}