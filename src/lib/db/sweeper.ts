import { dbRepository } from './repository';

export interface SweepResult {
  timestamp: string;
  degradedCount: number;
  closedCount: number;
  success: boolean;
  message: string;
}

/**
 * Sweeper function implementing Section 13.2 of the Master Plan:
 * 1. Verified roles with last_checked_at older than 14 days are downgraded to 'needs_recheck'
 * 2. Unverified roles lingering in 'needs_recheck' for > 30 days are marked 'closed' and hidden
 * 3. Every state change is recorded in check_log and audit_log
 */
export async function runJobSweeper(actor: string = 'cron-sweeper'): Promise<SweepResult> {
  try {
    const { degradedCount, closedCount } = dbRepository.runSweeper(actor);
    const timestamp = new Date().toISOString();

    return {
      timestamp,
      degradedCount,
      closedCount,
      success: true,
      message: `Sweeper completed successfully: ${degradedCount} degraded to needs_recheck, ${closedCount} closed due to >30 days staleness.`,
    };
  } catch (err: unknown) {
    const errorMessage = err instanceof Error ? err.message : 'Unknown error during sweeper execution';
    return {
      timestamp: new Date().toISOString(),
      degradedCount: 0,
      closedCount: 0,
      success: false,
      message: errorMessage,
    };
  }
}
