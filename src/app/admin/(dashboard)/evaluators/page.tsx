import React from "react";
import Link from "next/link";
import { Metadata } from "next";
import { dbRepository } from "@/lib/db/repository";
import { GraduationCap, Mail, ExternalLink } from "lucide-react";

export const metadata: Metadata = {
  title: "Evaluator Talent Network Applications | TraceBase Admin",
  description: "Review incoming specialist applications for human model evaluation sprints.",
};

export default function AdminEvaluatorsPage() {
  const leads = dbRepository.getEvaluatorLeads();

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-primary tracking-tight">
            Evaluator Talent Network
          </h1>
          <p className="text-xs text-secondary mt-1">
            Specialists registered for domain audits (Medicine, Law, STEM, Code, Translation)
          </p>
        </div>
        <div className="text-xs font-mono px-3 py-1.5 rounded-lg border border-subtle bg-surface text-accent-cyan">
          {leads.length} Registered Specialists
        </div>
      </div>

      {leads.length > 0 ? (
        <div className="border border-subtle rounded-xl bg-surface overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-subtle bg-void/50 font-mono text-secondary">
                  <th className="p-3.5">Specialist Name</th>
                  <th className="p-3.5">Domain</th>
                  <th className="p-3.5">Degree / Credential</th>
                  <th className="p-3.5">Experience</th>
                  <th className="p-3.5">Country</th>
                  <th className="p-3.5">Availability</th>
                  <th className="p-3.5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-subtle">
                {leads.map((lead) => (
                  <tr key={lead.id} className="hover:bg-void/40 transition-colors">
                    <td className="p-3.5 font-medium text-primary">
                      <div className="space-y-0.5">
                        <div className="font-semibold">{lead.name}</div>
                        <div className="text-secondary font-mono text-[11px]">
                          {lead.email}
                        </div>
                      </div>
                    </td>
                    <td className="p-3.5 text-accent-cyan font-mono font-medium">
                      {lead.domain}
                    </td>
                    <td className="p-3.5 text-readable max-w-[200px]">
                      {lead.credentials}
                    </td>
                    <td className="p-3.5 text-secondary">
                      {lead.years_experience}
                    </td>
                    <td className="p-3.5 font-mono text-secondary">
                      {lead.country_code}
                    </td>
                    <td className="p-3.5 text-secondary">
                      {lead.weekly_hours}
                    </td>
                    <td className="p-3.5 text-right">
                      <div className="flex items-center justify-end gap-2">
                        {lead.portfolio_url && (
                          <a
                            href={lead.portfolio_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-1.5 rounded border border-subtle hover:border-focus text-secondary hover:text-primary transition-colors"
                            title="LinkedIn or Portfolio"
                          >
                            <ExternalLink size={13} />
                          </a>
                        )}
                        <a
                          href={`mailto:${lead.email}?subject=TraceBase Model Evaluation Sprint Inquiry`}
                          className="px-2.5 py-1 rounded bg-accent-cyan/15 hover:bg-accent-cyan/25 text-accent-cyan font-medium transition-colors flex items-center gap-1"
                        >
                          <Mail size={12} />
                          <span>Contact</span>
                        </a>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="p-8 rounded-xl border border-subtle bg-surface text-center space-y-2">
          <GraduationCap className="mx-auto text-secondary" size={28} />
          <p className="text-sm font-semibold text-primary">No applications received yet</p>
          <p className="text-xs text-secondary">
            Applications submitted on <Link href="/evaluation/evaluators" className="text-accent-cyan hover:underline">/evaluation/evaluators</Link> will appear here.
          </p>
        </div>
      )}
    </div>
  );
}
