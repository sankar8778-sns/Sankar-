import React from 'react';
import { 
  Cpu, 
  TrendingUp, 
  AlertTriangle, 
  ShieldAlert, 
  BarChart3, 
  CheckCircle2, 
  Info, 
  Layers, 
  Sparkles 
} from 'lucide-react';
import { AnalysisRecord } from '../types';
import { DemoNoticeBadge } from '../components/common/DemoNoticeBadge';
import { ScientificDisclaimer } from '../components/common/ScientificDisclaimer';

interface Props {
  analysis: AnalysisRecord;
}

export const AiMlAnalysisPage: React.FC<Props> = ({ analysis }) => {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-200 gap-3">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
              <Cpu className="w-5 h-5 text-teal-600" />
              Multi-Model AI/ML Ensemble Analysis
            </h1>
            <DemoNoticeBadge />
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Ensemble classification evaluating candidate <strong className="text-slate-800">{analysis.drugName}</strong> ({analysis.drugId}) across 4 distinct machine learning architectures.
          </p>
        </div>

        <div className="text-xs font-mono bg-slate-100 text-slate-700 px-3 py-1.5 rounded-lg border border-slate-200">
          Ensemble Model: <strong>ML-2026.10</strong>
        </div>
      </div>

      <ScientificDisclaimer compact />

      {/* Critical Model Consensus Warning (Section 12) */}
      <div className="p-4 bg-amber-500/10 border-l-4 border-amber-500 rounded-r-lg text-xs text-amber-950 space-y-1 shadow-2xs">
        <div className="flex items-center gap-2 font-bold text-amber-900 text-sm">
          <ShieldAlert className="w-4 h-4 text-amber-600" />
          <span>Crucial Model Consensus Notice</span>
        </div>
        <p className="leading-relaxed">
          &ldquo;<strong>Model consensus indicates agreement among computational models. It does not establish biological toxicity or safety.</strong> Computational results are decision-support hypotheses requiring prospective bench validation.&rdquo;
        </p>
      </div>

      {/* Model Consensus & Agreement KPI Banner */}
      <div className="bg-gradient-to-r from-slate-900 to-slate-800 text-white rounded-xl p-5 shadow-sm">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
          <div>
            <span className="text-[10px] font-mono text-teal-400 uppercase tracking-wider block">
              Ensemble Model Agreement
            </span>
            <div className="text-3xl font-extrabold font-mono text-white mt-1">
              {analysis.modelAgreement}
            </div>
            <span className="text-[11px] text-slate-400">3 of 4 classifiers in accord</span>
          </div>

          <div>
            <span className="text-[10px] font-mono text-teal-400 uppercase tracking-wider block">
              Consensus Risk Signal
            </span>
            <div className="text-2xl font-bold font-mono text-amber-400 mt-1">
              {analysis.consensusRiskSignal}
            </div>
            <span className="text-[11px] text-slate-400">Aggregated voting decision</span>
          </div>

          <div>
            <span className="text-[10px] font-mono text-teal-400 uppercase tracking-wider block">
              Model Ensemble Suite
            </span>
            <div className="text-sm font-semibold text-slate-200 mt-1 font-mono">
              RF / SVM / LR / XGBoost
            </div>
            <span className="text-[11px] text-slate-400">Deterministic scikit/XGB mock engine</span>
          </div>

          <div className="p-3 bg-slate-800/90 rounded-lg border border-slate-700 text-xs text-slate-300">
            <span className="text-[10px] font-mono text-slate-400 uppercase block mb-1">Architecture Extensibility</span>
            Engine interface maps directly to future Python/scikit-learn REST microservices.
          </div>
        </div>
      </div>

      {/* 4 Models Breakdown Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {analysis.modelPredictions.map(pred => {
          const isHigh = pred.riskSignal === 'High';
          return (
            <div
              key={pred.modelName}
              className="bg-white border border-slate-200 rounded-lg p-5 shadow-2xs space-y-4"
            >
              <div className="flex items-start justify-between pb-3 border-b border-slate-100">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold text-sm text-slate-900">{pred.modelName}</h3>
                    <span className="text-[10px] font-mono text-slate-400 bg-slate-100 px-1.5 py-0.2 rounded">
                      {pred.runtimeMs}ms
                    </span>
                  </div>
                  <span className="text-[11px] text-slate-500 font-mono">
                    Softmax / Sigmoid Probability: <strong>{(pred.probabilityScore * 100).toFixed(0)}%</strong>
                  </span>
                </div>

                <span className={`px-2.5 py-1 rounded text-xs font-mono font-bold ${
                  isHigh
                    ? 'bg-amber-100 text-amber-900 border border-amber-300'
                    : 'bg-teal-50 text-teal-800 border border-teal-200'
                }`}>
                  {pred.riskSignal} Risk Signal
                </span>
              </div>

              {/* Probability Bar */}
              <div>
                <div className="flex justify-between text-[11px] font-mono text-slate-500 mb-1">
                  <span>Computational Signal Strength</span>
                  <span>{(pred.probabilityScore * 100).toFixed(1)}%</span>
                </div>
                <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all ${
                      isHigh ? 'bg-amber-500' : 'bg-teal-500'
                    }`}
                    style={{ width: `${pred.probabilityScore * 100}%` }}
                  />
                </div>
              </div>

              {/* Feature Weight Contributions */}
              <div className="space-y-2 pt-1">
                <span className="text-[10px] font-mono text-slate-400 uppercase block font-semibold">
                  Top Influencing Feature Weights (SHAP / Coeff Proxy)
                </span>
                <div className="space-y-1.5 text-xs">
                  {pred.featureWeights.map((fw, idx) => (
                    <div key={idx} className="flex items-center justify-between">
                      <span className="text-slate-700 text-[11px] truncate max-w-[240px]" title={fw.feature}>
                        {fw.feature}
                      </span>
                      <div className="flex items-center gap-2 font-mono text-[10px] text-slate-500">
                        <div className="w-16 bg-slate-100 h-1.5 rounded-full overflow-hidden">
                          <div
                            className="bg-slate-700 h-full rounded-full"
                            style={{ width: `${fw.weight * 100}%` }}
                          />
                        </div>
                        <span>{(fw.weight * 100).toFixed(0)}%</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
