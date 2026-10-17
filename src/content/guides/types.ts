export interface GuideSection {
  id: string;
  heading: string;
  content: string; // Markdown or clean paragraphs
  callout?: {
    type: 'tip' | 'warning' | 'info';
    title: string;
    text: string;
  };
}

export interface GuideSource {
  title: string;
  url: string;
  label: 'official' | 'reported' | 'statute';
  notes?: string;
}

export interface PracticeExercise {
  id: string;
  title: string;
  scenario: string;
  prompt: string;
  optionA: {
    label: string;
    text: string;
  };
  optionB: {
    label: string;
    text: string;
  };
  targetConstraint: {
    minSentences: number;
    maxSentences: number;
    instructionText: string;
  };
  modelAnswer: {
    preferredOption: 'A' | 'B' | 'Both flawed';
    rationale: string;
    keyAuditPrinciple: string;
  };
}

export interface Guide {
  slug: string;
  title: string;
  subtitle: string;
  readingTime: string;
  lastUpdated: string;
  author: {
    name: string;
    title: string;
  };
  topicTags: string[];
  summaryPoints: string[];
  sections: GuideSection[];
  sources: GuideSource[];
  practiceExercise?: PracticeExercise;
  relatedWorkTypes?: string[];
  lastCheckedDate?: string;
  checkedBy?: string;
  published?: boolean;
}
