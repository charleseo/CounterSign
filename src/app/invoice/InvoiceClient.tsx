'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import {
  FileText,
  Printer,
  Download,
  Plus,
  Trash2,
  ShieldCheck,
  CheckCircle2,
  Info,
  DollarSign,
  ArrowRight,
} from 'lucide-react';

interface InvoiceLine {
  id: string;
  description: string;
  hours: number;
  rate: number;
}

export function InvoiceClient() {
  const [contractorName, setContractorName] = useState('Chinedu Okonkwo');
  const [contractorEmail, setContractorEmail] = useState('chinedu.evaluator@example.com');
  const [contractorAddress, setContractorAddress] = useState('Lagos, Nigeria');
  
  const [clientName, setClientName] = useState('Deel Inc. / Outlier AI Project');
  const [clientAddress, setClientAddress] = useState('425 2nd St, Suite 400, San Francisco, CA 94107, USA');
  
  const [invoiceNumber, setInvoiceNumber] = useState('INV-2026-001');
  const [invoiceDate, setInvoiceDate] = useState('2026-10-17');
  const [dueDate, setDueDate] = useState('2026-10-24');
  const [currency, setCurrency] = useState('USD');
  
  const [bankName, setBankName] = useState('Access Bank Plc (Domiciliary USD)');
  const [accountNumber, setAccountNumber] = useState('0123456789');
  const [swiftCode, setSwiftCode] = useState('ABNILGXXX');
  const [routingInfo, setRoutingInfo] = useState('Routing: 044 (Local NGN / USD Clearing)');

  const [lines, setLines] = useState<InvoiceLine[]>([
    {
      id: 'line-1',
      description: 'AI model evaluation and prompt response pairwise review (Python & Reasoning sprint)',
      hours: 32,
      rate: 40,
    },
    {
      id: 'line-2',
      description: 'Negative constraint and citation grounding quality audit',
      hours: 8,
      rate: 40,
    },
  ]);

  const handleAddLine = () => {
    setLines((prev) => [
      ...prev,
      {
        id: `line-${Date.now()}`,
        description: 'Model evaluation service',
        hours: 10,
        rate: 35,
      },
    ]);
  };

  const handleRemoveLine = (id: string) => {
    if (lines.length <= 1) return;
    setLines((prev) => prev.filter((l) => l.id !== id));
  };

  const handleUpdateLine = (id: string, field: 'description' | 'hours' | 'rate', value: string | number) => {
    setLines((prev) =>
      prev.map((line) => {
        if (line.id === id) {
          return { ...line, [field]: value };
        }
        return line;
      })
    );
  };

  const totalAmount = useMemo(() => {
    return lines.reduce((acc, curr) => acc + Number(curr.hours || 0) * Number(curr.rate || 0), 0);
  }, [lines]);

  const handlePrint = () => {
    if (typeof window !== 'undefined') {
      window.print();
    }
  };

  return (
    <div className="space-y-8">
      {/* Privacy Notice Banner */}
      <div className="p-4 rounded-xl border border-rule bg-sheet text-xs text-secondary flex items-start gap-3 print:hidden">
        <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
        <p className="leading-relaxed">
          <strong className="text-ink">100% private and client-side:</strong> TraceBase never saves your bank details, names, or invoice records. All information stays inside your browser. Use this tool to generate clean invoices for local bank foreign exchange verification.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 print:block">
        {/* Left Input Form (Hidden on Print) */}
        <div className="lg:col-span-5 space-y-6 print:hidden">
          <div className="rounded-xl border border-rule bg-sheet p-5 space-y-4">
            <h2 className="text-sm font-bold text-ink flex items-center gap-2">
              <FileText className="w-4 h-4 text-[#5A35C8]" />
              Your contractor details
            </h2>

            <div className="space-y-3 text-xs">
              <div>
                <label className="text-secondary font-medium block mb-1">Your legal full name</label>
                <input
                  type="text"
                  value={contractorName}
                  onChange={(e) => setContractorName(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-rule bg-surface text-ink focus:outline-none focus:border-[#5A35C8]"
                />
              </div>

              <div>
                <label className="text-secondary font-medium block mb-1">Your email</label>
                <input
                  type="email"
                  value={contractorEmail}
                  onChange={(e) => setContractorEmail(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-rule bg-surface text-ink focus:outline-none focus:border-[#5A35C8]"
                />
              </div>

              <div>
                <label className="text-secondary font-medium block mb-1">Address and country</label>
                <input
                  type="text"
                  value={contractorAddress}
                  onChange={(e) => setContractorAddress(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-rule bg-surface text-ink focus:outline-none focus:border-[#5A35C8]"
                />
              </div>
            </div>
          </div>

          {/* Client Details */}
          <div className="rounded-xl border border-rule bg-sheet p-5 space-y-4">
            <h2 className="text-sm font-bold text-ink">Client or platform details</h2>
            <div className="space-y-3 text-xs">
              <div>
                <label className="text-secondary font-medium block mb-1">Client / Platform name</label>
                <input
                  type="text"
                  value={clientName}
                  onChange={(e) => setClientName(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-rule bg-surface text-ink focus:outline-none focus:border-[#5A35C8]"
                />
              </div>

              <div>
                <label className="text-secondary font-medium block mb-1">Client address</label>
                <input
                  type="text"
                  value={clientAddress}
                  onChange={(e) => setClientAddress(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-rule bg-surface text-ink focus:outline-none focus:border-[#5A35C8]"
                />
              </div>
            </div>
          </div>

          {/* Invoice Meta */}
          <div className="rounded-xl border border-rule bg-sheet p-5 space-y-4">
            <h2 className="text-sm font-bold text-ink">Invoice metadata</h2>
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div>
                <label className="text-secondary font-medium block mb-1">Invoice number</label>
                <input
                  type="text"
                  value={invoiceNumber}
                  onChange={(e) => setInvoiceNumber(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-rule bg-surface text-ink focus:outline-none focus:border-[#5A35C8]"
                />
              </div>

              <div>
                <label className="text-secondary font-medium block mb-1">Currency</label>
                <select
                  value={currency}
                  onChange={(e) => setCurrency(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-rule bg-surface text-ink focus:outline-none focus:border-[#5A35C8]"
                >
                  <option value="USD">USD ($)</option>
                  <option value="EUR">EUR (€)</option>
                  <option value="GBP">GBP (£)</option>
                  <option value="CAD">CAD ($)</option>
                </select>
              </div>

              <div>
                <label className="text-secondary font-medium block mb-1">Issue date</label>
                <input
                  type="date"
                  value={invoiceDate}
                  onChange={(e) => setInvoiceDate(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-rule bg-surface text-ink focus:outline-none focus:border-[#5A35C8]"
                />
              </div>

              <div>
                <label className="text-secondary font-medium block mb-1">Due date</label>
                <input
                  type="date"
                  value={dueDate}
                  onChange={(e) => setDueDate(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-rule bg-surface text-ink focus:outline-none focus:border-[#5A35C8]"
                />
              </div>
            </div>
          </div>

          {/* Beneficiary Banking */}
          <div className="rounded-xl border border-rule bg-sheet p-5 space-y-4">
            <h2 className="text-sm font-bold text-ink">Payout bank information</h2>
            <div className="space-y-3 text-xs">
              <div>
                <label className="text-secondary font-medium block mb-1">Bank name</label>
                <input
                  type="text"
                  value={bankName}
                  onChange={(e) => setBankName(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-rule bg-surface text-ink focus:outline-none focus:border-[#5A35C8]"
                />
              </div>

              <div>
                <label className="text-secondary font-medium block mb-1">Account number / IBAN</label>
                <input
                  type="text"
                  value={accountNumber}
                  onChange={(e) => setAccountNumber(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-rule bg-surface text-ink focus:outline-none focus:border-[#5A35C8]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-secondary font-medium block mb-1">SWIFT / BIC code</label>
                  <input
                    type="text"
                    value={swiftCode}
                    onChange={(e) => setSwiftCode(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-rule bg-surface text-ink focus:outline-none focus:border-[#5A35C8]"
                  />
                </div>
                <div>
                  <label className="text-secondary font-medium block mb-1">Routing / Branch code</label>
                  <input
                    type="text"
                    value={routingInfo}
                    onChange={(e) => setRoutingInfo(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-rule bg-surface text-ink focus:outline-none focus:border-[#5A35C8]"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Preview Pane (Visible on Print) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="flex items-center justify-between print:hidden">
            <span className="text-xs font-semibold text-secondary">
              Live printable invoice preview
            </span>
            <button
              type="button"
              onClick={handlePrint}
              className="px-4 py-2 rounded-xl bg-[#5A35C8] hover:bg-[#4D2DB3] text-white text-xs font-semibold inline-flex items-center gap-1.5 transition-colors shadow-sm min-h-[44px]"
            >
              <Printer className="w-4 h-4" />
              <span>Print or save as PDF</span>
            </button>
          </div>

          {/* Actual Printable Invoice Card */}
          <div className="rounded-2xl border border-slate-300 bg-white text-slate-900 p-6 sm:p-10 space-y-8 shadow-sm font-sans print:border-none print:shadow-none print:p-0">
            {/* Invoice Top Header */}
            <div className="flex items-start justify-between border-b border-slate-200 pb-6">
              <div>
                <h1 className="text-2xl font-black tracking-tight text-slate-950 uppercase">
                  Invoice
                </h1>
                <span className="text-xs font-mono text-slate-500 font-bold">{invoiceNumber}</span>
              </div>

              <div className="text-right space-y-0.5 text-xs text-slate-600">
                <div className="font-bold text-slate-900 text-sm">{contractorName}</div>
                <div>{contractorEmail}</div>
                <div>{contractorAddress}</div>
              </div>
            </div>

            {/* Bill To & Dates Grid */}
            <div className="grid grid-cols-2 gap-6 text-xs border-b border-slate-200 pb-6">
              <div className="space-y-1">
                <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                  Billed to
                </span>
                <div className="font-bold text-slate-900 text-sm">{clientName}</div>
                <div className="text-slate-600 leading-relaxed">{clientAddress}</div>
              </div>

              <div className="space-y-1 text-right">
                <div>
                  <span className="text-slate-500">Date issued: </span>
                  <span className="font-semibold text-slate-900">{invoiceDate}</span>
                </div>
                <div>
                  <span className="text-slate-500">Payment due: </span>
                  <span className="font-semibold text-slate-900">{dueDate}</span>
                </div>
                <div>
                  <span className="text-slate-500">Currency: </span>
                  <span className="font-bold text-slate-950">{currency}</span>
                </div>
              </div>
            </div>

            {/* Line Items Table */}
            <div className="space-y-3">
              <div className="flex items-center justify-between text-[11px] font-bold uppercase tracking-wider text-slate-500 border-b border-slate-300 pb-2">
                <span className="w-3/5">Service description</span>
                <span className="w-1/6 text-right">Hours</span>
                <span className="w-1/6 text-right">Rate</span>
                <span className="w-1/6 text-right">Amount</span>
              </div>

              <div className="divide-y divide-slate-100 text-xs">
                {lines.map((line) => (
                  <div key={line.id} className="py-2.5 flex items-center justify-between gap-2">
                    <div className="w-3/5 font-medium text-slate-800">
                      <input
                        type="text"
                        value={line.description}
                        onChange={(e) => handleUpdateLine(line.id, 'description', e.target.value)}
                        className="w-full bg-transparent border-none p-0 focus:outline-none focus:ring-1 focus:ring-[#5A35C8] rounded"
                      />
                    </div>
                    <div className="w-1/6 text-right font-mono">
                      <input
                        type="number"
                        value={line.hours}
                        onChange={(e) => handleUpdateLine(line.id, 'hours', Number(e.target.value))}
                        className="w-16 text-right bg-transparent border-none p-0 focus:outline-none focus:ring-1 focus:ring-[#5A35C8] rounded"
                      />
                    </div>
                    <div className="w-1/6 text-right font-mono text-slate-600">
                      ${line.rate}
                    </div>
                    <div className="w-1/6 text-right font-mono font-bold text-slate-900">
                      ${(line.hours * line.rate).toLocaleString()}
                    </div>
                  </div>
                ))}
              </div>

              {/* Add line item button (hidden on print) */}
              <button
                type="button"
                onClick={handleAddLine}
                className="text-xs text-[#5A35C8] hover:underline inline-flex items-center gap-1 font-semibold pt-1 print:hidden min-h-[36px]"
              >
                <Plus size={13} />
                <span>Add line item</span>
              </button>
            </div>

            {/* Total Row */}
            <div className="border-t-2 border-slate-950 pt-4 flex items-center justify-between">
              <span className="text-sm font-bold text-slate-950 uppercase tracking-wider">
                Total amount due
              </span>
              <span className="text-2xl font-black text-slate-950 font-mono">
                {currency === 'USD' ? '$' : currency === 'GBP' ? '£' : '€'}
                {totalAmount.toLocaleString()}
              </span>
            </div>

            {/* Remittance & Bank Settlement Box */}
            <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-2 text-xs">
              <span className="font-bold text-slate-900 block text-[11px] uppercase tracking-wider">
                Remittance &amp; Wire Settlement Instructions
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-slate-700 text-[11px]">
                <div>
                  <span className="text-slate-500">Bank:</span> {bankName}
                </div>
                <div>
                  <span className="text-slate-500">Account:</span> {accountNumber}
                </div>
                <div>
                  <span className="text-slate-500">SWIFT / BIC:</span> {swiftCode}
                </div>
                <div>
                  <span className="text-slate-500">Clearing info:</span> {routingInfo}
                </div>
              </div>
            </div>

            {/* Compliance Foreign Service Declaration */}
            <div className="text-[10px] text-slate-500 leading-relaxed border-t border-slate-200 pt-4">
              <strong className="text-slate-700">Foreign Independent Contractor Declaration:</strong> All evaluation services listed on this invoice were performed physically outside the United States as an independent contractor. Under US Internal Revenue Code Sections 861 and 862, this income constitutes foreign-source compensation exempt from United States federal withholding taxes. Form W-8BEN is on file.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
