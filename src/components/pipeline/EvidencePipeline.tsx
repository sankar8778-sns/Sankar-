import React from 'react';
import { 
  Pill, 
  Atom, 
  Dna, 
  Crosshair, 
  GitFork, 
  Layers, 
  Cpu, 
  CheckCircle2, 
  AlertTriangle, 
  Scale, 
  FileCheck, 
  ShieldCheck, 
  FlaskConical,
  ArrowRight
} from 'lucide-react';

interface Props {
  activeStep?: string;
  onSelectStep?: (stepId: string) => void;
}

export const EvidencePipeline: React.FC<Props> = ({ activeStep, onSelectStep }) => {
  const steps = [
    { id: 'drug', label: 'Drug Candidate', icon: Pill, navTo: 'drugs', desc: 'SMILES & Formula' },
    { id: 'molecular', label: 'Molecular Evidence', icon: Atom, navTo: 'drugs', desc: 'Physicochemical & FP' },
    { id: 'biological', label: 'Biological Evidence', icon: Dna, navTo: 'biological', desc: 'Organism & Cell Lines' },
    { id: 'targets', label: 'Target Analysis', icon: Crosshair, navTo: 'target-pathway', desc: 'Receptor & Enzyme' },
    { id: 'pathways', label: 'Pathway Analysis', icon: GitFork, navTo: 'target-pathway', desc: 'Signaling Cascade' },
    { id: 'multi-omics', label: 'Multi-Omics', icon: Layers, navTo: 'multi-omics', desc: 'DNA → RNA → Protein' },
    { id: 'aiml', label: 'AI/ML Models', icon: Cpu, navTo: 'ai-ml', desc: 'RF / SVM / LR / XGB' },
    { id: 'consensus', label: 'Consensus', icon: CheckCircle2, navTo: 'risk-evidence', desc: 'Agreement Ratio' },
    { id: 'uncertainty', label: 'Uncertainty', icon: AlertTriangle, navTo: 'risk-evidence', desc: 'Domain & Gaps' },
    { id: 'evidence-strength', label: 'Evidence Strength', icon: Scale, navTo: 'risk-evidence', desc: 'Quality Weighted' },
    { id: 'passport', label: 'Evidence Passport', icon: FileCheck, navTo: 'passport', desc: 'Digital Certificate' },
    { id: 'integrity', label: 'Integrity Verification', icon: ShieldCheck, navTo: 'integrity', desc: 'SHA-256 Seal' },
    { id: 'prioritization', label: 'Experimental Prioritization', icon: FlaskConical, navTo: 'reports', desc: 'Lab Decision Support' }
  ];

  return (
    <div className="bg-white border border-slate-200 rounded-lg p-5 shadow-2xs">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 mb-4 border-b border-slate-100 gap-2">
        <div>
          <h3 className="text-sm font-bold text-slate-900 tracking-tight flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-teal-500"></span>
            CYGEN VAULT Evidence Pipeline
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Traceable computational sequence from molecular candidate to prospective experimental prioritization.
          </p>
        </div>
        <span className="text-[11px] font-mono text-teal-700 bg-teal-50 border border-teal-200 px-2.5 py-1 rounded-md self-start sm:self-auto">
          Deterministic 13-Stage Audit Trail
        </span>
      </div>

      {/* Horizontal / Wrapped Pipeline Flow */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-2.5">
        {steps.map((step, idx) => {
          const Icon = step.icon;
          const isActive = activeStep === step.id;
          return (
            <button
              key={step.id}
              onClick={() => onSelectStep?.(step.navTo)}
              type="button"
              className={`group text-left p-2.5 rounded-lg border transition-all relative cursor-pointer ${
                isActive
                  ? 'bg-teal-50/80 border-teal-500 ring-2 ring-teal-500/20 shadow-xs'
                  : 'bg-slate-50/70 border-slate-200 hover:border-slate-300 hover:bg-white'
              }`}
            >
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-[10px] font-mono text-slate-400 group-hover:text-slate-600 font-semibold">
                  0{idx + 1}
                </span>
                <Icon className={`w-3.5 h-3.5 transition-colors ${
                  isActive ? 'text-teal-600' : 'text-slate-500 group-hover:text-teal-600'
                }`} />
              </div>
              <div className="font-semibold text-xs text-slate-800 line-clamp-1 group-hover:text-teal-700">
                {step.label}
              </div>
              <div className="text-[10px] text-slate-500 line-clamp-1 mt-0.5">
                {step.desc}
              </div>
              {idx < steps.length - 1 && (
                <div className="hidden lg:block absolute -right-3 top-1/2 -translate-y-1/2 z-10 text-slate-300 pointer-events-none">
                  {/* Subtle connector */}
                </div>
              )}
            </button>
          );
        })}
      </div>

      {/* Pipeline Summary Line */}
      <div className="mt-4 pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between text-xs text-slate-500 gap-2">
        <div className="flex items-center gap-1.5 font-mono text-[11px] text-slate-600">
          <span>Drug Candidate</span>
          <ArrowRight className="w-3 h-3 text-slate-400" />
          <span>Mechanistic Multi-Omics</span>
          <ArrowRight className="w-3 h-3 text-slate-400" />
          <span>Consensus & Uncertainty</span>
          <ArrowRight className="w-3 h-3 text-slate-400" />
          <span className="text-teal-700 font-semibold">SHA-256 Evidence Passport</span>
        </div>
        <div className="text-[11px] text-slate-400 italic">
          Click any step to inspect corresponding evidence layer
        </div>
      </div>
    </div>
  );
};
