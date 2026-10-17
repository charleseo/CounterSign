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
  id?: string;
  is_sample?: boolean;
}): boolean {
  if (job.is_sample) return true;
  const title = job.title || '';
  const org = job.platform?.name || '';
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
 * While a role is sample data, show "Sample entry" (grey) everywhere and never "Verified" or "Accepted".
 */
export function getRoleStatus(
  job: {
    title?: string;
    platform?: { name?: string } | null;
    id?: string;
    status?: string;
    eligibility?: Array<{ country_code: string; status: string }>;
  },
  countryCode: string = 'NG'
): RoleStatusResult {
  if (isSampleRole(job)) {
    return {
      label: 'Sample entry',
      tone: 'sample',
      isSample: true,
      colorClass: 'text-secondary',
      badgeClass:
        'bg-subtle text-secondary border border-rule px-2 py-0.5 rounded text-xs font-semibold',
    };
  }

  // If live verified data, inspect eligibility for the requested country
  const elig = job.eligibility?.find(
    (e) => e.country_code.toUpperCase() === countryCode.toUpperCase()
  );

  const status = elig ? elig.status : job.status;

  if (status === 'accepted' || status === 'verified') {
    return {
      label: 'Accepted',
      tone: 'accepted',
      isSample: false,
      colorClass: 'text-[var(--status-accepted)]',
      badgeClass:
        'bg-[var(--status-accepted-bg)] text-[var(--status-accepted)] border border-[var(--status-accepted)]/30 px-2 py-0.5 rounded text-xs font-semibold',
    };
  }

  if (status === 'needs_recheck' || status === 'due') {
    return {
      label: 'Due for recheck',
      tone: 'due',
      isSample: false,
      colorClass: 'text-[var(--status-recheck)]',
      badgeClass:
        'bg-[var(--status-recheck-bg)] text-[var(--status-recheck)] border border-[var(--status-recheck)]/30 px-2 py-0.5 rounded text-xs font-semibold',
    };
  }

  if (status === 'not_accepted' || status === 'not-accepted' || status === 'closed') {
    return {
      label: 'Not open',
      tone: 'not',
      isSample: false,
      colorClass: 'text-[var(--status-not-accepted)]',
      badgeClass:
        'bg-[var(--status-not-accepted-bg)] text-[var(--status-not-accepted)] border border-[var(--status-not-accepted)]/30 px-2 py-0.5 rounded text-xs font-semibold',
    };
  }

  return {
    label: 'Unconfirmed',
    tone: 'unconfirmed',
    isSample: false,
    colorClass: 'text-[var(--status-unconfirmed)]',
    badgeClass:
      'bg-[var(--status-unconfirmed-bg)] text-[var(--status-unconfirmed)] border border-[var(--status-unconfirmed)]/30 px-2 py-0.5 rounded text-xs font-semibold',
  };
}
