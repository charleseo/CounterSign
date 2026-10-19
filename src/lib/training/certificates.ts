export interface CertificateRecord {
  id: string;
  recipientName: string;
  courseTitle: string;
  scorePercent: number;
  issuedAt: string;
  status: 'verified' | 'revoked';
  competencies: string[];
}

const SEED_CERTIFICATES: Record<string, CertificateRecord> = {
  'TB-2026-A101': {
    id: 'TB-2026-A101',
    recipientName: 'Ebubechukwu Okeke',
    courseTitle: 'AI Model Evaluation & Citation Accuracy',
    scorePercent: 100,
    issuedAt: '2026-10-14T10:00:00.000Z',
    status: 'verified',
    competencies: [
      'Ground truth and technical documentation verification',
      'Hallucination and parameter drift detection',
      'Balanced 5-point pairwise rubric scoring',
      'Negative constraint verification and excerpt citation'
    ]
  },
  'TB-2026-B204': {
    id: 'TB-2026-B204',
    recipientName: 'Chioma Adeyemi',
    courseTitle: 'AI Model Evaluation & Citation Accuracy',
    scorePercent: 95,
    issuedAt: '2026-10-15T14:30:00.000Z',
    status: 'verified',
    competencies: [
      'Ground truth and technical documentation verification',
      'Hallucination and parameter drift detection',
      'Balanced 5-point pairwise rubric scoring',
      'Negative constraint verification and excerpt citation'
    ]
  },
  // Compatibility alias for previous CS-2026 IDs
  'CS-2026-A101': {
    id: 'CS-2026-A101',
    recipientName: 'Ebubechukwu Okeke',
    courseTitle: 'AI Model Evaluation & Citation Accuracy',
    scorePercent: 100,
    issuedAt: '2026-10-14T10:00:00.000Z',
    status: 'verified',
    competencies: [
      'Ground truth and technical documentation verification',
      'Hallucination and parameter drift detection',
      'Balanced 5-point pairwise rubric scoring',
      'Negative constraint verification and excerpt citation'
    ]
  }
};

const STORAGE_KEY = 'tracebase_issued_certificates';
const LEGACY_STORAGE_KEY = 'countersign_issued_certificates';

export function generateCertificateId(): string {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let rand = '';
  for (let i = 0; i < 4; i++) {
    rand += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return `TB-2026-${rand}`;
}

export function saveCertificate(record: CertificateRecord): void {
  if (typeof window === 'undefined') return;
  try {
    const existing = getStoredCertificates();
    existing[record.id.toUpperCase()] = record;
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(existing));
  } catch {
    // LocalStorage write fail
  }
}

function getStoredCertificates(): Record<string, CertificateRecord> {
  if (typeof window === 'undefined') return {};
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY) || window.localStorage.getItem(LEGACY_STORAGE_KEY);
    if (!raw) return {};
    return JSON.parse(raw);
  } catch {
    return {};
  }
}

export function getCertificateById(id: string): CertificateRecord | null {
  const cleanId = id.trim().toUpperCase();

  // Check seed certificates first
  if (SEED_CERTIFICATES[cleanId]) {
    return SEED_CERTIFICATES[cleanId];
  }

  // Check client localStorage if in browser
  const stored = getStoredCertificates();
  if (stored[cleanId]) {
    return stored[cleanId];
  }

  return null;
}
