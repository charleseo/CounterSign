import React from 'react';
import { dbRepository } from '@/lib/db/repository';
import { PlatformEditor } from './PlatformEditor';
import { PlatformStep } from '@/lib/db/types';
import { Layers } from 'lucide-react';
import { connection } from 'next/server';

export default async function AdminPlatformsPage() {
  await connection();
  const platforms = dbRepository.getPlatforms();
  const stepsMap: Record<string, PlatformStep[]> = {};

  platforms.forEach((p) => {
    stepsMap[p.id] = dbRepository.getPlatformSteps(p.id);
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-[var(--color-text)] flex items-center gap-2">
          <Layers className="w-5 h-5 text-[var(--color-accent)]" />
          <span>Platform Profiles &amp; 5-Step Timelines</span>
        </h1>
        <p className="text-xs sm:text-sm text-[var(--color-muted)] mt-0.5">
          Maintain transparent expectation timelines, assessment rubrics, and verified payout methods.
        </p>
      </div>

      <PlatformEditor initialPlatforms={platforms} initialSteps={stepsMap} />
    </div>
  );
}
