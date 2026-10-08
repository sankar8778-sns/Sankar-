import React, { useState } from 'react';
import { 
  Crosshair, 
  GitFork, 
  Layers, 
  ArrowRight, 
  AlertCircle, 
  Sparkles, 
  ShieldAlert, 
  CheckCircle2, 
  Info 
} from 'lucide-react';
import { AnalysisRecord, TargetCategory, TargetItem, PathwayItem } from '../types';
import { DemoNoticeBadge } from '../components/common/DemoNoticeBadge';
import { ScientificDisclaimer } from '../components/common/ScientificDisclaimer';

interface Props {
  currentAnalysis: AnalysisRecord;
}

export const TargetPathwayPage: React.FC<Props> = ({ currentAnalysis }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedPathway, setSelectedPathway] = useState<PathwayItem>(currentAnalysis.pathways[0] || null);

  const categories: (TargetCategory | 'All')[] = [
    'All',
    'Receptor',
    'Enzyme',
    'Transporter',
    'Ion Channel',
    'Regulatory Protein'
  ];

  const filteredTargets = selectedCategory === 'All'
    ? currentAnalysis.targets
    : currentAnalysis.targets.filter(t => t.category === selectedCategory);

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-200 gap-3">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
              <Crosshair className="w-5 h-5 text-teal-600" />
              Target Identification & Biological Pathway Analysis
            </h1>
            <DemoNoticeBadge />
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Analyzing candidate: <strong className="text-slate-800">{currentAnalysis.drugName}</strong> ({currentAnalysis.drugId}) against <strong className="text-slate-800">{currentAnalysis.biologicalSystem}</strong> reference profile.
          </p>
        </div>

        <div className="text-xs font-mono bg-slate-100 text-slate-700 px-3 py-1.5 rounded-lg border border-slate-200 self-start sm:self-auto">
          Analysis ID: <strong>{currentAnalysis.id}</strong>
        </div>
      </div>

      <ScientificDisclaimer compact />

      {/* Target Notice Warning (Section 9) */}
      <div className="p-3 bg-amber-50 border border-amber-200 rounded-lg text-xs text-amber-900 flex items-start gap-2.5">
        <ShieldAlert className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
        <div>
          <span className="font-bold">Computational Target Classification Notice: </span>
          &ldquo;Target predictions are computational interaction hypotheses derived from molecular docking and sequence orthology models. Do not represent computational predictions as experimentally confirmed interactions.&rdquo;
        </div>
      </div>

      {/* Section 1: Target Identification */}
      <div className="bg-white border border-slate-200 rounded-lg p-5 shadow-2xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-slate-100 gap-2">
          <div>
            <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wide flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-teal-500"></span>
              1. Potential Target Identification by Functional Category
            </h2>
            <p className="text-xs text-slate-500">
              Categorized potential interactions: Receptors, Enzymes, Transporters, Ion Channels, and Regulatory Proteins
            </p>
          </div>

          {/* Category Filter */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
            {categories.map(c => (
              <button
                key={c}
                onClick={() => setSelectedCategory(c)}
                className={`px-2.5 py-1 rounded text-xs font-medium transition-colors whitespace-nowrap ${
                  selectedCategory === c
                    ? 'bg-slate-900 text-white font-bold'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        {/* Target Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
          {filteredTargets.map(target => (
            <div
              key={target.id}
              className="p-4 rounded-lg border border-slate-200 bg-slate-50/50 hover:bg-white hover:border-slate-300 transition-all space-y-3"
            >
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-teal-100 text-teal-800 font-bold border border-teal-200">
                    {target.category}
                  </span>
                  <h3 className="font-bold text-sm text-slate-900 mt-1.5">{target.targetName}</h3>
                </div>
                <div className="text-right">
                  <span className="text-[10px] font-mono text-slate-400 block">Docking / Score</span>
                  <span className="text-base font-bold font-mono text-teal-700">{target.interactionScore}</span>
                </div>
              </div>

              <p className="text-xs text-slate-600 leading-relaxed bg-white p-2.5 rounded border border-slate-100">
                {target.mechanismSummary}
              </p>

              <div className="grid grid-cols-3 gap-2 text-[11px] pt-1 border-t border-slate-100 font-mono">
                <div>
                  <span className="text-[10px] text-slate-400 uppercase block">Evidence</span>
                  <span className="font-semibold text-slate-800">{target.interactionEvidence}</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 uppercase block">Status</span>
                  <span className="text-amber-700 font-semibold bg-amber-50 px-1 rounded">{target.evidenceStatus}</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 uppercase block">Confidence</span>
                  <span className="font-semibold text-teal-700">{target.confidenceLevel}%</span>
                </div>
              </div>

              <div className="text-[10px] text-slate-400 font-mono">
                Data Source: {target.evidenceSource}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Section 2: Pathway Analysis & Biological Mechanism Visualization */}
      <div className="bg-white border border-slate-200 rounded-lg p-5 shadow-2xs space-y-5">
        <div className="pb-3 border-b border-slate-100">
          <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wide flex items-center gap-2">
            <GitFork className="w-4 h-4 text-teal-600" />
            2. Biological Mechanism Pathway Visualization
          </h2>
          <p className="text-xs text-slate-500">
            Mechanism progression: Drug Candidate → Target Protein → Signalling Pathway → Molecular Response → Cellular Response → Potential Risk-Related Signal
          </p>
        </div>

        {/* Pathway Cascade Flow Diagram */}
        <div className="p-4 bg-slate-900 text-white rounded-xl space-y-4">
          <div className="text-[11px] font-mono text-teal-400 uppercase tracking-wider flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-teal-400 animate-pulse"></span>
            Mechanism Progression Chain (Active Hypothesis: {selectedPathway?.pathwayName})
          </div>

          <div className="grid grid-cols-1 md:grid-cols-6 gap-2">
            {/* Step 1 */}
            <div className="p-3 rounded-lg bg-slate-800/80 border border-slate-700 text-center space-y-1">
              <span className="text-[9px] font-mono text-slate-400 uppercase block">Step 1</span>
              <div className="text-xs font-bold text-white">Drug Candidate</div>
              <div className="text-[11px] font-mono text-teal-300">{currentAnalysis.drugName}</div>
            </div>

            {/* Step 2 */}
            <div className="p-3 rounded-lg bg-slate-800/80 border border-slate-700 text-center space-y-1">
              <span className="text-[9px] font-mono text-slate-400 uppercase block">Step 2</span>
              <div className="text-xs font-bold text-white">Target Protein</div>
              <div className="text-[11px] font-mono text-blue-300">{selectedPathway?.targetMolecule.split('/')[0]}</div>
            </div>

            {/* Step 3 */}
            <div className="p-3 rounded-lg bg-slate-800/80 border border-slate-700 text-center space-y-1">
              <span className="text-[9px] font-mono text-slate-400 uppercase block">Step 3</span>
              <div className="text-xs font-bold text-white">Signalling Pathway</div>
              <div className="text-[11px] font-mono text-indigo-300">Phase I / II Axis</div>
            </div>

            {/* Step 4 */}
            <div className="p-3 rounded-lg bg-slate-800/80 border border-slate-700 text-center space-y-1">
              <span className="text-[9px] font-mono text-slate-400 uppercase block">Step 4</span>
              <div className="text-xs font-bold text-white">Molecular Response</div>
              <div className="text-[11px] font-mono text-purple-300">ARE Transcript Induction</div>
            </div>

            {/* Step 5 */}
            <div className="p-3 rounded-lg bg-slate-800/80 border border-slate-700 text-center space-y-1">
              <span className="text-[9px] font-mono text-slate-400 uppercase block">Step 5</span>
              <div className="text-xs font-bold text-white">Cellular Response</div>
              <div className="text-[11px] font-mono text-amber-300">Redox Equilibrium</div>
            </div>

            {/* Step 6 */}
            <div className="p-3 rounded-lg bg-slate-800/80 border border-slate-700 text-center space-y-1">
              <span className="text-[9px] font-mono text-slate-400 uppercase block">Step 6</span>
              <div className="text-xs font-bold text-white">Risk Signal</div>
              <div className="text-[11px] font-mono text-amber-400 font-bold">{currentAnalysis.consensusRiskSignal} Signal</div>
            </div>
          </div>
        </div>

        {/* Detailed Pathway Cards */}
        <div className="space-y-3">
          <div className="text-xs font-bold text-slate-800 uppercase tracking-wide">
            Tracked Biological Pathways ({currentAnalysis.pathways.length})
          </div>

          {currentAnalysis.pathways.map(pw => (
            <div
              key={pw.id}
              onClick={() => setSelectedPathway(pw)}
              className={`p-4 rounded-lg border transition-all cursor-pointer ${
                selectedPathway?.id === pw.id
                  ? 'bg-teal-50/40 border-teal-500 shadow-xs ring-1 ring-teal-500/20'
                  : 'bg-white border-slate-200 hover:border-slate-300'
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-2 border-b border-slate-100 gap-2">
                <div className="flex items-center gap-2">
                  <h3 className="font-bold text-sm text-slate-900">{pw.pathwayName}</h3>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-100 text-slate-700">
                    Target: {pw.targetMolecule}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono font-semibold px-2 py-0.5 rounded bg-teal-100 text-teal-800">
                    Evidence: {pw.evidenceStrength}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 py-3 text-xs">
                <div>
                  <span className="text-[10px] font-mono text-slate-400 uppercase block">Biological Function</span>
                  <p className="text-slate-700 mt-0.5 leading-relaxed">{pw.biologicalFunction}</p>
                </div>
                <div>
                  <span className="text-[10px] font-mono text-slate-400 uppercase block">Cellular Process</span>
                  <p className="text-slate-700 mt-0.5 leading-relaxed">{pw.cellularProcess}</p>
                </div>
              </div>

              <div className="p-3 bg-slate-50 rounded border border-slate-100 text-xs flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <span className="text-[10px] font-mono text-slate-500 uppercase block">Interpretation</span>
                  <p className="text-slate-800 font-medium">{pw.interpretation}</p>
                </div>
                <div className="text-[11px] font-mono text-slate-500 shrink-0">
                  Genes: {pw.associatedGenes.join(', ')}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
