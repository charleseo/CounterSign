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
  ExternalLink,
} from 'lucide-react';

interface WorkHistory {
  id: string;
  role: string;
  platform: string;
  period: string;
  bullets: string;
}

interface Education {
  id: string;
  degree: string;
  school: string;
  year: string;
}

interface CvData {
  fullName: string;
  title: string;
  email: string;
  phone: string;
  country: string;
  linkedin: string;
  certificateId: string;
  summary: string;
  skills: string[];
  experience: WorkHistory[];
  education: Education[];
}

const SAMPLE_CV_DATA: CvData = {
  fullName: 'Adaeze Okonkwo',
  title: 'AI Model Evaluator & Domain Specialist',
  email: 'adaeze.eval@example.com',
  phone: '+234 803 123 4567',
  country: 'Lagos, Nigeria',
  linkedin: 'linkedin.com/in/adaeze-evaluator',
  certificateId: 'TB-2026-A101',
  summary:
    'Meticulous AI evaluation specialist experienced in pairwise RLHF comparisons, prompt compliance, and ground-truth fact verification. Proven track record evaluating complex technical and reasoning outputs for tier-one model labs with 98% quality audit pass rate.',
  skills: [
    'RLHF Pairwise Comparison',
    'Factuality & Citation Audits',
    'Negative Constraint Testing',
    'Code Evaluation (Python, SQL)',
    'Prompt Engineering',
    'Safety & Red Teaming',
    'Rubric Formulation',
  ],
  experience: [
    {
      id: '1',
      role: 'Senior AI Contributor',
      platform: 'Alignerr & Outlier Projects',
      period: '2025 - Present',
      bullets:
        '• Conducted pairwise evaluation of over 600 complex reasoning responses across STEM and programming domains.\n• Verified code execution outputs and ground-truth documentation citations, flagging subtle hallucinations.\n• Maintained top-quartile reviewer score across consecutive sprint quality audits.',
    },
    {
      id: '2',
      role: 'Technical Annotator & Fact Checker',
      platform: 'Remote AI Contributor Network',
      period: '2024 - 2025',
      bullets:
        '• Formulated detailed justifications citing specific sentence-level evidence per project guidelines.\n• Audited responses against multi-part negative constraints (length limits, prohibited phrases, formatting rules).',
    },
  ],
  education: [
    {
      id: '1',
      degree: 'B.Sc. Computer Science (First Class Honours)',
      school: 'University of Lagos',
      year: '2024',
    },
  ],
};

const SUGGESTED_SKILLS = [
  'RLHF Pairwise Comparison',
  'Factuality & Citation Audits',
  'Negative Constraint Testing',
  'Code Evaluation (Python, SQL)',
  'Safety & Red Teaming',
  'Prompt Engineering',
  'Linguistic Fluency',
  'Mathematical Reasoning',
  'Biomedical Evaluation',
  'Financial Grounding',
];

export function CvBuilderClient() {
  const [data, setData] = useState<CvData>(SAMPLE_CV_DATA);
  const [newSkill, setNewSkill] = useState('');
  const [activeTab, setActiveTab] = useState<'edit' | 'preview'>('edit');

  useEffect(() => {
    try {
      const saved = localStorage.getItem('tracebase_cv_data');
      if (saved) {
        setData(JSON.parse(saved));
      }
    } catch {}
  }, []);

  const saveToLocal = (updated: CvData) => {
    setData(updated);
    try {
      localStorage.setItem('tracebase_cv_data', JSON.stringify(updated));
    } catch {}
  };

  const updateField = (field: keyof CvData, value: any) => {
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

  const handleAddExperience = () => {
    const newExp: WorkHistory = {
      id: Date.now().toString(),
      role: 'AI Training Specialist',
      platform: 'Platform Name',
      period: '2025 - Present',
      bullets: '• Evaluated model responses against project rubrics.\n• Verified factual claims.',
    };
    saveToLocal({ ...data, experience: [...data.experience, newExp] });
  };

  const handleUpdateExperience = (id: string, field: keyof WorkHistory, value: string) => {
    const updated = data.experience.map((exp) =>
      exp.id === id ? { ...exp, [field]: value } : exp
    );
    saveToLocal({ ...data, experience: updated });
  };

  const handleRemoveExperience = (id: string) => {
    saveToLocal({
      ...data,
      experience: data.experience.filter((exp) => exp.id !== id),
    });
  };

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
      {/* Mobile Tab Switcher */}
      <div className="flex lg:hidden rounded-xl border border-rule bg-sheet p-1">
        <button
          type="button"
          onClick={() => setActiveTab('edit')}
          className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-colors ${
            activeTab === 'edit'
              ? 'bg-[var(--brand-ink)] text-white'
              : 'text-secondary hover:text-primary'
          }`}
        >
          Edit CV Details
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('preview')}
          className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-colors ${
            activeTab === 'preview'
              ? 'bg-[var(--brand-ink)] text-white'
              : 'text-secondary hover:text-primary'
          }`}
        >
          Live Preview &amp; Print
        </button>
      </div>

      {/* Control Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-4 rounded-xl border border-rule bg-sheet">
        <div className="flex items-center gap-2 text-xs text-secondary">
          <Sparkles size={14} className="text-[var(--brand-ink)]" />
          <span>ATS-optimized format tailored for AI labs and talent platforms</span>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleResetSample}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-rule bg-surface text-secondary hover:text-primary text-xs font-medium transition-colors"
          >
            <RotateCcw size={12} />
            <span>Load sample</span>
          </button>

          <button
            type="button"
            onClick={handlePrint}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[var(--brand-ink)] text-white hover:bg-[var(--brand-ink-hover)] text-xs font-semibold transition-colors min-h-[40px]"
          >
            <Printer size={14} />
            <span>Download PDF / Print</span>
          </button>
        </div>
      </div>

      {/* 2-Column Main Workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Form Editor (hidden on mobile if in preview mode) */}
        <div
          className={`lg:col-span-6 space-y-6 ${
            activeTab === 'preview' ? 'hidden lg:block' : 'block'
          }`}
        >
          {/* Section 1: Contact Details */}
          <div className="rounded-2xl border border-rule bg-sheet p-5 sm:p-6 space-y-4">
            <h2 className="text-sm font-bold text-primary border-b border-rule pb-2">
              1. Personal &amp; contact info
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="text-xs text-secondary font-medium block">Full name</label>
                <input
                  type="text"
                  value={data.fullName}
                  onChange={(e) => updateField('fullName', e.target.value)}
                  className="w-full text-xs sm:text-sm bg-surface border border-rule rounded-lg p-2.5 text-primary focus:outline-none focus:border-[var(--brand-ink)]"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs text-secondary font-medium block">Professional title</label>
                <input
                  type="text"
                  value={data.title}
                  onChange={(e) => updateField('title', e.target.value)}
                  className="w-full text-xs sm:text-sm bg-surface border border-rule rounded-lg p-2.5 text-primary focus:outline-none focus:border-[var(--brand-ink)]"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs text-secondary font-medium block">Email address</label>
                <input
                  type="email"
                  value={data.email}
                  onChange={(e) => updateField('email', e.target.value)}
                  className="w-full text-xs sm:text-sm bg-surface border border-rule rounded-lg p-2.5 text-primary focus:outline-none focus:border-[var(--brand-ink)]"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs text-secondary font-medium block">Phone / WhatsApp</label>
                <input
                  type="text"
                  value={data.phone}
                  onChange={(e) => updateField('phone', e.target.value)}
                  className="w-full text-xs sm:text-sm bg-surface border border-rule rounded-lg p-2.5 text-primary focus:outline-none focus:border-[var(--brand-ink)]"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs text-secondary font-medium block">Location / Country</label>
                <input
                  type="text"
                  value={data.country}
                  onChange={(e) => updateField('country', e.target.value)}
                  className="w-full text-xs sm:text-sm bg-surface border border-rule rounded-lg p-2.5 text-primary focus:outline-none focus:border-[var(--brand-ink)]"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs text-secondary font-medium block">LinkedIn profile (optional)</label>
                <input
                  type="text"
                  value={data.linkedin}
                  onChange={(e) => updateField('linkedin', e.target.value)}
                  className="w-full text-xs sm:text-sm bg-surface border border-rule rounded-lg p-2.5 text-primary focus:outline-none focus:border-[var(--brand-ink)]"
                />
              </div>
            </div>

            {/* TraceBase Certificate ID */}
            <div className="pt-2 border-t border-rule space-y-1">
              <label className="text-xs font-semibold text-primary flex items-center gap-1.5">
                <ShieldCheck size={14} className="text-emerald-600 dark:text-emerald-400" />
                <span>TraceBase verified certificate ID (optional)</span>
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={data.certificateId}
                  onChange={(e) => updateField('certificateId', e.target.value)}
                  placeholder="e.g. TB-2026-A101"
                  className="flex-1 text-xs sm:text-sm bg-surface border border-rule rounded-lg p-2.5 text-primary font-mono focus:outline-none focus:border-[var(--brand-ink)]"
                />
              </div>
              <p className="text-[11px] text-secondary">
                Adds a verified credential seal and clickable verification link to your CV.
              </p>
            </div>
          </div>

          {/* Section 2: Professional Summary */}
          <div className="rounded-2xl border border-rule bg-sheet p-5 sm:p-6 space-y-3">
            <h2 className="text-sm font-bold text-primary border-b border-rule pb-2">
              2. Evaluator profile summary
            </h2>
            <textarea
              value={data.summary}
              onChange={(e) => updateField('summary', e.target.value)}
              rows={3}
              className="w-full text-xs sm:text-sm bg-surface border border-rule rounded-xl p-3 text-primary focus:outline-none focus:border-[var(--brand-ink)] leading-relaxed resize-y"
            />
          </div>

          {/* Section 3: Evaluation Skills */}
          <div className="rounded-2xl border border-rule bg-sheet p-5 sm:p-6 space-y-4">
            <h2 className="text-sm font-bold text-primary border-b border-rule pb-2">
              3. Core evaluation skills
            </h2>

            <div className="flex flex-wrap gap-1.5">
              {data.skills.map((skill) => (
                <span
                  key={skill}
                  className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md border border-rule bg-surface text-xs text-primary"
                >
                  {skill}
                  <button
                    type="button"
                    onClick={() => handleRemoveSkill(skill)}
                    className="text-secondary hover:text-red-500"
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
                placeholder="Add custom skill (e.g. Arabic, Medical QA)..."
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    handleAddSkill(newSkill);
                  }
                }}
                className="flex-1 text-xs bg-surface border border-rule rounded-lg p-2 text-primary focus:outline-none focus:border-[var(--brand-ink)]"
              />
              <button
                type="button"
                onClick={() => handleAddSkill(newSkill)}
                className="px-3 py-2 rounded-lg bg-surface border border-rule text-xs font-semibold text-primary hover:border-subtle"
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
                    className="text-[11px] px-2 py-0.5 rounded border border-rule bg-surface text-secondary hover:text-primary transition-colors"
                  >
                    + {skill}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Section 4: Work Experience */}
          <div className="rounded-2xl border border-rule bg-sheet p-5 sm:p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-rule pb-2">
              <h2 className="text-sm font-bold text-primary">4. Work &amp; evaluation experience</h2>
              <button
                type="button"
                onClick={handleAddExperience}
                className="inline-flex items-center gap-1 text-xs text-[var(--brand-ink)] font-semibold hover:underline"
              >
                <Plus size={13} />
                <span>Add role</span>
              </button>
            </div>

            {data.experience.map((exp, index) => (
              <div
                key={exp.id}
                className="p-4 rounded-xl border border-rule bg-surface space-y-3 relative group"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-primary">Position #{index + 1}</span>
                  {data.experience.length > 1 && (
                    <button
                      type="button"
                      onClick={() => handleRemoveExperience(exp.id)}
                      className="text-secondary hover:text-red-500 text-xs p-1"
                    >
                      <Trash2 size={13} />
                    </button>
                  )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <input
                    type="text"
                    value={exp.role}
                    onChange={(e) => handleUpdateExperience(exp.id, 'role', e.target.value)}
                    placeholder="Role title"
                    className="text-xs bg-sheet border border-rule rounded-lg p-2 text-primary focus:outline-none focus:border-[var(--brand-ink)]"
                  />
                  <input
                    type="text"
                    value={exp.platform}
                    onChange={(e) => handleUpdateExperience(exp.id, 'platform', e.target.value)}
                    placeholder="Platform / Company"
                    className="text-xs bg-sheet border border-rule rounded-lg p-2 text-primary focus:outline-none focus:border-[var(--brand-ink)]"
                  />
                </div>

                <input
                  type="text"
                  value={exp.period}
                  onChange={(e) => handleUpdateExperience(exp.id, 'period', e.target.value)}
                  placeholder="e.g. 2024 - Present"
                  className="w-full text-xs bg-sheet border border-rule rounded-lg p-2 text-primary focus:outline-none focus:border-[var(--brand-ink)]"
                />

                <textarea
                  value={exp.bullets}
                  onChange={(e) => handleUpdateExperience(exp.id, 'bullets', e.target.value)}
                  rows={3}
                  placeholder="Bullet points (one per line)..."
                  className="w-full text-xs bg-sheet border border-rule rounded-lg p-2 text-primary focus:outline-none focus:border-[var(--brand-ink)] resize-y"
                />
              </div>
            ))}
          </div>

          {/* Section 5: Education */}
          <div className="rounded-2xl border border-rule bg-sheet p-5 sm:p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-rule pb-2">
              <h2 className="text-sm font-bold text-primary">5. Education &amp; qualifications</h2>
              <button
                type="button"
                onClick={handleAddEducation}
                className="inline-flex items-center gap-1 text-xs text-[var(--brand-ink)] font-semibold hover:underline"
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
                  <span className="text-xs font-bold text-primary">Degree #{index + 1}</span>
                  {data.education.length > 1 && (
                    <button
                      type="button"
                      onClick={() => handleRemoveEducation(edu.id)}
                      className="text-secondary hover:text-red-500 text-xs p-1"
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
                    className="text-xs bg-sheet border border-rule rounded-lg p-2 text-primary focus:outline-none focus:border-[var(--brand-ink)]"
                  />
                  <input
                    type="text"
                    value={edu.school}
                    onChange={(e) => handleUpdateEducation(edu.id, 'school', e.target.value)}
                    placeholder="Institution / University"
                    className="text-xs bg-sheet border border-rule rounded-lg p-2 text-primary focus:outline-none focus:border-[var(--brand-ink)]"
                  />
                </div>

                <input
                  type="text"
                  value={edu.year}
                  onChange={(e) => handleUpdateEducation(edu.id, 'year', e.target.value)}
                  placeholder="Graduation year (e.g. 2024)"
                  className="w-full text-xs bg-sheet border border-rule rounded-lg p-2 text-primary focus:outline-none focus:border-[var(--brand-ink)]"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Live Printable ATS Preview */}
        <div
          className={`lg:col-span-6 sticky top-24 ${
            activeTab === 'edit' ? 'hidden lg:block' : 'block'
          }`}
        >
          {/* Print container with exact clean A4/Letter styling */}
          <div
            id="printable-cv"
            className="w-full bg-white text-slate-900 shadow-xl rounded-xl p-6 sm:p-8 space-y-5 border border-slate-200 print:border-none print:shadow-none print:p-0 print:m-0 font-sans text-xs"
          >
            {/* Header */}
            <div className="border-b-2 border-slate-900 pb-4 space-y-1">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h1 className="text-xl sm:text-2xl font-black tracking-tight text-slate-900 uppercase">
                    {data.fullName || 'Your Name'}
                  </h1>
                  <p className="text-xs sm:text-sm font-semibold text-slate-700">
                    {data.title || 'AI Model Evaluator'}
                  </p>
                </div>

                {data.certificateId && (
                  <div className="text-right shrink-0">
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded border border-emerald-600 bg-emerald-50 text-[10px] font-bold text-emerald-800">
                      <ShieldCheck size={11} className="text-emerald-700" />
                      <span>TraceBase Verified: {data.certificateId}</span>
                    </span>
                    <span className="block text-[9px] text-slate-500 font-mono mt-0.5">
                      tracebase.org/verify/{data.certificateId}
                    </span>
                  </div>
                )}
              </div>

              {/* Contact Strip */}
              <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] text-slate-600 pt-2 font-mono">
                {data.email && <span>{data.email}</span>}
                {data.phone && <span>• {data.phone}</span>}
                {data.country && <span>• {data.country}</span>}
                {data.linkedin && <span>• {data.linkedin}</span>}
              </div>
            </div>

            {/* Profile Summary */}
            {data.summary && (
              <div className="space-y-1">
                <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider border-b border-slate-300 pb-0.5">
                  Professional Summary
                </h3>
                <p className="text-[11px] text-slate-700 leading-relaxed">{data.summary}</p>
              </div>
            )}

            {/* Core Competencies */}
            {data.skills.length > 0 && (
              <div className="space-y-1.5">
                <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider border-b border-slate-300 pb-0.5">
                  Core Evaluation Competencies
                </h3>
                <div className="flex flex-wrap gap-1.5">
                  {data.skills.map((s) => (
                    <span
                      key={s}
                      className="px-2 py-0.5 rounded bg-slate-100 text-slate-800 text-[10px] font-semibold border border-slate-200"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Work & Task History */}
            {data.experience.length > 0 && (
              <div className="space-y-2">
                <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider border-b border-slate-300 pb-0.5">
                  Evaluation &amp; Annotation Experience
                </h3>
                <div className="space-y-3">
                  {data.experience.map((exp) => (
                    <div key={exp.id} className="space-y-0.5">
                      <div className="flex items-center justify-between text-[11px]">
                        <span className="font-bold text-slate-900">
                          {exp.role} <span className="font-normal text-slate-600">| {exp.platform}</span>
                        </span>
                        <span className="text-[10px] text-slate-500 tabular-nums">{exp.period}</span>
                      </div>
                      <p className="text-[10px] text-slate-700 whitespace-pre-line leading-relaxed pl-1">
                        {exp.bullets}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Education */}
            {data.education.length > 0 && (
              <div className="space-y-1.5">
                <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider border-b border-slate-300 pb-0.5">
                  Education &amp; Academic Background
                </h3>
                <div className="space-y-1.5">
                  {data.education.map((edu) => (
                    <div key={edu.id} className="flex items-center justify-between text-[11px]">
                      <div>
                        <span className="font-bold text-slate-900">{edu.degree}</span>
                        <span className="text-slate-600">, {edu.school}</span>
                      </div>
                      <span className="text-[10px] text-slate-500 tabular-nums">{edu.year}</span>
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
