'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  FileCheck2,
  Award,
  Clock,
  ArrowRight,
  CheckCircle2,
  AlertTriangle,
  RotateCcw,
  ExternalLink,
  BookOpen,
  HelpCircle,
  Sparkles,
  ShieldCheck,
  Copy,
  Check,
  FolderOpen,
} from 'lucide-react';
import { COURSE_MODULES, ASSESSMENT_QUESTIONS, EVALUATOR_RESOURCES, EvaluatorResource } from '@/lib/training/courseData';
import { generateCertificateId, saveCertificate, CertificateRecord } from '@/lib/training/certificates';
import { EvaluationSandbox } from '@/components/training/EvaluationSandbox';
import { AssessmentSimulator } from '@/components/training/AssessmentSimulator';

export default function TrainingPage() {
  const [activeTab, setActiveTab] = useState<'modules' | 'sandbox' | 'simulator' | 'assessment' | 'resources'>('modules');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const tabParam = params.get('tab');
      if (
        tabParam === 'simulator' ||
        tabParam === 'sandbox' ||
        tabParam === 'assessment' ||
        tabParam === 'resources' ||
        tabParam === 'modules'
      ) {
        setActiveTab(tabParam as 'modules' | 'sandbox' | 'simulator' | 'assessment' | 'resources');
      }
    }
  }, []);
  const [selectedModuleId, setSelectedModuleId] = useState<string>(COURSE_MODULES[0].id);
  const [selectedResourceCategory, setSelectedResourceCategory] = useState<string>('All');
  const [copiedFormulaId, setCopiedFormulaId] = useState<string | null>(null);

  // Assessment state
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [recipientName, setRecipientName] = useState<string>('');
  const [issuedCertificate, setIssuedCertificate] = useState<CertificateRecord | null>(null);

  const currentModule = COURSE_MODULES.find((m) => m.id === selectedModuleId) || COURSE_MODULES[0];

  const handleSelectOption = (questionId: string, optionId: string) => {
    if (isSubmitted) return;
    setAnswers((prev) => ({
      ...prev,
      [questionId]: optionId,
    }));
  };

  const calculateScore = () => {
    let correct = 0;
    ASSESSMENT_QUESTIONS.forEach((q) => {
      const selectedId = answers[q.id];
      const correctOption = q.options.find((opt) => opt.isCorrect);
      if (selectedId && correctOption && selectedId === correctOption.id) {
        correct += 1;
      }
    });
    return {
      correct,
      total: ASSESSMENT_QUESTIONS.length,
      percentage: Math.round((correct / ASSESSMENT_QUESTIONS.length) * 100),
    };
  };

  const scoreResult = isSubmitted ? calculateScore() : null;
  const isPassed = scoreResult ? scoreResult.percentage >= 80 : false;

  const handleSubmitAssessment = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  const handleResetAssessment = () => {
    setAnswers({});
    setIsSubmitted(false);
    setIssuedCertificate(null);
  };

  const handleGenerateCertificate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!recipientName.trim() || !scoreResult) return;

    const certId = generateCertificateId();
    const newCert: CertificateRecord = {
      id: certId,
      recipientName: recipientName.trim(),
      courseTitle: 'AI Model Evaluation & Citation Accuracy',
      scorePercent: scoreResult.percentage,
      issuedAt: new Date().toISOString(),
      status: 'verified',
      competencies: [
        'Ground truth and technical documentation verification',
        'Hallucination and parameter drift detection',
        'Balanced 5-point pairwise rubric scoring',
        'Negative constraint verification and excerpt citation',
      ],
    };

    saveCertificate(newCert);
    setIssuedCertificate(newCert);
  };

  return (
    <div className="min-h-screen bg-canvas text-ink pt-28 pb-20">
      <div className="max-w-[1160px] mx-auto px-4 sm:px-8">
        {/* Navigation Breadcrumb */}
        <div className="mb-6 flex items-center gap-2 text-xs font-semibold text-secondary">
          <Link href="/" className="hover:text-ink transition-colors">
            Home
          </Link>
          <span aria-hidden="true">/</span>
          <span className="text-ink">Evaluation training</span>
        </div>

        {/* Hero Header */}
        <header className="mb-12 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[var(--brand-ink)]/30 bg-[var(--brand-ink)]/10 text-xs font-bold text-[var(--brand-ink)] mb-4">
            <Award size={13} aria-hidden="true" />
            <span>AI evaluation training and certificate</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-ink leading-[1.08] mb-4">
            Learn how to evaluate AI answers by checking real ground truth.
          </h1>

          <p className="text-base sm:text-lg text-secondary leading-relaxed mb-6">
            A practical, evidence-first course for model evaluators. Master citation checking,
            spot subtle hallucinations, apply 5-point pairwise rubrics, and earn an independent competency certificate.
          </p>

          <div className="flex flex-wrap items-center gap-4 text-xs font-semibold text-secondary">
            <span className="inline-flex items-center gap-1.5">
              <BookOpen size={14} className="text-[var(--brand-ink)]" />
              7 practical modules
            </span>
            <span aria-hidden="true">&bull;</span>
            <span className="inline-flex items-center gap-1.5">
              <Clock size={14} className="text-[var(--brand-ink)]" />
              Under 60 minutes
            </span>
            <span aria-hidden="true">&bull;</span>
            <span className="inline-flex items-center gap-1.5">
              <FileCheck2 size={14} className="text-teal-400" />
              100% free with verifiable ID
            </span>
          </div>
        </header>

        {/* Mode Switcher Tabs */}
        <div className="flex border-b border-subtle mb-8 gap-2 overflow-x-auto">
          <button
            type="button"
            onClick={() => setActiveTab('modules')}
            className={`pb-3 px-3 text-sm font-bold border-b-2 transition-colors cursor-pointer whitespace-nowrap ${
              activeTab === 'modules'
                ? 'border-[var(--brand-ink)] text-ink'
                : 'border-transparent text-secondary hover:text-ink'
            }`}
          >
            1. Learning modules
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('sandbox')}
            className={`pb-3 px-3 text-sm font-bold border-b-2 transition-colors cursor-pointer inline-flex items-center gap-1.5 whitespace-nowrap ${
              activeTab === 'sandbox'
                ? 'border-[var(--brand-ink)] text-ink'
                : 'border-transparent text-secondary hover:text-ink'
            }`}
          >
            <Sparkles size={14} className="text-[var(--brand-ink)]" />
            <span>2. Practice sandbox</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('simulator')}
            className={`pb-3 px-3 text-sm font-bold border-b-2 transition-colors cursor-pointer inline-flex items-center gap-1.5 whitespace-nowrap ${
              activeTab === 'simulator'
                ? 'border-[var(--brand-ink)] text-ink'
                : 'border-transparent text-secondary hover:text-ink'
            }`}
          >
            <ShieldCheck size={14} className="text-[var(--brand-ink)]" />
            <span>3. Mock screening test</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('assessment')}
            className={`pb-3 px-3 text-sm font-bold border-b-2 transition-colors cursor-pointer inline-flex items-center gap-2 whitespace-nowrap ${
              activeTab === 'assessment'
                ? 'border-[var(--brand-ink)] text-ink'
                : 'border-transparent text-secondary hover:text-ink'
            }`}
          >
            <span>4. Competency assessment</span>
            {isPassed && (
              <span className="w-2 h-2 rounded-full bg-teal-400" aria-label="Assessment passed" />
            )}
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('resources')}
            className={`pb-3 px-3 text-sm font-bold border-b-2 transition-colors cursor-pointer inline-flex items-center gap-1.5 whitespace-nowrap ${
              activeTab === 'resources'
                ? 'border-[var(--brand-ink)] text-ink'
                : 'border-transparent text-secondary hover:text-ink'
            }`}
          >
            <FolderOpen size={14} className="text-[var(--brand-ink)]" />
            <span>5. Resource library & rubrics</span>
          </button>
        </div>

        {/* TAB 1: LEARNING MODULES */}
        {activeTab === 'modules' && (
          <div className="grid grid-cols-1 lg:grid-cols-[300px_minmax(0,1fr)] gap-8 items-start">
            {/* Sidebar Module List */}
            <nav aria-label="Course modules" className="space-y-2">
              {COURSE_MODULES.map((mod) => {
                const isSelected = mod.id === selectedModuleId;
                return (
                  <button
                    key={mod.id}
                    type="button"
                    onClick={() => setSelectedModuleId(mod.id)}
                    className={`w-full text-left p-4 rounded-xl border transition-all text-xs cursor-pointer ${
                      isSelected
                        ? 'border-[var(--brand-ink)] bg-sheet text-ink shadow-sm'
                        : 'border-subtle bg-surface hover:bg-sheet text-secondary hover:text-ink'
                    }`}
                  >
                    <div className="flex items-center justify-between text-[11px] font-semibold text-muted mb-1">
                      <span>Module {mod.number}</span>
                      <span>{mod.estimatedMinutes} mins</span>
                    </div>
                    <div className="font-bold text-sm text-ink leading-snug">{mod.title}</div>
                  </button>
                );
              })}

              <div className="pt-4">
                <button
                  type="button"
                  onClick={() => setActiveTab('assessment')}
                  className="w-full cs-btn cs-btn-primary py-3 text-xs font-bold flex items-center justify-center gap-2"
                >
                  <span>Take competency test</span>
                  <ArrowRight size={14} />
                </button>
              </div>
            </nav>

            {/* Module Detail Card */}
            <article className="rounded-2xl border border-rule bg-sheet p-6 sm:p-8 space-y-6">
              <div className="flex items-center justify-between gap-4 pb-4 border-b border-subtle">
                <div>
                  <span className="text-xs font-bold text-[var(--brand-ink)] uppercase tracking-wider">
                    Module {currentModule.number}
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-ink mt-1">
                    {currentModule.title}
                  </h2>
                </div>
                <span className="text-xs font-semibold text-secondary shrink-0">
                  {currentModule.estimatedMinutes} min read
                </span>
              </div>

              <p className="text-base text-secondary leading-relaxed m-0">
                {currentModule.summary}
              </p>

              <div>
                <h3 className="text-sm font-bold text-ink uppercase tracking-wider mb-3">
                  Key evaluation rules
                </h3>
                <ul className="space-y-2.5 m-0 p-0 list-none text-sm text-secondary">
                  {currentModule.keyPoints.map((point, i) => (
                    <li key={i} className="flex items-start gap-2.5">
                      <CheckCircle2 size={16} className="text-teal-400 shrink-0 mt-0.5" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {currentModule.exampleSnippet && (
                <div className="rounded-xl border border-rule bg-surface p-5 space-y-3.5 text-xs">
                  <div className="font-bold text-ink text-sm flex items-center gap-2">
                    <Sparkles size={14} className="text-[var(--brand-ink)]" />
                    <span>Real-world evaluation audit example</span>
                  </div>

                  <div>
                    <span className="text-secondary block font-semibold">User inquiry:</span>
                    <span className="text-ink font-medium">{currentModule.exampleSnippet.prompt}</span>
                  </div>

                  <div>
                    <span className="text-secondary block font-semibold">Ground truth documentation:</span>
                    <blockquote className="m-0 pl-3 border-l-2 border-teal-500 text-ink bg-teal-500/5 py-1.5 rounded-r">
                      {currentModule.exampleSnippet.referenceDocs}
                    </blockquote>
                  </div>

                  <div>
                    <span className="text-secondary block font-semibold">Model generated answer:</span>
                    <blockquote className="m-0 pl-3 border-l-2 border-amber-500 text-ink bg-amber-500/5 py-1.5 rounded-r">
                      {currentModule.exampleSnippet.candidateAnswer}
                    </blockquote>
                  </div>

                  <div className="pt-2 border-t border-subtle text-readable">
                    <strong className="text-amber-400 block mb-0.5">Evaluator verdict:</strong>
                    <span>{currentModule.exampleSnippet.flawExplanation}</span>
                  </div>
                </div>
              )}

              <div className="pt-4 flex items-center justify-between border-t border-subtle">
                <span className="text-xs text-muted">Ready to test your accuracy?</span>
                <button
                  type="button"
                  onClick={() => setActiveTab('assessment')}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-[var(--brand-ink)] hover:underline"
                >
                  <span>Go to competency test</span>
                  <ArrowRight size={13} />
                </button>
              </div>
            </article>
          </div>
        )}

        {/* TAB 2: COMPETENCY ASSESSMENT */}
        {activeTab === 'assessment' && (
          <div className="max-w-3xl mx-auto space-y-8">
            {/* Header info */}
            <div className="rounded-2xl border border-subtle bg-surface p-6 space-y-2 text-xs">
              <h2 className="text-base font-bold text-ink">Evaluation competency assessment</h2>
              <p className="text-secondary leading-relaxed m-0">
                Answer each of the 5 realistic evaluation questions below. You must achieve at least 80% (4 out of 5 correct)
                to pass and receive your verifiable TraceBase Certificate of Competency.
              </p>
            </div>

            {/* Assessment Form */}
            <form onSubmit={handleSubmitAssessment} className="space-y-8">
              {ASSESSMENT_QUESTIONS.map((q) => {
                const selectedOptionId = answers[q.id];
                const isCorrectOption = q.options.find((opt) => opt.isCorrect)?.id;

                return (
                  <article
                    key={q.id}
                    className="rounded-2xl border border-rule bg-sheet p-6 sm:p-7 space-y-4"
                  >
                    <div className="flex items-center justify-between text-xs font-bold text-secondary pb-2 border-b border-subtle">
                      <span>Question {q.questionNumber} of {ASSESSMENT_QUESTIONS.length}</span>
                      <span className="text-muted font-normal">{q.scenario}</span>
                    </div>

                    {/* Reference text box */}
                    <div className="rounded-xl border border-teal-500/30 bg-teal-500/5 p-4 text-xs space-y-1">
                      <span className="font-bold text-teal-300 block">Ground truth documentation:</span>
                      <p className="text-ink leading-relaxed m-0">{q.referenceText}</p>
                    </div>

                    {/* Two competing models */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                      <div className="p-3.5 rounded-lg border border-rule bg-surface space-y-1">
                        <strong className="text-ink block">Model A completion:</strong>
                        <p className="text-secondary leading-relaxed m-0">{q.modelA}</p>
                      </div>
                      <div className="p-3.5 rounded-lg border border-rule bg-surface space-y-1">
                        <strong className="text-ink block">Model B completion:</strong>
                        <p className="text-secondary leading-relaxed m-0">{q.modelB}</p>
                      </div>
                    </div>

                    {/* Question choices */}
                    <div className="space-y-2 pt-2">
                      <span className="text-xs font-bold text-ink block">Your evaluation verdict:</span>
                      {q.options.map((opt) => {
                        const isChosen = selectedOptionId === opt.id;
                        let optionStyle = 'border-subtle bg-surface hover:bg-elevated text-secondary';

                        if (isSubmitted) {
                          if (opt.isCorrect) {
                            optionStyle = 'border-teal-500 bg-teal-500/10 text-teal-200 font-semibold';
                          } else if (isChosen && !opt.isCorrect) {
                            optionStyle = 'border-red-500 bg-red-500/10 text-red-300';
                          }
                        } else if (isChosen) {
                          optionStyle = 'border-[var(--brand-ink)] bg-[var(--brand-ink)]/10 text-ink font-semibold';
                        }

                        return (
                          <label
                            key={opt.id}
                            className={`flex items-start gap-3 p-3.5 rounded-xl border text-xs cursor-pointer transition-all ${optionStyle}`}
                          >
                            <input
                              type="radio"
                              name={q.id}
                              value={opt.id}
                              checked={isChosen}
                              onChange={() => handleSelectOption(q.id, opt.id)}
                              disabled={isSubmitted}
                              className="mt-0.5 accent-[var(--brand-ink)]"
                            />
                            <span className="leading-relaxed">{opt.text}</span>
                          </label>
                        );
                      })}
                    </div>

                    {/* Post-submission explanation */}
                    {isSubmitted && (
                      <div className="pt-3 border-t border-subtle text-xs space-y-1">
                        <div className="font-bold flex items-center gap-1.5 text-ink">
                          <HelpCircle size={13} className="text-[var(--brand-ink)]" />
                          <span>Evaluation explanation:</span>
                        </div>
                        <p className="text-secondary leading-relaxed m-0">{q.explanation}</p>
                      </div>
                    )}
                  </article>
                );
              })}

              {/* Submit / Reset Actions */}
              {!isSubmitted ? (
                <div className="flex justify-end pt-2">
                  <button
                    type="submit"
                    disabled={Object.keys(answers).length < ASSESSMENT_QUESTIONS.length}
                    className="cs-btn cs-btn-primary px-8 py-3.5 text-sm font-bold disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                  >
                    Grade my assessment
                  </button>
                </div>
              ) : (
                <div className="rounded-2xl border border-rule bg-sheet p-6 sm:p-8 space-y-6">
                  {/* Score Banner */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-subtle">
                    <div>
                      <span className="text-xs font-bold uppercase tracking-wider text-secondary">
                        Assessment result
                      </span>
                      <h3 className="text-2xl font-extrabold text-ink mt-0.5">
                        {isPassed ? 'Congratulations, you passed!' : 'Score below 80% passing threshold'}
                      </h3>
                      <p className="text-xs text-secondary mt-1 m-0">
                        You scored {scoreResult?.correct} out of {scoreResult?.total} ({scoreResult?.percentage}%).
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={handleResetAssessment}
                      className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg border border-rule bg-surface hover:bg-sheet text-xs font-semibold text-ink transition-colors cursor-pointer self-start"
                    >
                      <RotateCcw size={13} />
                      <span>Retake assessment</span>
                    </button>
                  </div>

                  {/* Certificate Generation Area */}
                  {isPassed && !issuedCertificate ? (
                    <form onSubmit={handleGenerateCertificate} className="space-y-4 max-w-md">
                      <div className="space-y-1">
                        <label htmlFor="recipient-name" className="text-xs font-bold text-ink block">
                          Enter your full name for your certificate:
                        </label>
                        <p className="text-xs text-secondary m-0">
                          This name will be embedded on your digital certificate and public verification registry.
                        </p>
                      </div>

                      <div className="flex gap-2">
                        <input
                          id="recipient-name"
                          type="text"
                          value={recipientName}
                          onChange={(e) => setRecipientName(e.target.value)}
                          placeholder="e.g. Ebubechukwu Okeke"
                          required
                          className="flex-1 px-3.5 py-2.5 rounded-lg border border-rule bg-surface text-ink text-xs focus:outline-none focus:ring-1 focus:ring-[var(--brand-ink)] min-h-[44px]"
                        />
                        <button
                          type="submit"
                          className="cs-btn cs-btn-primary px-5 text-xs font-bold shrink-0 cursor-pointer"
                        >
                          Issue certificate
                        </button>
                      </div>
                    </form>
                  ) : issuedCertificate ? (
                    <div className="rounded-xl border border-teal-500/30 bg-teal-500/10 p-5 space-y-4 text-xs">
                      <div className="flex items-center gap-2 text-teal-300 font-bold text-sm">
                        <Award size={18} />
                        <span>Certificate issued successfully</span>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-secondary pt-1">
                        <div>
                          <span className="block text-muted text-[11px]">Recipient:</span>
                          <span className="font-bold text-ink">{issuedCertificate.recipientName}</span>
                        </div>
                        <div>
                          <span className="block text-muted text-[11px]">Verification ID:</span>
                          <span className="font-mono font-bold text-teal-300">{issuedCertificate.id}</span>
                        </div>
                      </div>

                      <div className="pt-3 border-t border-teal-500/20 flex flex-wrap gap-3">
                        <Link
                          href={`/verify/${issuedCertificate.id}`}
                          className="cs-btn cs-btn-primary px-4 py-2 text-xs font-bold inline-flex items-center gap-1.5"
                        >
                          <span>Open public certificate</span>
                          <ExternalLink size={12} />
                        </Link>
                      </div>
                    </div>
                  ) : null}

                  {/* Honesty disclaimer */}
                  <p className="text-[11px] text-muted leading-relaxed m-0 pt-2 border-t border-subtle">
                    This certificate confirms verified completion of TraceBase&apos;s independent AI model evaluation
                    competency assessment. It does not promise, guarantee, or state employment on third-party platforms.
                  </p>
                </div>
              )}
            </form>
          </div>
        )}

        {/* TAB 2: PRACTICE SANDBOX */}
        {activeTab === 'sandbox' && (
          <EvaluationSandbox />
        )}

        {/* TAB 3: MOCK SCREENING SIMULATOR */}
        {activeTab === 'simulator' && (
          <AssessmentSimulator />
        )}

        {/* TAB 5: RESOURCE LIBRARY & RUBRICS */}
        {activeTab === 'resources' && (
          <div className="space-y-8">
            {/* Header & Category Filters */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-bold text-ink">
                  Evaluator resource library & rubrics
                </h2>
                <p className="text-xs sm:text-sm text-secondary">
                  Battle-tested rubrics, 5-point grading cheatcards, screening strategies, and copyable justification formulas.
                </p>
              </div>

              {/* Category Filter Pills */}
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 text-xs">
                {['All', 'Rubrics', 'Justifications', 'Assessments', 'Checklists'].map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setSelectedResourceCategory(cat)}
                    className={`px-3 py-1.5 rounded-lg border transition-colors whitespace-nowrap min-h-[36px] ${
                      selectedResourceCategory === cat
                        ? 'border-[#5A35C8] bg-[#5A35C8]/10 text-ink font-semibold'
                        : 'border-rule bg-sheet text-secondary hover:text-ink'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Resources Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {EVALUATOR_RESOURCES.filter(
                (res) => selectedResourceCategory === 'All' || res.category === selectedResourceCategory
              ).map((resource) => (
                <div
                  key={resource.id}
                  className="rounded-2xl border border-rule bg-sheet p-5 sm:p-6 flex flex-col justify-between gap-5"
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between gap-2">
                      <span className="px-2.5 py-0.5 rounded-full border border-rule bg-surface text-[11px] font-medium text-secondary">
                        {resource.category}
                      </span>
                      <span className="text-[11px] text-secondary tabular-nums">
                        {resource.readTimeMinutes} min read
                      </span>
                    </div>

                    <div className="space-y-1.5">
                      <h3 className="text-base font-bold text-ink">{resource.title}</h3>
                      <p className="text-xs text-secondary leading-relaxed">
                        {resource.description}
                      </p>
                    </div>

                    {/* Key Items Breakdown */}
                    <div className="space-y-2 pt-2 border-t border-rule">
                      {resource.keyItems.map((item, idx) => (
                        <div
                          key={idx}
                          className="p-3 rounded-xl border border-rule bg-surface/50 text-xs space-y-1"
                        >
                          <div className="flex items-center justify-between gap-2">
                            <span className="font-semibold text-ink">{item.label}</span>
                            {resource.category === 'Justifications' && (
                              <button
                                type="button"
                                onClick={() => {
                                  navigator.clipboard.writeText(item.detail);
                                  setCopiedFormulaId(`${resource.id}-${idx}`);
                                  setTimeout(() => setCopiedFormulaId(null), 2000);
                                }}
                                className="inline-flex items-center gap-1 text-[10px] text-[#5A35C8] hover:underline"
                              >
                                {copiedFormulaId === `${resource.id}-${idx}` ? (
                                  <>
                                    <Check size={11} className="text-emerald-400" />
                                    <span className="text-emerald-400 font-semibold">Copied</span>
                                  </>
                                ) : (
                                  <>
                                    <Copy size={11} />
                                    <span>Copy formula</span>
                                  </>
                                )}
                              </button>
                            )}
                          </div>
                          <p className="text-secondary leading-relaxed font-mono text-[11px]">
                            {item.detail}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Tags */}
                  <div className="pt-3 border-t border-rule flex flex-wrap items-center gap-1.5">
                    {resource.tags.map((t) => (
                      <span
                        key={t}
                        className="px-2 py-0.5 rounded border border-rule bg-surface text-[10px] text-secondary"
                      >
                        #{t}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
