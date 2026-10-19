// Single source of truth for role status, sample identification, and clean labels

export interface RoleStatusResult {
  label: string;
  tone: 'sample' | 'accepted' | 'due' | 'not' | 'unconfirmed';
  isSample: boolean;
  colorClass: string;
  badgeClass: string;
}

export function isSampleRole(job: {
  title?: string;
  platform?: { name?: string } | null;
  platformName?: string;
  id?: string;
  is_sample?: boolean;
}): boolean {
  if (job.is_sample) return true;
  const title = job.title || '';
  const org = job.platform?.name || job.platformName || '';
  return (
    title.includes('[SAMPLE]') ||
    org.includes('[SAMPLE]') ||
    title.toLowerCase().includes('sample') ||
    org.toLowerCase().includes('sample')
  );
}

export function cleanRoleTitle(title: string): string {
  return title.replace(/\[SAMPLE\]/gi, '').trim();
}

export function cleanOrgName(name: string): string {
  return name.replace(/\[SAMPLE\]/gi, '').trim();
}

export function getShortRecordId(id?: string): string {
  if (!id) return '0142';
  // If it contains dashes (UUID), extract the last 4 characters or hex digits
  const clean = id.replace(/-/g, '');
  if (clean.length >= 4) {
    const last4 = clean.slice(-4).toUpperCase();
    return last4;
  }
  return id.padStart(4, '0');
}

/**
 * Single source of truth for role status.
 * Preserves isSample flag for pill badges while computing accurate eligibility status for location.
 */
export function getRoleStatus(
  job: {
    title?: string;
    platform?: { name?: string } | null;
    platformName?: string;
    id?: string;
    status?: string;
    isDue?: boolean;
    isSample?: boolean;
    eligibility?: Array<{ country_code: string; status: string }>;
  },
  countryCode: string = 'WW'
): RoleStatusResult {
  const isSample = job.isSample ?? isSampleRole(job);
  const isWorldwide =
    !countryCode ||
    countryCode.toUpperCase() === 'WW' ||
    countryCode.toUpperCase() === 'ALL' ||
    countryCode.toUpperCase() === 'GLOBAL';

  // Worldwide view
  if (isWorldwide) {
    if (job.status === 'needs_recheck' || job.status === 'due' || job.isDue) {
      return {
        label: 'Due for recheck',
        tone: 'due',
        isSample,
        colorClass: 'text-[var(--status-recheck)]',
        badgeClass:
          'bg-[var(--status-recheck-bg)] text-[var(--status-recheck)] border border-[var(--status-recheck)]/30 px-2 py-0.5 rounded text-xs font-semibold',
      };
    }
    return {
      label: 'Remote worldwide',
      tone: 'accepted',
      isSample,
      colorClass: 'text-[var(--status-accepted)]',
      badgeClass:
        'bg-[var(--status-accepted-bg)] text-[var(--status-accepted)] border border-[var(--status-accepted)]/30 px-2 py-0.5 rounded text-xs font-semibold',
    };
  }

  // Inspect eligibility for the requested country
  const elig = job.eligibility?.find(
    (e) => e.country_code.toUpperCase() === countryCode.toUpperCase()
  );

  const status = elig
    ? elig.status
    : job.eligibility && job.eligibility.length > 0
    ? 'unconfirmed'
    : job.status;

  if (status === 'accepted' || status === 'verified') {
    return {
      label: 'Accepted',
      tone: 'accepted',
      isSample,
      colorClass: 'text-[var(--status-accepted)]',
      badgeClass:
        'bg-[var(--status-accepted-bg)] text-[var(--status-accepted)] border border-[var(--status-accepted)]/30 px-2 py-0.5 rounded text-xs font-semibold',
    };
  }

  if (status === 'needs_recheck' || status === 'due' || job.isDue) {
    return {
      label: 'Due for recheck',
      tone: 'due',
      isSample,
      colorClass: 'text-[var(--status-recheck)]',
      badgeClass:
        'bg-[var(--status-recheck-bg)] text-[var(--status-recheck)] border border-[var(--status-recheck)]/30 px-2 py-0.5 rounded text-xs font-semibold',
    };
  }

  if (status === 'not_accepted' || status === 'not-accepted' || status === 'closed') {
    return {
      label: 'Not open',
      tone: 'not',
      isSample,
      colorClass: 'text-[var(--status-not-accepted)]',
      badgeClass:
        'bg-[var(--status-not-accepted-bg)] text-[var(--status-not-accepted)] border border-[var(--status-not-accepted)]/30 px-2 py-0.5 rounded text-xs font-semibold',
    };
  }

  return {
    label: 'Unconfirmed',
    tone: 'unconfirmed',
    isSample,
    colorClass: 'text-[var(--status-unconfirmed)]',
    badgeClass:
      'bg-[var(--status-unconfirmed-bg)] text-[var(--status-unconfirmed)] border border-[var(--status-unconfirmed)]/30 px-2 py-0.5 rounded text-xs font-semibold',
  };
}
