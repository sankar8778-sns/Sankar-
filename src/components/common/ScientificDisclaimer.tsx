import React from 'react';
import { AlertCircle, ShieldAlert } from 'lucide-react';

interface Props {
  compact?: boolean;
}

export const ScientificDisclaimer: React.FC<Props> = ({ compact = false }) => {
  if (compact) {
    return (
      <div className="flex items-center gap-2 px-3 py-1.5 bg-amber-500/10 border border-amber-500/30 rounded text-xs text-amber-800">
        <AlertCircle className="w-4 h-4 shrink-0 text-amber-600" />
        <span>
          <strong>Scientific Disclaimer:</strong> Computational results are decision-support evidence and must be interpreted alongside laboratory, clinical and regulatory validation.
        </span>
      </div>
    );
  }

  return (
    <div className="bg-amber-500/10 border-l-4 border-amber-500 p-4 rounded-r-md text-sm text-amber-900 shadow-xs">
      <div className="flex items-start gap-3">
        <ShieldAlert className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
        <div className="space-y-1">
          <p className="font-semibold text-amber-900 tracking-wide text-xs uppercase flex items-center gap-2">
            Important Scientific & Regulatory Notice
            <span className="text-[11px] bg-amber-200 text-amber-800 font-normal px-2 py-0.5 rounded">Computational Prototype</span>
          </p>
          <p className="text-xs text-amber-900/90 leading-relaxed">
            This platform is a <strong>computational research prototype</strong>. It does <strong>not</strong> claim that a compound is clinically safe, unsafe, toxic, non-toxic, approved, or suitable/unsuitable for humans. Computational findings represent decision-support signals designed to prioritize prospective experimental investigations and must always be evaluated alongside laboratory and clinical validation.
          </p>
        </div>
      </div>
    </div>
  );
};
