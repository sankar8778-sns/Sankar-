import React from 'react';
import { 
  Globe2, 
  AlertTriangle, 
  TrendingUp, 
  Scale, 
  Info, 
  ShieldAlert, 
  BarChart3, 
  CheckCircle2 
} from 'lucide-react';
import { AnalysisRecord } from '../types';
import { DemoNoticeBadge } from '../components/common/DemoNoticeBadge';
import { ScientificDisclaimer } from '../components/common/ScientificDisclaimer';

interface Props {
  analysis: AnalysisRecord;
}

export const CrossSystemPage: React.FC<Props> = ({ analysis }) => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-200 gap-3">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
              <Globe2 className="w-5 h-5 text-teal-600" />
              Cross-Biological-System Comparative Analysis
            </h1>
            <DemoNoticeBadge />
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Evaluating candidate <strong className="text-slate-800">{analysis.drugName}</strong> across divergent mammalian, avian, and plant orthology systems.
          </p>
        </div>

        <div className="text-xs font-mono bg-slate-100 text-slate-700 px-3 py-1.5 rounded-lg border border-slate-200">
          6 Systems Benchmarked
        </div>
      </div>

      <ScientificDisclaimer compact />

      {/* Critical Interpretation Notice (Section 16) */}
      <div className="p-4 bg-teal-50 border-l-4 border-teal-600 rounded-r-lg text-xs text-teal-950 space-y-1">
        <div className="flex items-center gap-2 font-bold text-teal-900 text-sm">
          <ShieldAlert className="w-4 h-4 text-teal-700" />
          <span>Non-Interchangeability Interpretation Mandate</span>
        </div>
        <p className="leading-relaxed">
          &ldquo;<strong>Biological systems should not be treated as interchangeable.</strong> Differences in molecular targets, metabolism, pathways and physiology must be considered when interpreting computational results.&rdquo;
        </p>
      </div>

      {/* Visual Comparison Chart / Radar representation */}
      <div className="bg-slate-900 text-white rounded-xl p-5 shadow-sm space-y-4">
        <div className="flex items-center justify-between text-xs font-mono text-teal-400">
          <span>TARGET ORTHOLOGY & BIOCHEMICAL CONSERVATION SCORES</span>
          <span className="text-slate-400">Human Baseline = 100%</span>
        </div>

        <div className="space-y-3">
          {analysis.crossSystemComparison.map(item => (
            <div key={item.system} className="space-y-1">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-slate-200">{item.system} System</span>
                <span className="font-mono text-teal-300">{item.targetConservationScore}% Conservation</span>
              </div>
              <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all ${
                    item.targetConservationScore > 80
                      ? 'bg-emerald-500'
                      : item.targetConservationScore > 60
                      ? 'bg-teal-500'
                      : 'bg-amber-500'
                  }`}
                  style={{ width: `${item.targetConservationScore}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Comparison Matrix Table */}
      <div className="bg-white border border-slate-200 rounded-lg shadow-2xs overflow-hidden">
        <div className="p-4 border-b border-slate-100 flex items-center justify-between">
          <div>
            <h2 className="text-sm font-bold text-slate-900">Comparative System Matrix</h2>
            <p className="text-xs text-slate-500">Cross-species differences in metabolic clearance, targets, and risk signals</p>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-500 font-mono text-[11px] border-b border-slate-200">
              <tr>
                <th className="py-3 px-4 font-semibold">Biological System</th>
                <th className="py-3 px-4 font-semibold">Computational Risk Signal</th>
                <th className="py-3 px-4 font-semibold">Evidence Strength</th>
                <th className="py-3 px-4 font-semibold">Target Conservation</th>
                <th className="py-3 px-4 font-semibold">Metabolic Divergence & Physiology</th>
                <th className="py-3 px-4 font-semibold">Notes & Vulnerability Benchmarks</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {analysis.crossSystemComparison.map(item => (
                <tr key={item.system} className="hover:bg-slate-50/70 transition-colors">
                  <td className="py-3.5 px-4 font-bold text-slate-900">
                    {item.system}
                  </td>
                  <td className="py-3.5 px-4 font-mono font-bold">
                    <span className={`px-2 py-0.5 rounded text-[11px] ${
                      item.riskSignal === 'High'
                        ? 'bg-amber-100 text-amber-900 border border-amber-300'
                        : item.riskSignal === 'Moderate'
                        ? 'bg-amber-50 text-amber-800 border border-amber-200'
                        : 'bg-teal-50 text-teal-800 border border-teal-200'
                    }`}>
                      {item.riskSignal}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 font-mono text-slate-800 font-semibold">
                    {item.evidenceStrength}
                  </td>
                  <td className="py-3.5 px-4 font-mono font-bold text-teal-800">
                    {item.targetConservationScore}%
                  </td>
                  <td className="py-3.5 px-4 text-slate-700 text-xs max-w-xs">
                    {item.metabolicDivergence}
                  </td>
                  <td className="py-3.5 px-4 text-slate-500 text-xs max-w-xs">
                    {item.notes}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
