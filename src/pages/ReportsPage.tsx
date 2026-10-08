import React, { useState } from 'react';
import { 
  FileText, 
  Printer, 
  Download, 
  Share2, 
  ShieldCheck, 
  FlaskConical, 
  AlertTriangle, 
  CheckCircle2, 
  Calendar, 
  User, 
  Hash, 
  Layers, 
  Copy, 
  Check 
} from 'lucide-react';
import { ComputationalReport, AnalysisRecord, EvidencePassport } from '../types';
import { DemoNoticeBadge } from '../components/common/DemoNoticeBadge';
import { ScientificDisclaimer } from '../components/common/ScientificDisclaimer';

interface Props {
  reports: ComputationalReport[];
  analyses: AnalysisRecord[];
  passports: EvidencePassport[];
  selectedReportId?: string;
  onGenerateReportFromAnalysis: (analysis: AnalysisRecord) => void;
}

export const ReportsPage: React.FC<Props> = ({
  reports,
  analyses,
  passports,
  selectedReportId,
  onGenerateReportFromAnalysis
}) => {
  const [activeReportId, setActiveReportId] = useState<string>(
    selectedReportId || reports[0]?.reportId || 'RPT-2026-0001'
  );
  const [copiedMd, setCopiedMd] = useState(false);

  const report = reports.find(r => r.reportId === activeReportId) || reports[0];

  const handlePrint = () => {
    window.print();
  };

  const handleExportMarkdown = () => {
    if (!report) return;
    const md = `# CYGEN VAULT Analysis Report
**Report ID:** ${report.reportId}  
**Analysis ID:** ${report.analysisId}  
**Evidence Passport:** ${report.passportId}  
**Dataset Version:** ${report.datasetVersion}  
**Model Versions:** ${report.modelVersions}  
**Date:** ${report.generatedAt}  
**Auditor / User:** ${report.generatedBy}  
**Audit Reference:** ${report.auditReference}  
**SHA-256 Signature:** \`${report.sha256Hash}\`

---

## 1. Drug Candidate
${report.drugName} (${report.chemicalFormula})

## 2. Biological System
${report.biologicalSystem}

## 3. Molecular Evidence
${report.molecularEvidenceStatus}

## 4. Biological Evidence
${report.biologicalEvidenceStatus}

## 5. Target Analysis
${report.targetAnalysisSummary}

## 6. Pathway Analysis
${report.pathwayAnalysisSummary}

## 7. AI/ML Ensemble Result
**Computational Risk Signal:** ${report.aiMlResult} Risk Signal  
**Model Agreement:** ${report.modelAgreement}

## 8. Evidence Strength
**Level:** ${report.evidenceStrength}  
**Rationale:** ${report.evidenceStrengthReason}

## 9. Uncertainty Analysis
**Level:** ${report.uncertainty}  
**Rationale:** ${report.uncertaintyReason}

## 10. Applicability Domain
${report.applicabilityDomain}

---

## 11. Experimental Recommendation
"${report.experimentalRecommendation}"

## 12. Scientific & Regulatory Disclaimer
"${report.scientificStatement}"
`;

    const blob = new Blob([md], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${report.reportId}-computational-evidence-report.md`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-200 gap-3 no-print">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
              <FileText className="w-5 h-5 text-teal-600" />
              Computational Evidence Reports
            </h1>
            <DemoNoticeBadge />
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Formal decision-support dossiers incorporating multi-omics, machine learning consensus, and SHA-256 seal.
          </p>
        </div>

        {report && (
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-300 hover:bg-slate-100 text-slate-700 font-semibold text-xs transition-colors"
            >
              <Printer className="w-4 h-4" />
              <span>Print / PDF</span>
            </button>
            <button
              onClick={handleExportMarkdown}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-teal-600 hover:bg-teal-500 text-white font-semibold text-xs transition-colors shadow-xs"
            >
              <Download className="w-4 h-4" />
              <span>Download Markdown</span>
            </button>
          </div>
        )}
      </div>

      <div className="no-print">
        <ScientificDisclaimer compact />
      </div>

      {/* Main Grid: Left Selector, Right Formal Report Paper */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Reports Index (4 cols) - Hidden in Print */}
        <div className="lg:col-span-4 space-y-2 no-print">
          <div className="text-[11px] font-mono text-slate-400 uppercase font-semibold px-1">
            Generated Reports ({reports.length})
          </div>

          {reports.map(r => {
            const isSelected = activeReportId === r.reportId;
            return (
              <div
                key={r.reportId}
                onClick={() => setActiveReportId(r.reportId)}
                className={`p-3.5 rounded-lg border transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-teal-50/60 border-teal-500 ring-1 ring-teal-500/20 shadow-xs'
                    : 'bg-white border-slate-200 hover:border-slate-300'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div>
                    <span className="font-bold text-xs text-slate-900">{r.reportId}</span>
                    <div className="text-[11px] font-semibold text-slate-700 mt-0.5">
                      {r.drugName}
                    </div>
                  </div>
                  <span className="text-[10px] font-mono bg-teal-50 text-teal-800 px-1.5 py-0.5 rounded border border-teal-200">
                    {r.passportId}
                  </span>
                </div>

                <div className="mt-2 text-[10px] font-mono text-slate-400 flex items-center justify-between">
                  <span>{r.biologicalSystem.split('(')[0]}</span>
                  <span>{r.generatedAt.split(' ')[0]}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Printable Formal Scientific Report Paper (8 cols) */}
        <div className="lg:col-span-8">
          {report ? (
            <div className="bg-white border border-slate-200 rounded-xl p-8 shadow-sm space-y-6 text-slate-900">
              {/* Report Header */}
              <div className="border-b-2 border-slate-900 pb-5 space-y-2">
                <div className="flex items-center justify-between text-xs font-mono text-slate-500">
                  <span>CYGEN VAULT COMPUTATIONAL EVIDENCE DOSSIER</span>
                  <span>REPORT ID: {report.reportId}</span>
                </div>
                <h1 className="text-2xl font-extrabold tracking-tight text-slate-950">
                  CYGEN VAULT Analysis Report
                </h1>
                <p className="text-xs text-slate-600 font-mono">
                  Analysis ID: <strong>{report.analysisId}</strong> | Evidence Passport: <strong>{report.passportId}</strong> | Audit Ref: <strong>{report.auditReference}</strong>
                </p>
              </div>

              {/* Metadata strip */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-3.5 bg-slate-50 rounded-lg border border-slate-200 text-xs font-mono">
                <div>
                  <span className="text-[10px] text-slate-400 uppercase block">Dataset Version</span>
                  <span className="font-bold text-slate-800">{report.datasetVersion}</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 uppercase block">Model Version</span>
                  <span className="font-bold text-slate-800">{report.modelVersions.split('(')[0]}</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 uppercase block">Generated By</span>
                  <span className="font-bold text-slate-800">{report.generatedBy}</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 uppercase block">Timestamp (UTC)</span>
                  <span className="font-bold text-slate-800">{report.generatedAt}</span>
                </div>
              </div>

              {/* Sections Matching Section 22 structure */}
              <div className="space-y-4 text-xs divide-y divide-slate-100">
                {/* 1. Drug Candidate */}
                <div className="pt-3">
                  <h3 className="font-bold text-slate-900 uppercase tracking-wide text-xs mb-1">
                    1. Drug Candidate
                  </h3>
                  <p className="text-slate-700">
                    <strong>{report.drugName}</strong> (Formula: {report.chemicalFormula})
                  </p>
                </div>

                {/* 2. Biological System */}
                <div className="pt-3">
                  <h3 className="font-bold text-slate-900 uppercase tracking-wide text-xs mb-1">
                    2. Biological System
                  </h3>
                  <p className="text-slate-700">
                    {report.biologicalSystem}
                  </p>
                </div>

                {/* 3. Molecular Evidence */}
                <div className="pt-3">
                  <h3 className="font-bold text-slate-900 uppercase tracking-wide text-xs mb-1">
                    3. Molecular Evidence
                  </h3>
                  <p className="text-slate-700">
                    {report.molecularEvidenceStatus}
                  </p>
                </div>

                {/* 4. Biological Evidence */}
                <div className="pt-3">
                  <h3 className="font-bold text-slate-900 uppercase tracking-wide text-xs mb-1">
                    4. Biological Evidence
                  </h3>
                  <p className="text-slate-700">
                    {report.biologicalEvidenceStatus}
                  </p>
                </div>

                {/* 5. Target Analysis */}
                <div className="pt-3">
                  <h3 className="font-bold text-slate-900 uppercase tracking-wide text-xs mb-1">
                    5. Target Analysis
                  </h3>
                  <p className="text-slate-700">
                    {report.targetAnalysisSummary}
                  </p>
                </div>

                {/* 6. Pathway Analysis */}
                <div className="pt-3">
                  <h3 className="font-bold text-slate-900 uppercase tracking-wide text-xs mb-1">
                    6. Pathway Analysis
                  </h3>
                  <p className="text-slate-700">
                    {report.pathwayAnalysisSummary}
                  </p>
                </div>

                {/* 7. AI/ML Result & Agreement */}
                <div className="pt-3">
                  <h3 className="font-bold text-slate-900 uppercase tracking-wide text-xs mb-1">
                    7. AI/ML Multi-Model Results
                  </h3>
                  <div className="p-3 bg-slate-50 rounded border border-slate-100 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] uppercase text-slate-400 font-mono block">Ensemble Risk Signal</span>
                      <strong className="text-amber-800 text-sm font-mono">{report.aiMlResult} Risk Signal</strong>
                    </div>
                    <div className="text-right">
                      <span className="text-[10px] uppercase text-slate-400 font-mono block">Model Agreement</span>
                      <strong className="text-slate-900 font-mono">{report.modelAgreement}</strong>
                    </div>
                  </div>
                </div>

                {/* 8. Evidence Strength */}
                <div className="pt-3">
                  <h3 className="font-bold text-slate-900 uppercase tracking-wide text-xs mb-1">
                    8. Evidence Strength
                  </h3>
                  <p className="text-slate-800 font-semibold mb-1">
                    Level: <span className="font-mono">{report.evidenceStrength}</span>
                  </p>
                  <p className="text-slate-600 leading-relaxed">
                    {report.evidenceStrengthReason}
                  </p>
                </div>

                {/* 9. Uncertainty Analysis */}
                <div className="pt-3">
                  <h3 className="font-bold text-slate-900 uppercase tracking-wide text-xs mb-1">
                    9. Uncertainty Analysis
                  </h3>
                  <p className="text-slate-800 font-semibold mb-1">
                    Level: <span className="font-mono">{report.uncertainty}</span>
                  </p>
                  <p className="text-slate-600 leading-relaxed">
                    {report.uncertaintyReason}
                  </p>
                </div>

                {/* 10. Applicability Domain */}
                <div className="pt-3">
                  <h3 className="font-bold text-slate-900 uppercase tracking-wide text-xs mb-1">
                    10. Applicability Domain
                  </h3>
                  <p className="text-slate-700 font-mono">
                    {report.applicabilityDomain}
                  </p>
                </div>

                {/* 11. Experimental Recommendation */}
                <div className="pt-3 bg-teal-50/50 p-4 rounded-lg border border-teal-100">
                  <h3 className="font-bold text-teal-900 uppercase tracking-wide text-xs mb-1 flex items-center gap-1.5">
                    <FlaskConical className="w-4 h-4 text-teal-700" />
                    11. Experimental Prioritization Recommendation
                  </h3>
                  <p className="text-slate-800 font-semibold text-xs leading-relaxed">
                    &ldquo;{report.experimentalRecommendation}&rdquo;
                  </p>
                </div>

                {/* 12. Scientific Statement */}
                <div className="pt-3 bg-amber-50/50 p-4 rounded-lg border border-amber-200">
                  <h3 className="font-bold text-amber-900 uppercase tracking-wide text-xs mb-1">
                    12. Mandatory Scientific & Regulatory Statement
                  </h3>
                  <p className="text-amber-950 font-medium text-xs leading-relaxed">
                    &ldquo;{report.scientificStatement}&rdquo;
                  </p>
                </div>
              </div>

              {/* SHA-256 Signature Seal Footer */}
              <div className="pt-4 border-t-2 border-slate-900 space-y-2">
                <div className="flex items-center justify-between text-[11px] font-mono">
                  <span className="font-bold text-slate-900 flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-emerald-600" />
                    CRYPTOGRAPHIC RECORD SIGNATURE (SHA-256)
                  </span>
                  <span className="text-slate-500">SEALED & IMMUTABLE</span>
                </div>
                <div className="p-2.5 bg-slate-900 text-teal-300 font-mono text-[11px] rounded break-all select-all">
                  {report.sha256Hash}
                </div>
              </div>
            </div>
          ) : (
            <div className="p-12 text-center text-xs text-slate-400 bg-white border border-slate-200 rounded-lg">
              No report selected.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
