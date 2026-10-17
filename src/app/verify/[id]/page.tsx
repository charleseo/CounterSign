import { Metadata } from 'next';
import { CertificateVerifyClient } from './CertificateVerifyClient';

interface PageProps {
  params: Promise<{ id: string }>;
}

export function generateStaticParams() {
  return [
    { id: 'TB-2026-A101' },
    { id: 'TB-2026-B204' },
    { id: 'CS-2026-A101' },
  ];
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  return {
    title: `Verify certificate ${id} | TraceBase`,
    description: `Public credential verification record for ${id} on the TraceBase registry.`,
    alternates: {
      canonical: `/verify/${id}`,
    },
  };
}

export default async function CertificateVerifyPage({ params }: PageProps) {
  const { id } = await params;
  return <CertificateVerifyClient id={id} />;
}
