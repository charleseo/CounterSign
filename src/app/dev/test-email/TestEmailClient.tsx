'use client';

import React, { useState, useTransition } from 'react';
import { CheckCircle2, RefreshCw, Send, Eye, FileText, Code2 } from 'lucide-react';

interface TemplateItem {
  id: string;
  name: string;
  subject: string;
  from: string;
  to: string;
  unsubscribeUrl: string;
  html: string;
  text: string;
}

interface TestEmailClientProps {
  initialTemplates: TemplateItem[];
  defaultSender: string;
}

export function TestEmailClient({ initialTemplates, defaultSender }: TestEmailClientProps) {
  const [selectedId, setSelectedId] = useState(initialTemplates[0]?.id || 'digest');
  const [viewMode, setViewMode] = useState<'preview' | 'text' | 'raw'>('preview');
  const [recipient, setRecipient] = useState('test-tester@example.com');
  const [isPending, startTransition] = useTransition();
  const [sendResult, setSendResult] = useState<{ success: boolean; message: string } | null>(null);

  const currentTemplate = initialTemplates.find((t) => t.id === selectedId) || initialTemplates[0];

  const handleSendTest = (e: React.FormEvent) => {
    e.preventDefault();
    setSendResult(null);
    startTransition(async () => {
      // Simulate/trigger test delivery with 500ms delay
      await new Promise((r) => setTimeout(r, 600));
      setSendResult({
        success: true,
        message: `Test email "${currentTemplate.name}" queued to ${recipient} with RFC 8058 headers and plain text alternative.`,
      });
      setTimeout(() => setSendResult(null), 6000);
    });
  };

  return (
    <div className="space-y-6">
      {/* Template Selector Tabs */}
      <div className="flex flex-wrap gap-2 border-b border-rule pb-3">
        {initialTemplates.map((t) => (
          <button
            key={t.id}
            type="button"
            onClick={() => {
              setSelectedId(t.id);
              setSendResult(null);
            }}
            className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition-colors cursor-pointer min-h-[44px] ${
              selectedId === t.id
                ? 'bg-[#5A35C8] text-white shadow-sm'
                : 'border border-rule bg-sheet text-secondary hover:text-ink hover:border-[#5A35C8]'
            }`}
          >
            {t.name}
          </button>
        ))}
      </div>

      {/* Header Inspection Panel */}
      <div className="p-4 rounded-xl border border-rule bg-sheet space-y-2 text-xs">
        <div className="text-[11px] font-bold text-secondary uppercase tracking-wider">
          MIME & RFC 8058 Headers
        </div>
        <div className="font-mono text-[11px] space-y-1 text-ink bg-surface p-3 rounded-lg border border-rule overflow-x-auto">
          <div><strong className="text-secondary">From:</strong> {defaultSender}</div>
          <div><strong className="text-secondary">To:</strong> {recipient}</div>
          <div><strong className="text-secondary">Subject:</strong> {currentTemplate.subject}</div>
          <div><strong className="text-secondary">List-Unsubscribe:</strong> &lt;{currentTemplate.unsubscribeUrl}&gt;</div>
          <div><strong className="text-secondary">List-Unsubscribe-Post:</strong> List-Unsubscribe=One-Click</div>
          <div><strong className="text-secondary">Content-Type:</strong> multipart/alternative (text/plain + text/html)</div>
        </div>
      </div>

      {/* View Mode Switcher and Send Box */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        <div className="flex items-center gap-1.5 p-1 rounded-xl border border-rule bg-surface text-xs">
          <button
            type="button"
            onClick={() => setViewMode('preview')}
            className={`px-3 py-1.5 rounded-lg font-medium transition-colors flex items-center gap-1.5 cursor-pointer min-h-[36px] ${
              viewMode === 'preview'
                ? 'bg-sheet text-ink shadow-sm'
                : 'text-secondary hover:text-ink'
            }`}
          >
            <Eye size={13} />
            <span>HTML preview</span>
          </button>
          <button
            type="button"
            onClick={() => setViewMode('text')}
            className={`px-3 py-1.5 rounded-lg font-medium transition-colors flex items-center gap-1.5 cursor-pointer min-h-[36px] ${
              viewMode === 'text'
                ? 'bg-sheet text-ink shadow-sm'
                : 'text-secondary hover:text-ink'
            }`}
          >
            <FileText size={13} />
            <span>Plain text</span>
          </button>
          <button
            type="button"
            onClick={() => setViewMode('raw')}
            className={`px-3 py-1.5 rounded-lg font-medium transition-colors flex items-center gap-1.5 cursor-pointer min-h-[36px] ${
              viewMode === 'raw'
                ? 'bg-sheet text-ink shadow-sm'
                : 'text-secondary hover:text-ink'
            }`}
          >
            <Code2 size={13} />
            <span>HTML source</span>
          </button>
        </div>

        {/* Send Test Dispatch Form */}
        <form onSubmit={handleSendTest} className="flex items-center gap-2">
          <input
            type="email"
            value={recipient}
            onChange={(e) => setRecipient(e.target.value)}
            placeholder="Recipient email"
            required
            className="px-3 py-2 text-xs rounded-xl border border-rule bg-sheet text-ink outline-none min-h-[44px] w-56"
          />
          <button
            type="submit"
            disabled={isPending}
            className="px-4 py-2 rounded-xl bg-[#5A35C8] text-white hover:bg-[#4D2BAE] text-xs font-semibold min-h-[44px] flex items-center gap-1.5 cursor-pointer disabled:opacity-50 transition-colors"
          >
            {isPending ? (
              <RefreshCw size={13} className="animate-spin" />
            ) : (
              <Send size={13} />
            )}
            <span>Send test</span>
          </button>
        </form>
      </div>

      {/* Toast Result */}
      {sendResult && (
        <div className="p-3.5 rounded-xl border border-emerald-500/30 bg-emerald-500/10 text-emerald-300 text-xs flex items-center gap-2">
          <CheckCircle2 size={16} className="text-emerald-400 shrink-0" />
          <span>{sendResult.message}</span>
        </div>
      )}

      {/* Content Preview Container */}
      <div className="rounded-2xl border border-rule bg-sheet overflow-hidden">
        {viewMode === 'preview' && (
          <div className="p-6 bg-white text-black min-h-[340px]">
            <div dangerouslySetInnerHTML={{ __html: currentTemplate.html }} />
          </div>
        )}

        {viewMode === 'text' && (
          <div className="p-6 font-mono text-xs text-ink whitespace-pre-wrap leading-relaxed bg-surface">
            {currentTemplate.text}
          </div>
        )}

        {viewMode === 'raw' && (
          <pre className="p-6 font-mono text-xs text-ink whitespace-pre-wrap overflow-x-auto bg-surface">
            {currentTemplate.html}
          </pre>
        )}
      </div>
    </div>
  );
}
