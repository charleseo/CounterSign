import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { dbRepository } from "@/lib/db/repository";
import { CommunityReportForm } from "./CommunityReportForm";
import { MessageSquare } from "lucide-react";
import { absoluteUrl } from "@/lib/utils/siteUrl";

export const instant = false;

export async function generateStaticParams() {
  const platforms = dbRepository.getPlatforms({ includeSample: true });
  if (platforms.length === 0) {
    return [{ slug: 'outlier' }];
  }
  return platforms.map((p) => ({ slug: p.slug }));
}

interface PlatformReportPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params,
}: PlatformReportPageProps): Promise<Metadata> {
  const { slug } = await params;
  const platform = dbRepository.getPlatformBySlug(slug);

  if (!platform) {
    return {
      title: "Platform Not Found | TraceBase",
    };
  }

  const cleanName = platform.name.replace(/\[SAMPLE\]/g, "").trim();

  return {
    title: `Submit Community Experience Report for ${cleanName} | TraceBase`,
    description: `Share honest, structured feedback on onboarding pay, task queue availability, and communication reality for ${cleanName}.`,
    alternates: {
      canonical: absoluteUrl(`/platforms/${slug}/report`),
    },
  };
}

export default async function PlatformReportPage({
  params,
}: PlatformReportPageProps) {
  const { slug } = await params;
  const platform = dbRepository.getPlatformBySlug(slug);

  if (!platform) {
    notFound();
  }

  const cleanName = platform.name.replace(/\[SAMPLE\]/g, "").trim();

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 py-8 sm:py-12 space-y-8">
      {/* Breadcrumb Navigation */}
      <nav aria-label="Breadcrumb">
        <ol className="flex items-center gap-2 text-xs text-secondary">
          <li>
            <Link href="/platforms" className="hover:text-ink transition-colors">
              Platforms
            </Link>
          </li>
          <li aria-hidden="true" className="text-muted">/</li>
          <li>
            <Link
              href={`/platforms/${platform.slug}`}
              className="hover:text-ink transition-colors"
            >
              {cleanName}
            </Link>
          </li>
          <li aria-hidden="true" className="text-muted">/</li>
          <li className="text-ink font-medium">Community Report</li>
        </ol>
      </nav>

      {/* Header */}
      <div className="space-y-3 border-b border-rule pb-6">
        <div className="flex items-center gap-2 text-brand-violet">
          <MessageSquare size={20} />
          <span className="text-xs font-semibold">
            Contributor feedback
          </span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight text-ink">
          Submit experience report: {cleanName}
        </h1>
        <p className="text-sm text-secondary leading-relaxed">
          Help fellow candidates understand what working on {cleanName} is actually like before they invest unpaid hours in assessments.
        </p>
      </div>

      {/* Form */}
      <div className="p-6 rounded-xl border border-rule bg-sheet space-y-6">
        <CommunityReportForm
          platformId={platform.id}
          platformName={cleanName}
          platformSlug={platform.slug}
        />
      </div>
    </div>
  );
}
