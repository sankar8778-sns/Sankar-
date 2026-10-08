import React, { useState } from 'react';
import { 
  FileCheck, 
  ShieldCheck, 
  Download, 
  Copy, 
  Check, 
  FileText, 
  Share2, 
  Calendar, 
  User, 
  Cpu, 
  Layers, 
  Hash, 
  Sparkles,
  QrCode,
  ShieldAlert
} from 'lucide-react';
import { EvidencePassport } from '../types';
import { DemoNoticeBadge } from '../components/common/DemoNoticeBadge';
import { ScientificDisclaimer } from '../components/common/ScientificDisclaimer';

interface Props {
  passports: EvidencePassport[];
  selectedPassportId?: string;
  onNavigateToIntegrity: (passportId: string) => void;
  onNavigateToReport: (passportId: string) => void;
}

export const EvidencePassportPage: React.FC<Props> = ({
  passports,
  selectedPassportId,
  onNavigateToIntegrity,
  onNavigateToReport
}) => {
  const [activePassportId, setActivePassportId] = useState<string>(
    selectedPassportId || passports[0]?.passportId || 'EVP-2026-0001'
  );
  const [copied, setCopied] = useState(false);

  const activePassport = passports.find(p => p.passportId === activePassportId) || passports[0];

  const handleCopyHash = () => {
    if (!activePassport) return;
    navigator.clipboard.writeText(activePassport.sha256Hash);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadJson = () => {
    if (!activePassport) return;
    const blob = new Blob([JSON.stringify(activePassport, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${activePassport.passportId}-evidence-passport.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-200 gap-3">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
              <FileCheck className="w-5 h-5 text-teal-600" />
              Digital Evidence Passport Repository
            </h1>
            <DemoNoticeBadge />
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Tamper-evident, cryptographically sealed computational evidence certificates with SHA-256 signatures.
          </p>
        </div>

        <div className="flex items-center gap-2">
          {activePassport && (
            <>
              <button
                onClick={() => onNavigateToIntegrity(activePassport.passportId)}
                className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs transition-colors shadow-xs"
              >
                <ShieldCheck className="w-4 h-4" />
                <span>Verify Integrity</span>
              </button>
              <button
                onClick={() => onNavigateToReport(activePassport.passportId)}
                className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-teal-600 hover:bg-teal-500 text-white font-semibold text-xs transition-colors shadow-xs"
              >
                <FileText className="w-4 h-4" />
                <span>Generate Report</span>
              </button>
              <button
                onClick={handleDownloadJson}
                className="p-2 rounded-lg border border-slate-300 hover:bg-slate-100 text-slate-700 text-xs transition-colors"
                title="Download Passport JSON"
              >
                <Download className="w-4 h-4" />
              </button>
            </>
          )}
        </div>
      </div>

      <ScientificDisclaimer compact />

      {/* Main Grid: Selector List (Left), Digital Passport Card (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Passports List (4 cols) */}
        <div className="lg:col-span-4 space-y-2">
          <div className="text-[11px] font-mono text-slate-400 uppercase font-semibold px-1">
            Registered Passports ({passports.length})
          </div>
          {passports.map(p => {
            const isSelected = activePassport?.passportId === p.passportId;
            return (
              <div
                key={p.passportId}
                onClick={() => setActivePassportId(p.passportId)}
                className={`p-3.5 rounded-lg border transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-teal-50/60 border-teal-500 ring-1 ring-teal-500/20 shadow-xs'
                    : 'bg-white border-slate-200 hover:border-slate-300'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div>
                    <span className="font-bold text-xs text-slate-900">{p.passportId}</span>
                    <div className="text-[11px] text-slate-600 mt-0.5 font-medium">
                      {p.drugName} ({p.chemicalFormula})
                    </div>
                  </div>
                  <span className="text-[10px] font-mono bg-emerald-100 text-emerald-800 px-1.5 py-0.5 rounded font-bold">
                    {p.status}
                  </span>
                </div>

                <div className="mt-2 text-[10px] font-mono text-slate-400 flex items-center justify-between">
                  <span>System: {p.biologicalSystem}</span>
                  <span>{p.analysisDate}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Digital Evidence Passport (8 cols) */}
        <div className="lg:col-span-8">
          {activePassport ? (
            <div className="relative bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 text-white rounded-2xl p-6 lg:p-8 shadow-xl border-2 border-teal-500/40 overflow-hidden space-y-6">
              {/* Security Holographic Header Bar */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-5 border-b border-slate-800 gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-teal-600/30 border border-teal-400/50 flex items-center justify-center text-teal-300 shadow-inner">
                    <ShieldCheck className="w-7 h-7" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-widest text-teal-400 block font-semibold">
                      CYGEN VAULT OFFICIAL COMPUTATIONAL CREDENTIAL
                    </span>
                    <h2 className="text-xl font-extrabold tracking-tight text-white mt-0.5">
                      EVIDENCE PASSPORT
                    </h2>
                  </div>
                </div>

                <div className="text-left sm:text-right font-mono">
                  <span className="text-[10px] uppercase text-slate-400 block">Passport Identifier</span>
                  <span className="text-lg font-bold text-teal-300 tracking-wider">
                    {activePassport.passportId}
                  </span>
                </div>
              </div>

              {/* Top Details Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 rounded-xl bg-slate-800/60 border border-slate-700/60 text-xs">
                <div>
                  <span className="text-[10px] font-mono uppercase text-slate-400 block">Drug Candidate</span>
                  <span className="font-bold text-white text-sm mt-0.5 block">{activePassport.drugName}</span>
                  <span className="text-[10px] font-mono text-teal-400">{activePassport.drugId} • {activePassport.chemicalFormula}</span>
                </div>

                <div>
                  <span className="text-[10px] font-mono uppercase text-slate-400 block">Biological System</span>
                  <span className="font-bold text-white text-sm mt-0.5 block">{activePassport.biologicalSystem}</span>
                  <span className="text-[10px] font-mono text-slate-400">Profile {activePassport.biologicalProfileId}</span>
                </div>

                <div>
                  <span className="text-[10px] font-mono uppercase text-slate-400 block">Dataset Version</span>
                  <span className="font-bold text-white text-sm mt-0.5 block">{activePassport.datasetVersion}</span>
                  <span className="text-[10px] font-mono text-slate-400">AS GARDIAN Reference</span>
                </div>

                <div>
                  <span className="text-[10px] font-mono uppercase text-slate-400 block">Analysis Date</span>
                  <span className="font-bold text-white text-sm mt-0.5 block">{activePassport.analysisDate}</span>
                  <span className="text-[10px] font-mono text-slate-400">Ref: {activePassport.analysisId}</span>
                </div>
              </div>

              {/* Synthesized Evidence Findings */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                <div className="p-3.5 rounded-lg bg-slate-800/40 border border-slate-700/60">
                  <span className="text-[10px] font-mono uppercase text-slate-400 block">Risk Signal</span>
                  <div className="text-base font-bold font-mono text-amber-400 mt-1">
                    {activePassport.riskSignal}
                  </div>
                  <span className="text-[10px] text-slate-400">Computational hypothesis</span>
                </div>

                <div className="p-3.5 rounded-lg bg-slate-800/40 border border-slate-700/60">
                  <span className="text-[10px] font-mono uppercase text-slate-400 block">Model Agreement</span>
                  <div className="text-base font-bold font-mono text-teal-300 mt-1">
                    {activePassport.modelAgreement}
                  </div>
                  <span className="text-[10px] text-slate-400">Ensemble consensus</span>
                </div>

                <div className="p-3.5 rounded-lg bg-slate-800/40 border border-slate-700/60">
                  <span className="text-[10px] font-mono uppercase text-slate-400 block">Evidence Strength</span>
                  <div className="text-base font-bold font-mono text-slate-200 mt-1">
                    {activePassport.evidenceStrength}
                  </div>
                  <span className="text-[10px] text-slate-400">Quality-weighted score</span>
                </div>

                <div className="p-3.5 rounded-lg bg-slate-800/40 border border-slate-700/60">
                  <span className="text-[10px] font-mono uppercase text-slate-400 block">Uncertainty</span>
                  <div className="text-base font-bold font-mono text-amber-400 mt-1">
                    {activePassport.uncertainty}
                  </div>
                  <span className="text-[10px] text-slate-400">Data gaps & variance</span>
                </div>

                <div className="p-3.5 rounded-lg bg-slate-800/40 border border-slate-700/60 sm:col-span-2">
                  <span className="text-[10px] font-mono uppercase text-slate-400 block">Applicability Domain</span>
                  <div className="text-xs font-bold font-mono text-teal-300 mt-1">
                    {activePassport.applicabilityDomain}
                  </div>
                  <span className="text-[10px] text-slate-400">Physicochemical envelope verified</span>
                </div>
              </div>

              {/* Natural Language Justification Box */}
              <div className="p-4 rounded-xl bg-slate-800/30 border border-slate-700/50 text-xs space-y-2">
                <span className="text-[10px] font-mono uppercase text-teal-400 block font-semibold">
                  Evidence Rationale & Uncertainty Justification
                </span>
                <p className="text-slate-300 leading-relaxed font-light">
                  {activePassport.evidenceStrengthReason}
                </p>
                <p className="text-slate-400 leading-relaxed font-light text-[11px] pt-1 border-t border-slate-800">
                  <strong>Uncertainty Basis:</strong> {activePassport.uncertaintyReason}
                </p>
              </div>

              {/* Cryptographic SHA-256 Signature Stamp */}
              <div className="p-4 rounded-xl bg-slate-950/80 border border-teal-500/30 space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Hash className="w-4 h-4 text-teal-400" />
                    <span className="text-[10px] font-mono uppercase tracking-wider text-teal-400 font-bold">
                      SHA-256 Canonical Integrity Signature
                    </span>
                  </div>
                  <button
                    onClick={handleCopyHash}
                    className="flex items-center gap-1 text-[10px] font-mono text-slate-400 hover:text-white transition-colors"
                  >
                    {copied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                    <span>{copied ? 'Copied!' : 'Copy Hash'}</span>
                  </button>
                </div>

                <div className="font-mono text-xs text-emerald-400 break-all bg-slate-900 p-2.5 rounded-lg border border-slate-800 select-all">
                  {activePassport.sha256Hash}
                </div>

                <div className="flex flex-wrap items-center justify-between text-[10px] font-mono text-slate-400 pt-1">
                  <span>Signer: <strong>{activePassport.createdBy}</strong> ({activePassport.createdRole})</span>
                  <span>Audit Event: {activePassport.auditRefId}</span>
                  <span className="text-teal-400 font-bold">Status: {activePassport.status}</span>
                </div>
              </div>
            </div>
          ) : (
            <div className="p-12 text-center text-xs text-slate-400 bg-white border border-slate-200 rounded-lg">
              No Evidence Passport selected.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
