import { guideOne } from './how-to-tell-if-an-ai-work-listing-is-real';
import { guideTwo } from './getting-paid-in-usd-from-nigeria';
import { guideThree } from './checking-claims-against-sources-simple-method';
import { Guide } from './types';

export * from './types';

const GUIDES: Guide[] = [guideOne, guideTwo, guideThree];

export function getAllGuides(): Guide[] {
  return GUIDES;
}

export function getGuideBySlug(slug: string): Guide | undefined {
  return GUIDES.find((g) => g.slug === slug);
}
