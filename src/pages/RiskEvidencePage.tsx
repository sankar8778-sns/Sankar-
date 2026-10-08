import React from 'react';
import { 
  AlertTriangle, 
  Scale, 
  CheckCircle2, 
  HelpCircle, 
  Compass, 
  TrendingUp, 
  ShieldCheck, 
  FlaskConical, 
  FileCheck, 
  Info,
  Layers,
  ArrowRight
} from 'lucide-react';
import { AnalysisRecord } from '../types';
import { DemoNoticeBadge } from '../components/common/DemoNoticeBadge';
import { ScientificDisclaimer } from '../components/common/ScientificDisclaimer';

interface Props {
  analysis: AnalysisRecord;
  onNavigateToPassport: () => void;
}

export const RiskEvidencePage: React.FC<Props> = ({
  analysis,
  onNavigateToPassport
}) => {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-200 gap-3">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
              <Scale className="w-5 h-5 text-teal-600" />
              Risk Signal, Evidence Strength & Uncertainty Analysis
            </h1>
            <DemoNoticeBadge />
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Multivariate evidence synthesis for <strong className="text-slate-800">{analysis.drugName}</strong> against <strong className="text-slate-800">{analysis.biologicalSystem}</strong>.
          </p>
        </div>

        <button
          onClick={onNavigateToPassport}
          className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-teal-600 hover:bg-teal-500 text-white font-semibold text-xs transition-colors shadow-xs"
        >
          <FileCheck className="w-4 h-4" />
          <span>Inspect Evidence Passport</span>
        </button>
      </div>

      <ScientificDisclaimer />

      {/* Primary Evidence Score Cards (Section 13) */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
        {/* 1. Computational Risk Signal */}
        <div className="p-4 bg-white border border-slate-200 rounded-lg shadow-2xs">
          <span className="text-[10px] font-mono text-slate-400 uppercase block font-semibold">
            Computational Risk Signal
          </span>
          <div className="text-lg font-extrabold font-mono text-amber-700 mt-1">
            {analysis.consensusRiskSignal}
          </div>
          <span className="text-[10px] text-slate-500 block mt-1">Multi-model voting</span>
        </div>

        {/* 2. Model Agreement */}
        <div className="p-4 bg-white border border-slate-200 rounded-lg shadow-2xs">
          <span className="text-[10px] font-mono text-slate-400 uppercase block font-semibold">
            Model Agreement
          </span>
          <div className="text-lg font-extrabold font-mono text-teal-700 mt-1">
            {analysis.modelAgreement.split('(')[1]?.replace(')', '') || '75%'}
          </div>
          <span className="text-[10px] text-slate-500 block mt-1">3 of 4 classifiers</span>
        </div>

        {/* 3. Evidence Strength */}
        <div className="p-4 bg-white border border-slate-200 rounded-lg shadow-2xs">
          <span className="text-[10px] font-mono text-slate-400 uppercase block font-semibold">
            Evidence Strength
          </span>
          <div className="text-lg font-extrabold font-mono text-slate-800 mt-1">
            {analysis.evidenceStrength}
          </div>
          <span className="text-[10px] text-slate-500 block mt-1">Quality weighted</span>
        </div>

        {/* 4. Data Quality */}
        <div className="p-4 bg-white border border-slate-200 rounded-lg shadow-2xs">
          <span className="text-[10px] font-mono text-slate-400 uppercase block font-semibold">
            Data Quality
          </span>
          <div className="text-lg font-extrabold font-mono text-emerald-700 mt-1">
            High
          </div>
          <span className="text-[10px] text-slate-500 block mt-1">Certified extraction</span>
        </div>

        {/* 5. Uncertainty */}
        <div className="p-4 bg-white border border-slate-200 rounded-lg shadow-2xs">
          <span className="text-[10px] font-mono text-slate-400 uppercase block font-semibold">
            Uncertainty
          </span>
          <div className="text-lg font-extrabold font-mono text-amber-600 mt-1">
            {analysis.uncertainty}
          </div>
          <span className="text-[10px] text-slate-500 block mt-1">Missing metabolomics</span>
        </div>

        {/* 6. Applicability Domain */}
        <div className="p-4 bg-white border border-slate-200 rounded-lg shadow-2xs">
          <span className="text-[10px] font-mono text-slate-400 uppercase block font-semibold">
            Applicability Domain
          </span>
          <div className="text-xs font-bold font-mono text-teal-800 mt-1.5 line-clamp-1">
            {analysis.applicabilityDomain}
          </div>
          <span className="text-[10px] text-slate-500 block mt-1">Physicochemical envelope</span>
        </div>
      </div>

      {/* Experimental Recommendation Banner (Section 13) */}
      <div className="p-4 bg-teal-50 border border-teal-200 rounded-lg flex items-start gap-3">
        <FlaskConical className="w-5 h-5 text-teal-700 shrink-0 mt-0.5" />
        <div className="space-y-1">
          <span className="text-xs font-bold text-teal-900 uppercase tracking-wide">
            Experimental Prioritization Recommendation
          </span>
          <p className="text-xs text-teal-950 font-medium">
            &ldquo;Experimental validation should be prioritized to investigate the identified computational signal.&rdquo;
          </p>
          <p className="text-[11px] text-teal-800">
            Specifically: Quantify primary hepatocyte glutathione depletion thresholds and run high-resolution LC-MS to verify whether electrophilic bioactivation intermediates are quenched at physiological dosing.
          </p>
        </div>
      </div>

      {/* Two Column Section: Left Evidence Strength Engine, Right Uncertainty Analysis */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* Section 14: Evidence Strength Engine */}
        <div className="bg-white border border-slate-200 rounded-lg p-5 shadow-2xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <Scale className="w-4 h-4 text-teal-600" />
              <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wide">
                Evidence Strength Engine Evaluation
              </h2>
            </div>
            <span className="px-2.5 py-0.5 rounded text-xs font-mono font-bold bg-amber-100 text-amber-900">
              Level: {analysis.evidenceStrength}
            </span>
          </div>

          <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg text-xs space-y-1">
            <span className="text-[10px] font-mono text-slate-400 uppercase block font-semibold">
              Deterministic Rationale & Scoring Logic
            </span>
            <p className="text-slate-800 leading-relaxed font-medium">
              &ldquo;{analysis.evidenceStrengthReason}&rdquo;
            </p>
          </div>

          <div className="space-y-2 text-xs">
            <span className="text-[10px] font-mono text-slate-400 uppercase block font-semibold">
              Evidence Dimension Checklist
            </span>

            <div className="divide-y divide-slate-100 border border-slate-100 rounded-md">
              <div className="p-2.5 flex items-center justify-between">
                <span className="text-slate-700">Multi-Model Agreement Ratio</span>
                <span className="font-mono font-bold text-teal-700">75% (3 / 4)</span>
              </div>
              <div className="p-2.5 flex items-center justify-between">
                <span className="text-slate-700">Genomics & Proteomics Availability</span>
                <span className="font-mono font-bold text-emerald-700">Available / Certified</span>
              </div>
              <div className="p-2.5 flex items-center justify-between">
                <span className="text-slate-700">Metabolomics Layer Completeness</span>
                <span className="font-mono font-bold text-amber-700">Incomplete (Gap)</span>
              </div>
              <div className="p-2.5 flex items-center justify-between">
                <span className="text-slate-700">Laboratory Wet-Lab Validation</span>
                <span className="font-mono font-bold text-slate-500">Pending Prospective</span>
              </div>
              <div className="p-2.5 flex items-center justify-between">
                <span className="text-slate-700">Applicability Domain Position</span>
                <span className="font-mono font-bold text-teal-700">Within Prototype Domain</span>
              </div>
            </div>
          </div>
        </div>

        {/* Section 15: Uncertainty & Applicability Domain */}
        <div className="bg-white border border-slate-200 rounded-lg p-5 shadow-2xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <Compass className="w-4 h-4 text-amber-600" />
              <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wide">
                Uncertainty Factors & Applicability Domain
              </h2>
            </div>
            <span className="px-2.5 py-0.5 rounded text-xs font-mono font-bold bg-amber-100 text-amber-900">
              Uncertainty: {analysis.uncertainty}
            </span>
          </div>

          <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg text-xs space-y-1">
            <span className="text-[10px] font-mono text-slate-400 uppercase block font-semibold">
              Uncertainty Synthesis
            </span>
            <p className="text-slate-800 leading-relaxed font-medium">
              &ldquo;{analysis.uncertaintyReason}&rdquo;
            </p>
          </div>

          {/* Uncertainty Factor Cards */}
          <div className="space-y-2">
            <span className="text-[10px] font-mono text-slate-400 uppercase block font-semibold">
              Identified Uncertainty Factors ({analysis.uncertaintyFactors.length})
            </span>

            <div className="space-y-2 max-h-64 overflow-y-auto">
              {analysis.uncertaintyFactors.map((uf, idx) => (
                <div key={idx} className="p-2.5 bg-slate-50 border border-slate-100 rounded text-xs space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-900">{uf.factor}</span>
                    <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-amber-100 text-amber-800">
                      {uf.level}
                    </span>
                  </div>
                  <p className="text-slate-600 text-[11px]">{uf.description}</p>
                  <p className="text-slate-500 text-[10px] italic">Impact: {uf.impactOnEvidence}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
