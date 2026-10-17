import { guideOne } from './how-to-tell-if-an-ai-work-listing-is-real';
import { guideTwo } from './getting-paid-in-usd-from-nigeria';
import { guideThree } from './checking-claims-against-sources-simple-method';
import { ALL_DRAFT_GUIDES } from './draftTemplates';
import { Guide } from './types';

export * from './types';
export * from './draftTemplates';

const PUBLISHED_GUIDES: Guide[] = [guideOne, guideTwo, guideThree];
const ALL_GUIDES: Guide[] = [...PUBLISHED_GUIDES, ...ALL_DRAFT_GUIDES];

/**
 * Returns guides. By default, returns only published guides.
 * If includeDrafts is true, returns both published and draft guides.
 */
export function getAllGuides(includeDrafts = false): Guide[] {
  return includeDrafts ? ALL_GUIDES : PUBLISHED_GUIDES;
}

/**
 * Returns a guide by slug from all guides (including drafts for editor preview).
 */
export function getGuideBySlug(slug: string): Guide | undefined {
  return ALL_GUIDES.find((g) => g.slug === slug);
}
