import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { dbRepository } from "@/lib/db/repository";
import { CommunityReportForm } from "./CommunityReportForm";
import { MessageSquare } from "lucide-react";

export const instant = false;

export async function generateStaticParams() {
  const platforms = dbRepository.getPlatforms();
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
      title: "Platform Not Found | Countersign",
    };
  }

  const cleanName = platform.name.replace(/\[SAMPLE\]/g, "").trim();

  return {
    title: `Submit Community Experience Report for ${cleanName} | Countersign`,
    description: `Share honest, structured feedback on onboarding pay, task queue availability, and communication reality for ${cleanName}.`,
    alternates: {
      canonical: `https://countersign.ai/platforms/${slug}/report`,
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
        <ol className="flex items-center gap-2 text-xs font-mono text-secondary">
          <li>
            <Link href="/platforms" className="hover:text-primary transition-colors">
              Platforms
            </Link>
          </li>
          <li aria-hidden="true">/</li>
          <li>
            <Link
              href={`/platforms/${platform.slug}`}
              className="hover:text-primary transition-colors"
            >
              {cleanName}
            </Link>
          </li>
          <li aria-hidden="true">/</li>
          <li className="text-primary font-medium">Community Report</li>
        </ol>
      </nav>

      {/* Header */}
      <div className="space-y-3 border-b border-subtle pb-6">
        <div className="flex items-center gap-2 text-accent-cyan">
          <MessageSquare size={22} />
          <span className="text-xs font-mono uppercase tracking-wider font-semibold">
            Contributor Transparency
          </span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight text-primary">
          Submit Experience Report: {cleanName}
        </h1>
        <p className="text-sm text-readable leading-relaxed">
          Help fellow candidates understand what working on {cleanName} is actually like before they invest unpaid hours in assessments.
        </p>
      </div>

      {/* Form */}
      <div className="p-6 rounded-xl border border-subtle bg-surface space-y-6">
        <CommunityReportForm
          platformId={platform.id}
          platformName={cleanName}
          platformSlug={platform.slug}
        />
      </div>
    </div>
  );
}
