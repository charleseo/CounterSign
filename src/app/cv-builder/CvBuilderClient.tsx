'use client';

import React, { useState, useEffect } from 'react';
import {
  FileText,
  Printer,
  Sparkles,
  ShieldCheck,
  Check,
  RotateCcw,
  Plus,
  Trash2,
  Building,
  Briefcase,
  GraduationCap,
  SlidersHorizontal,
} from 'lucide-react';

export interface WorkHistory {
  id: string;
  role: string;
  platform: string; // company or platform name
  period: string;
  bullets: string;
}

export interface Education {
  id: string;
  degree: string;
  school: string;
  year: string;
}

export type CvDensity = 'standard' | 'compact' | 'ultra-compact';

export interface CvData {
  fullName: string;
  title: string;
  email: string;
  phone: string;
  country: string;
  linkedin: string;
  certificateId: string;
  summary: string;
  skills: string[];
  evaluationExperience: WorkHistory[];
  industryExperience: WorkHistory[];
  education: Education[];
  density: CvDensity;
}

const SAMPLE_CV_DATA: CvData = {
  fullName: 'Adaeze Okonkwo',
  title: 'AI Model Evaluator & Domain Specialist',
  email: 'adaeze.eval@example.com',
  phone: '+234 803 123 4567',
  country: 'Lagos, Nigeria',
  linkedin: 'linkedin.com/in/adaeze-evaluator',
  certificateId: 'TB-2026-A101',
  density: 'compact',
  summary:
    'Meticulous AI evaluation specialist experienced in pairwise RLHF comparisons, prompt compliance, and ground-truth fact verification. Strong real-world industry background in commercial banking operations and risk auditing, providing deep subject-matter expertise for financial and STEM model evaluations.',
  skills: [
    'RLHF Pairwise Comparison',
    'Factuality & Citation Audits',
    'Negative Constraint Testing',
    'Code Evaluation (Python, SQL)',
    'Financial Risk & Compliance',
    'Process Quality Control',
    'Prompt Engineering',
    'Safety & Red Teaming',
  ],
  evaluationExperience: [
    {
      id: 'eval-1',
      role: 'Senior AI Contributor',
      platform: 'Alignerr & Outlier Projects',
      period: '2025 - Present',
      bullets:
        '• Evaluated over 600 complex reasoning responses across STEM, programming, and financial workflows.\n• Verified code execution outputs and ground-truth documentation citations, catching subtle hallucinations.\n• Maintained top-quartile reviewer score across consecutive sprint quality audits.',
    },
    {
      id: 'eval-2',
      role: 'Technical Annotator & Fact Checker',
      platform: 'Remote AI Contributor Network',
      period: '2024 - 2025',
      bullets:
        '• Formulated detailed justifications citing specific sentence-level evidence per project guidelines.\n• Audited responses against multi-part negative constraints (length limits, prohibited phrases, formatting rules).',
    },
  ],
  industryExperience: [
    {
      id: 'ind-1',
      role: 'Operations & Reconciliation Officer',
      platform: 'Zenith Bank PLC',
      period: '2021 - 2024',
      bullets:
        '• Audited high-volume daily interbank settlements and flagged discrepancy items within strict regulatory SLA.\n• Standardized credit verification workflows, improving data accuracy across branch ledger submissions.',
    },
  ],
  education: [
    {
      id: 'edu-1',
      degree: 'B.Sc. Computer Science & Quantitative Finance',
      school: 'University of Lagos',
      year: '2023',
    },
  ],
};

const SUGGESTED_SKILLS = [
  'RLHF Pairwise Comparison',
  'Factuality & Citation Audits',
  'Negative Constraint Testing',
  'Code Evaluation (Python, SQL)',
  'Financial Operations & Banking',
  'Industrial & Quality Control',
  'Safety & Red Teaming',
  'Prompt Engineering',
  'Linguistic Fluency',
  'Mathematical Proofs',
  'Biomedical QA',
  'Legal & Regulatory Grounding',
];

export function CvBuilderClient() {
  const [data, setData] = useState<CvData>(SAMPLE_CV_DATA);
  const [newSkill, setNewSkill] = useState('');
  const [activeTab, setActiveTab] = useState<'edit' | 'preview'>('edit');

  useEffect(() => {
    try {
      const saved = localStorage.getItem('tracebase_cv_data');
      if (saved) {
        const parsed = JSON.parse(saved);
        // Handle backwards compatibility with older schema
        const migrated: CvData = {
          ...SAMPLE_CV_DATA,
          ...parsed,
          evaluationExperience:
            parsed.evaluationExperience ||
            parsed.experience ||
            SAMPLE_CV_DATA.evaluationExperience,
          industryExperience:
            parsed.industryExperience || SAMPLE_CV_DATA.industryExperience,
          density: parsed.density || 'compact',
        };
        const timer = setTimeout(() => {
          setData(migrated);
        }, 0);
        return () => clearTimeout(timer);
      }
    } catch {}
  }, []);

  const saveToLocal = (updated: CvData) => {
    setData(updated);
    try {
      localStorage.setItem('tracebase_cv_data', JSON.stringify(updated));
    } catch {}
  };

  const updateField = <K extends keyof CvData>(field: K, value: CvData[K]) => {
    saveToLocal({ ...data, [field]: value });
  };

  const handleAddSkill = (skillToAdd: string) => {
    const trimmed = skillToAdd.trim();
    if (!trimmed || data.skills.includes(trimmed)) return;
    saveToLocal({ ...data, skills: [...data.skills, trimmed] });
    setNewSkill('');
  };

  const handleRemoveSkill = (skillToRemove: string) => {
    saveToLocal({
      ...data,
      skills: data.skills.filter((s) => s !== skillToRemove),
    });
  };

  // Evaluation Experience Handlers
  const handleAddEvalExp = () => {
    const newExp: WorkHistory = {
      id: Date.now().toString(),
      role: 'AI Training Specialist',
      platform: 'Platform Name (e.g. Outlier, Alignerr, DataAnnotation)',
      period: '2025 - Present',
      bullets: '• Evaluated model responses against project rubrics.\n• Verified factual claims.',
    };
    saveToLocal({
      ...data,
      evaluationExperience: [...data.evaluationExperience, newExp],
    });
  };

  const handleUpdateEvalExp = (id: string, field: keyof WorkHistory, value: string) => {
    const updated = data.evaluationExperience.map((exp) =>
      exp.id === id ? { ...exp, [field]: value } : exp
    );
    saveToLocal({ ...data, evaluationExperience: updated });
  };

  const handleRemoveEvalExp = (id: string) => {
    saveToLocal({
      ...data,
      evaluationExperience: data.evaluationExperience.filter((exp) => exp.id !== id),
    });
  };

  // Real-world Industry Experience Handlers
  const handleAddIndustryExp = () => {
    const newExp: WorkHistory = {
      id: Date.now().toString(),
      role: 'Domain Professional (e.g. Bank Analyst, Factory Supervisor)',
      platform: 'Company or Institution Name',
      period: '2022 - 2024',
      bullets: '• Managed daily domain operations and quality compliance.\n• Audited records and workflows for accuracy.',
    };
    saveToLocal({
      ...data,
      industryExperience: [...data.industryExperience, newExp],
    });
  };

  const handleUpdateIndustryExp = (id: string, field: keyof WorkHistory, value: string) => {
    const updated = data.industryExperience.map((exp) =>
      exp.id === id ? { ...exp, [field]: value } : exp
    );
    saveToLocal({ ...data, industryExperience: updated });
  };

  const handleRemoveIndustryExp = (id: string) => {
    saveToLocal({
      ...data,
      industryExperience: data.industryExperience.filter((exp) => exp.id !== id),
    });
  };

  // Education Handlers
  const handleAddEducation = () => {
    const newEdu: Education = {
      id: Date.now().toString(),
      degree: 'B.Sc. / B.Eng. / HND',
      school: 'University or College Name',
      year: '2024',
    };
    saveToLocal({ ...data, education: [...data.education, newEdu] });
  };

  const handleUpdateEducation = (id: string, field: keyof Education, value: string) => {
    const updated = data.education.map((edu) =>
      edu.id === id ? { ...edu, [field]: value } : edu
    );
    saveToLocal({ ...data, education: updated });
  };

  const handleRemoveEducation = (id: string) => {
    saveToLocal({
      ...data,
      education: data.education.filter((edu) => edu.id !== id),
    });
  };

  const handlePrint = () => {
    window.print();
  };

  const handleResetSample = () => {
    saveToLocal(SAMPLE_CV_DATA);
  };

  return (
    <div className="space-y-6">
      <style jsx global>{`
        #printable-cv {
          background-color: #ffffff !important;
          color: #0f172a !important;
        }
        #printable-cv h1 {
          color: #0f172a !important;
        }
        #printable-cv h3 {
          color: #0f172a !important;
        }
        #printable-cv p {
          color: #334155 !important;
        }
        #printable-cv .cv-role {
          color: #0f172a !important;
        }
        #printable-cv .cv-secondary {
          color: #64748b !important;
        }
        #printable-cv .cv-chip {
          background-color: #f1f5f9 !important;
          color: #0f172a !important;
          border-color: #cbd5e1 !important;
        }

        @media print {
          @page {
            size: A4 portrait;
            margin: 8mm;
          }
          body {
            background: #ffffff !important;
            color: #000000 !important;
            font-size: 11px !important;
          }
          #site-header,
          #site-footer,
          .cs-no-print,
          nav,
          button {
            display: none !important;
          }
          #printable-cv {
            border: none !important;
            box-shadow: none !important;
            padding: 0 !important;
            margin: 0 !important;
            width: 100% !important;
            max-width: 100% !important;
            page-break-after: avoid !important;
            page-break-inside: avoid !important;
            break-inside: avoid !important;
          }
        }
      `}</style>

      {/* Mobile Tab Switcher */}
      <div className="flex lg:hidden rounded-xl border border-rule bg-sheet p-1 cs-no-print">
        <button
          type="button"
          onClick={() => setActiveTab('edit')}
          className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-colors ${
            activeTab === 'edit'
              ? 'bg-[#5A35C8] text-white'
              : 'text-secondary hover:text-ink'
          }`}
        >
          Edit CV details
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('preview')}
          className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-colors ${
            activeTab === 'preview'
              ? 'bg-[#5A35C8] text-white'
              : 'text-secondary hover:text-ink'
          }`}
        >
          Live 1-page preview
        </button>
      </div>

      {/* Control Bar: 1-Page Guarantee & Print Trigger */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-xl border border-rule bg-sheet cs-no-print">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-xs font-bold text-ink">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>Strict one-page ATS guarantee active</span>
          </div>
          <p className="text-[11px] text-secondary m-0">
            Layout density scales dynamically so all your evaluation and industry experience fits on exactly one page.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {/* Density Picker */}
          <div className="flex items-center border border-rule rounded-lg bg-surface p-0.5 text-xs">
            <span className="px-2 text-[10px] text-secondary font-medium">Density:</span>
            {(['standard', 'compact', 'ultra-compact'] as CvDensity[]).map((d) => (
              <button
                key={d}
                type="button"
                onClick={() => updateField('density', d)}
                className={`px-2.5 py-1 rounded text-[11px] font-medium capitalize transition-colors ${
                  data.density === d
                    ? 'bg-[#5A35C8] text-white shadow-xs'
                    : 'text-secondary hover:text-ink'
                }`}
              >
                {d.replace('-', ' ')}
              </button>
            ))}
          </div>

          <button
            type="button"
            onClick={handleResetSample}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-rule bg-surface text-secondary hover:text-ink text-xs font-medium transition-colors min-h-[36px]"
          >
            <RotateCcw size={12} />
            <span>Load sample</span>
          </button>

          <button
            type="button"
            onClick={handlePrint}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#5A35C8] hover:bg-[#4D2DB3] text-white text-xs font-semibold transition-colors min-h-[38px] shadow-sm"
          >
            <Printer size={14} />
            <span>Save one-page PDF / Print</span>
          </button>
        </div>
      </div>

      {/* 2-Column Main Workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Form Editor */}
        <div
          className={`lg:col-span-6 space-y-6 cs-no-print ${
            activeTab === 'preview' ? 'hidden lg:block' : 'block'
          }`}
        >
          {/* Section 1: Contact Details */}
          <div className="rounded-2xl border border-rule bg-sheet p-5 sm:p-6 space-y-4">
            <h2 className="text-sm font-bold text-ink border-b border-rule pb-2">
              1. Personal & contact info
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="text-xs text-secondary font-medium block">Full name</label>
                <input
                  type="text"
                  value={data.fullName}
                  onChange={(e) => updateField('fullName', e.target.value)}
                  className="w-full text-xs sm:text-sm bg-surface border border-rule rounded-lg p-2.5 text-ink focus:outline-none focus:border-[#5A35C8]"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs text-secondary font-medium block">Professional title</label>
                <input
                  type="text"
                  value={data.title}
                  onChange={(e) => updateField('title', e.target.value)}
                  className="w-full text-xs sm:text-sm bg-surface border border-rule rounded-lg p-2.5 text-ink focus:outline-none focus:border-[#5A35C8]"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs text-secondary font-medium block">Email address</label>
                <input
                  type="email"
                  value={data.email}
                  onChange={(e) => updateField('email', e.target.value)}
                  className="w-full text-xs sm:text-sm bg-surface border border-rule rounded-lg p-2.5 text-ink focus:outline-none focus:border-[#5A35C8]"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs text-secondary font-medium block">Phone / WhatsApp</label>
                <input
                  type="text"
                  value={data.phone}
                  onChange={(e) => updateField('phone', e.target.value)}
                  className="w-full text-xs sm:text-sm bg-surface border border-rule rounded-lg p-2.5 text-ink focus:outline-none focus:border-[#5A35C8]"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs text-secondary font-medium block">Location / Country</label>
                <input
                  type="text"
                  value={data.country}
                  onChange={(e) => updateField('country', e.target.value)}
                  className="w-full text-xs sm:text-sm bg-surface border border-rule rounded-lg p-2.5 text-ink focus:outline-none focus:border-[#5A35C8]"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs text-secondary font-medium block">LinkedIn profile (optional)</label>
                <input
                  type="text"
                  value={data.linkedin}
                  onChange={(e) => updateField('linkedin', e.target.value)}
                  className="w-full text-xs sm:text-sm bg-surface border border-rule rounded-lg p-2.5 text-ink focus:outline-none focus:border-[#5A35C8]"
                />
              </div>
            </div>

            {/* TraceBase Certificate ID */}
            <div className="pt-2 border-t border-rule space-y-1">
              <label className="text-xs font-semibold text-ink flex items-center gap-1.5">
                <ShieldCheck size={14} className="text-emerald-400" />
                <span>TraceBase verified certificate ID (optional)</span>
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={data.certificateId}
                  onChange={(e) => updateField('certificateId', e.target.value)}
                  placeholder="e.g. TB-2026-A101"
                  className="flex-1 text-xs sm:text-sm bg-surface border border-rule rounded-lg p-2.5 text-ink font-mono focus:outline-none focus:border-[#5A35C8]"
                />
              </div>
              <p className="text-[11px] text-secondary">
                Adds a verified credential badge and direct verification link to your CV.
              </p>
            </div>
          </div>

          {/* Section 2: Professional Summary */}
          <div className="rounded-2xl border border-rule bg-sheet p-5 sm:p-6 space-y-3">
            <h2 className="text-sm font-bold text-ink border-b border-rule pb-2">
              2. Profile summary
            </h2>
            <textarea
              value={data.summary}
              onChange={(e) => updateField('summary', e.target.value)}
              rows={3}
              placeholder="Highlight both your AI evaluation experience and your real-world domain knowledge..."
              className="w-full text-xs sm:text-sm bg-surface border border-rule rounded-xl p-3 text-ink focus:outline-none focus:border-[#5A35C8] leading-relaxed resize-y"
            />
          </div>

          {/* Section 3: Core Skills */}
          <div className="rounded-2xl border border-rule bg-sheet p-5 sm:p-6 space-y-4">
            <h2 className="text-sm font-bold text-ink border-b border-rule pb-2">
              3. Evaluation & domain skills
            </h2>

            <div className="flex flex-wrap gap-1.5">
              {data.skills.map((skill) => (
                <span
                  key={skill}
                  className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md border border-rule bg-surface text-xs text-ink"
                >
                  {skill}
                  <button
                    type="button"
                    onClick={() => handleRemoveSkill(skill)}
                    className="text-secondary hover:text-red-400"
                  >
                    &times;
                  </button>
                </span>
              ))}
            </div>

            <div className="flex gap-2 pt-2">
              <input
                type="text"
                value={newSkill}
                onChange={(e) => setNewSkill(e.target.value)}
                placeholder="Add custom skill (e.g. Banking, Factory QA, Medical)..."
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    handleAddSkill(newSkill);
                  }
                }}
                className="flex-1 text-xs bg-surface border border-rule rounded-lg p-2 text-ink focus:outline-none focus:border-[#5A35C8]"
              />
              <button
                type="button"
                onClick={() => handleAddSkill(newSkill)}
                className="px-3 py-2 rounded-lg bg-surface border border-rule text-xs font-semibold text-ink hover:border-[#5A35C8]"
              >
                Add
              </button>
            </div>

            <div className="space-y-1.5 pt-2 border-t border-rule">
              <span className="text-[11px] text-secondary block">Quick-add popular skills:</span>
              <div className="flex flex-wrap gap-1.5">
                {SUGGESTED_SKILLS.filter((s) => !data.skills.includes(s)).map((skill) => (
                  <button
                    key={skill}
                    type="button"
                    onClick={() => handleAddSkill(skill)}
                    className="text-[11px] px-2 py-0.5 rounded border border-rule bg-surface text-secondary hover:text-ink transition-colors"
                  >
                    + {skill}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Section 4: AI Evaluation Experience */}
          <div className="rounded-2xl border border-rule bg-sheet p-5 sm:p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-rule pb-2">
              <div className="flex items-center gap-2">
                <Briefcase size={16} className="text-[#5A35C8]" />
                <h2 className="text-sm font-bold text-ink">4. AI evaluation experience</h2>
              </div>
              <button
                type="button"
                onClick={handleAddEvalExp}
                className="inline-flex items-center gap-1 text-xs text-[#5A35C8] font-semibold hover:underline"
              >
                <Plus size={13} />
                <span>Add AI role</span>
              </button>
            </div>

            {data.evaluationExperience.map((exp, index) => (
              <div
                key={exp.id}
                className="p-4 rounded-xl border border-rule bg-surface space-y-3 relative"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-ink">Evaluation Role #{index + 1}</span>
                  {data.evaluationExperience.length > 1 && (
                    <button
                      type="button"
                      onClick={() => handleRemoveEvalExp(exp.id)}
                      className="text-secondary hover:text-red-400 text-xs p-1"
                    >
                      <Trash2 size={13} />
                    </button>
                  )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <input
                    type="text"
                    value={exp.role}
                    onChange={(e) => handleUpdateEvalExp(exp.id, 'role', e.target.value)}
                    placeholder="Role (e.g. AI Evaluator)"
                    className="text-xs bg-sheet border border-rule rounded-lg p-2 text-ink focus:outline-none focus:border-[#5A35C8]"
                  />
                  <input
                    type="text"
                    value={exp.platform}
                    onChange={(e) => handleUpdateEvalExp(exp.id, 'platform', e.target.value)}
                    placeholder="Platform (e.g. Outlier AI, Alignerr)"
                    className="text-xs bg-sheet border border-rule rounded-lg p-2 text-ink focus:outline-none focus:border-[#5A35C8]"
                  />
                </div>

                <input
                  type="text"
                  value={exp.period}
                  onChange={(e) => handleUpdateEvalExp(exp.id, 'period', e.target.value)}
                  placeholder="Period (e.g. 2025 - Present)"
                  className="w-full text-xs bg-sheet border border-rule rounded-lg p-2 text-ink focus:outline-none focus:border-[#5A35C8]"
                />

                <textarea
                  value={exp.bullets}
                  onChange={(e) => handleUpdateEvalExp(exp.id, 'bullets', e.target.value)}
                  placeholder="Accomplishments and responsibilities (use bullet points with •)..."
                  rows={3}
                  className="w-full text-xs bg-sheet border border-rule rounded-lg p-2 text-ink focus:outline-none focus:border-[#5A35C8] font-mono leading-relaxed"
                />
              </div>
            ))}
          </div>

          {/* Section 5: Real-World Industry Experience (Banking, Factory, Healthcare, etc.) */}
          <div className="rounded-2xl border border-rule bg-sheet p-5 sm:p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-rule pb-2">
              <div className="flex items-center gap-2">
                <Building size={16} className="text-emerald-400" />
                <div>
                  <h2 className="text-sm font-bold text-ink">
                    5. Real-world industry experience
                  </h2>
                  <span className="text-[11px] text-secondary">
                    Banking, factory, healthcare, legal, retail, corporate, etc.
                  </span>
                </div>
              </div>
              <button
                type="button"
                onClick={handleAddIndustryExp}
                className="inline-flex items-center gap-1 text-xs text-emerald-400 font-semibold hover:underline"
              >
                <Plus size={13} />
                <span>Add industry role</span>
              </button>
            </div>

            {data.industryExperience.map((exp, index) => (
              <div
                key={exp.id}
                className="p-4 rounded-xl border border-rule bg-surface space-y-3 relative"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-ink">Industry Role #{index + 1}</span>
                  <button
                    type="button"
                    onClick={() => handleRemoveIndustryExp(exp.id)}
                    className="text-secondary hover:text-red-400 text-xs p-1"
                  >
                    <Trash2 size={13} />
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <input
                    type="text"
                    value={exp.role}
                    onChange={(e) => handleUpdateIndustryExp(exp.id, 'role', e.target.value)}
                    placeholder="Role (e.g. Operations Officer, Production Lead)"
                    className="text-xs bg-sheet border border-rule rounded-lg p-2 text-ink focus:outline-none focus:border-[#5A35C8]"
                  />
                  <input
                    type="text"
                    value={exp.platform}
                    onChange={(e) => handleUpdateIndustryExp(exp.id, 'platform', e.target.value)}
                    placeholder="Employer / Company (e.g. First Bank, Unilever)"
                    className="text-xs bg-sheet border border-rule rounded-lg p-2 text-ink focus:outline-none focus:border-[#5A35C8]"
                  />
                </div>

                <input
                  type="text"
                  value={exp.period}
                  onChange={(e) => handleUpdateIndustryExp(exp.id, 'period', e.target.value)}
                  placeholder="Period (e.g. 2021 - 2024)"
                  className="w-full text-xs bg-sheet border border-rule rounded-lg p-2 text-ink focus:outline-none focus:border-[#5A35C8]"
                />

                <textarea
                  value={exp.bullets}
                  onChange={(e) => handleUpdateIndustryExp(exp.id, 'bullets', e.target.value)}
                  placeholder="Key responsibilities and domain achievements..."
                  rows={2}
                  className="w-full text-xs bg-sheet border border-rule rounded-lg p-2 text-ink focus:outline-none focus:border-[#5A35C8] font-mono leading-relaxed"
                />
              </div>
            ))}
          </div>

          {/* Section 6: Education */}
          <div className="rounded-2xl border border-rule bg-sheet p-5 sm:p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-rule pb-2">
              <div className="flex items-center gap-2">
                <GraduationCap size={16} className="text-[#5A35C8]" />
                <h2 className="text-sm font-bold text-ink">6. Education & qualifications</h2>
              </div>
              <button
                type="button"
                onClick={handleAddEducation}
                className="inline-flex items-center gap-1 text-xs text-[#5A35C8] font-semibold hover:underline"
              >
                <Plus size={13} />
                <span>Add education</span>
              </button>
            </div>

            {data.education.map((edu, index) => (
              <div
                key={edu.id}
                className="p-4 rounded-xl border border-rule bg-surface space-y-2 relative"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-ink">Degree #{index + 1}</span>
                  {data.education.length > 1 && (
                    <button
                      type="button"
                      onClick={() => handleRemoveEducation(edu.id)}
                      className="text-secondary hover:text-red-400 text-xs p-1"
                    >
                      <Trash2 size={13} />
                    </button>
                  )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <input
                    type="text"
                    value={edu.degree}
                    onChange={(e) => handleUpdateEducation(edu.id, 'degree', e.target.value)}
                    placeholder="Degree name (B.Sc., HND, etc.)"
                    className="text-xs bg-sheet border border-rule rounded-lg p-2 text-ink focus:outline-none focus:border-[#5A35C8]"
                  />
                  <input
                    type="text"
                    value={edu.school}
                    onChange={(e) => handleUpdateEducation(edu.id, 'school', e.target.value)}
                    placeholder="Institution / University"
                    className="text-xs bg-sheet border border-rule rounded-lg p-2 text-ink focus:outline-none focus:border-[#5A35C8]"
                  />
                </div>

                <input
                  type="text"
                  value={edu.year}
                  onChange={(e) => handleUpdateEducation(edu.id, 'year', e.target.value)}
                  placeholder="Graduation year (e.g. 2024)"
                  className="w-full text-xs bg-sheet border border-rule rounded-lg p-2 text-ink focus:outline-none focus:border-[#5A35C8]"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Live Printable ATS 1-Page Preview */}
        <div
          className={`lg:col-span-6 sticky top-24 ${
            activeTab === 'edit' ? 'hidden lg:block' : 'block'
          }`}
        >
          {/* Printable 1-Page Container */}
          <div
            id="printable-cv"
            className={`w-full bg-white text-slate-900 shadow-xl rounded-xl border border-slate-200 print:border-none print:shadow-none print:p-0 print:m-0 font-sans transition-all ${
              data.density === 'ultra-compact'
                ? 'p-4 sm:p-5 space-y-2.5 text-[9px]'
                : data.density === 'compact'
                ? 'p-5 sm:p-6 space-y-3.5 text-[10px]'
                : 'p-6 sm:p-8 space-y-4 text-[11px]'
            }`}
          >
            {/* Header */}
            <div className="border-b-2 border-slate-900 pb-3 space-y-1">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h1
                    className={`font-black tracking-tight uppercase !text-[#0f172a] ${
                      data.density === 'ultra-compact'
                        ? 'text-lg sm:text-xl'
                        : data.density === 'compact'
                        ? 'text-xl sm:text-2xl'
                        : 'text-2xl sm:text-3xl'
                    }`}
                  >
                    {data.fullName || 'Your Name'}
                  </h1>
                  <p className="font-semibold !text-[#334155]">
                    {data.title || 'AI Model Evaluator & Domain Specialist'}
                  </p>
                </div>

                {data.certificateId && (
                  <div className="text-right shrink-0">
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded border border-emerald-600 bg-emerald-50 text-[9px] font-bold !text-emerald-800">
                      <ShieldCheck size={11} className="text-emerald-700" />
                      <span>TraceBase Verified: {data.certificateId}</span>
                    </span>
                    <span className="block text-[8px] !text-slate-500 font-mono mt-0.5">
                      tracebase.org/verify/{data.certificateId}
                    </span>
                  </div>
                )}
              </div>

              {/* Contact Strip */}
              <div className="flex flex-wrap items-center gap-x-2.5 gap-y-0.5 !text-slate-600 pt-1 font-mono text-[9px]">
                {data.email && <span>{data.email}</span>}
                {data.phone && <span>• {data.phone}</span>}
                {data.country && <span>• {data.country}</span>}
                {data.linkedin && <span>• {data.linkedin}</span>}
              </div>
            </div>

            {/* Profile Summary */}
            {data.summary && (
              <div className="space-y-0.5">
                <h3 className="font-bold uppercase tracking-wider border-b border-slate-300 pb-0.5 text-[10px] !text-[#0f172a]">
                  Professional & Domain Profile
                </h3>
                <p className="!text-[#334155] leading-relaxed">{data.summary}</p>
              </div>
            )}

            {/* Core Competencies */}
            {data.skills.length > 0 && (
              <div className="space-y-1">
                <h3 className="font-bold uppercase tracking-wider border-b border-slate-300 pb-0.5 text-[10px] !text-[#0f172a]">
                  Core Competencies & Domain Expertise
                </h3>
                <div className="flex flex-wrap gap-1">
                  {data.skills.map((s) => (
                    <span
                      key={s}
                      className="px-1.5 py-0.5 rounded !bg-[#f1f5f9] !text-[#0f172a] font-semibold border !border-[#cbd5e1] text-[8.5px]"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* AI Evaluation Experience */}
            {data.evaluationExperience.length > 0 && (
              <div className="space-y-1.5">
                <h3 className="font-bold uppercase tracking-wider border-b border-slate-300 pb-0.5 text-[10px] !text-[#0f172a]">
                  AI Model Evaluation & Annotation Track Record
                </h3>
                <div className="space-y-2">
                  {data.evaluationExperience.map((exp) => (
                    <div key={exp.id} className="space-y-0.5">
                      <div className="flex items-center justify-between">
                        <span className="font-bold !text-[#0f172a]">
                          {exp.role} <span className="font-normal !text-slate-600">| {exp.platform}</span>
                        </span>
                        <span className="!text-slate-500 tabular-nums text-[9px]">{exp.period}</span>
                      </div>
                      <p className="!text-[#334155] whitespace-pre-line leading-relaxed pl-1">
                        {exp.bullets}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Real-World Industry Experience (Banking, Factory, Healthcare, etc.) */}
            {data.industryExperience.length > 0 && (
              <div className="space-y-1.5">
                <h3 className="font-bold uppercase tracking-wider border-b border-slate-300 pb-0.5 text-[10px] !text-[#0f172a]">
                  Professional & Industry Experience
                </h3>
                <div className="space-y-2">
                  {data.industryExperience.map((exp) => (
                    <div key={exp.id} className="space-y-0.5">
                      <div className="flex items-center justify-between">
                        <span className="font-bold !text-[#0f172a]">
                          {exp.role} <span className="font-normal !text-slate-600">| {exp.platform}</span>
                        </span>
                        <span className="!text-slate-500 tabular-nums text-[9px]">{exp.period}</span>
                      </div>
                      <p className="!text-[#334155] whitespace-pre-line leading-relaxed pl-1">
                        {exp.bullets}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Education */}
            {data.education.length > 0 && (
              <div className="space-y-1">
                <h3 className="font-bold uppercase tracking-wider border-b border-slate-300 pb-0.5 text-[10px] !text-[#0f172a]">
                  Education & Academic Qualifications
                </h3>
                <div className="space-y-1">
                  {data.education.map((edu) => (
                    <div key={edu.id} className="flex items-center justify-between">
                      <div>
                        <span className="font-bold !text-[#0f172a]">{edu.degree}</span>
                        <span className="!text-slate-600">, {edu.school}</span>
                      </div>
                      <span className="!text-slate-500 tabular-nums text-[9px]">{edu.year}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
