import React, { useState } from 'react';
import { 
  Play, 
  Pill, 
  Dna, 
  Atom, 
  Cpu, 
  Scale, 
  FileCheck, 
  ShieldCheck, 
  CheckCircle2, 
  ArrowRight, 
  RefreshCw, 
  Sparkles,
  Layers,
  FileText
} from 'lucide-react';
import { 
  DrugProfile, 
  BiologicalProfile, 
  AnalysisRecord, 
  EvidencePassport, 
  User 
} from '../types';
import { runComputationalAnalysis } from '../services/analysisEngine';
import { CygenVaultStorage } from '../services/storage';
import { DemoNoticeBadge } from '../components/common/DemoNoticeBadge';
import { ScientificDisclaimer } from '../components/common/ScientificDisclaimer';

interface Props {
  drugs: DrugProfile[];
  profiles: BiologicalProfile[];
  currentUser: User;
  onAnalysisCompleted: (analysis: AnalysisRecord, passport: EvidencePassport) => void;
  onViewPassport: (passportId: string) => void;
}

export const AnalysisWizardPage: React.FC<Props> = ({
  drugs,
  profiles,
  currentUser,
  onAnalysisCompleted,
  onViewPassport
}) => {
  const [selectedDrugId, setSelectedDrugId] = useState<string>(drugs[0]?.id || 'DG-001');
  const [selectedProfileId, setSelectedProfileId] = useState<string>(profiles[0]?.id || 'AG-S001');
  const [isExecuting, setIsExecuting] = useState(false);
  const [executionStage, setExecutionStage] = useState<string>('');
  const [completedResult, setCompletedResult] = useState<{
    analysis: AnalysisRecord;
    passport: EvidencePassport;
  } | null>(null);

  const selectedDrug = drugs.find(d => d.id === selectedDrugId) || drugs[0];
  const selectedProfile = profiles.find(p => p.id === selectedProfileId) || profiles[0];

  const stages = [
    'Preparing biological dataset & chemical descriptors...',
    'Generating 32-bit topological molecular features...',
    'Interrogating target & pathway interaction networks...',
    'Loading multi-omics matrix (DNA, RNA, Protein)...',
    'Executing multi-model ensemble (RF, SVM, LR, XGBoost)...',
    'Calculating model agreement & consensus voting...',
    'Evaluating uncertainty factors & applicability envelope...',
    'Determining evidence strength engine score...',
    'Synthesizing canonical payload & sealing SHA-256 hash...',
    'Issuing Evidence Passport & logging audit event...'
  ];

  const handleStartAnalysis = async () => {
    if (!selectedDrug || !selectedProfile) return;
    setIsExecuting(true);
    setCompletedResult(null);

    // Simulate pipeline stages for visual clarity
    for (let i = 0; i < stages.length; i++) {
      setExecutionStage(stages[i]);
      await new Promise(r => setTimeout(r, 220));
    }

    try {
      const { analysis, passport } = await runComputationalAnalysis(
        selectedDrug,
        selectedProfile,
        currentUser
      );

      // Persist in repository
      CygenVaultStorage.saveAnalysis(analysis);
      CygenVaultStorage.savePassport(passport);

      // Also create a final report for it
      const newReport = {
        reportId: `RPT-2026-${Math.floor(1000 + Math.random() * 9000)}`,
        analysisId: analysis.id,
        passportId: passport.passportId,
        title: `CYGEN VAULT Computational Evidence Report: ${analysis.drugName}`,
        drugName: analysis.drugName,
        chemicalFormula: selectedDrug.chemicalFormula,
        biologicalSystem: `${analysis.biologicalSystem} (${selectedProfile.id})`,
        molecularEvidenceStatus: 'Available (Descriptors, Fingerprint, Functional Groups)',
        biologicalEvidenceStatus: `Available (${selectedProfile.genomics.quality} Genomics, ${selectedProfile.transcriptomics.quality} Transcriptomics, ${selectedProfile.proteomics.quality} Proteomics)`,
        targetAnalysisSummary: `Potential interactions identified for ${analysis.targets.map(t => t.targetName).slice(0, 2).join(' and ')}.`,
        pathwayAnalysisSummary: `Potential pathway perturbation identified in ${analysis.pathways[0]?.pathwayName || 'metabolic cascade'}.`,
        aiMlResult: analysis.consensusRiskSignal,
        modelAgreement: analysis.modelAgreement,
        evidenceStrength: analysis.evidenceStrength,
        evidenceStrengthReason: analysis.evidenceStrengthReason,
        uncertainty: analysis.uncertainty,
        uncertaintyReason: analysis.uncertaintyReason,
        applicabilityDomain: analysis.applicabilityDomain,
        experimentalRecommendation: 'Prioritize the computationally identified signal for appropriate experimental investigation.',
        scientificStatement: 'Computational results are decision-support evidence and must be interpreted alongside laboratory, clinical and regulatory validation. This computational research prototype does not claim clinical safety or toxicity.',
        datasetVersion: analysis.datasetVersion,
        modelVersions: analysis.modelVersion,
        sha256Hash: analysis.sha256Hash,
        generatedBy: `${currentUser.name} (${currentUser.role})`,
        generatedAt: analysis.completedAt,
        auditReference: passport.auditRefId
      };
      CygenVaultStorage.saveReport(newReport);

      setCompletedResult({ analysis, passport });
      onAnalysisCompleted(analysis, passport);
    } catch (err) {
      console.error(err);
    } finally {
      setIsExecuting(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-200 gap-3">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-teal-600" />
              Computational Evidence Analysis Wizard
            </h1>
            <DemoNoticeBadge />
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Execute the full 13-stage deterministic evidence pipeline: Drug Candidate → Multi-Omics → Ensemble ML → SHA-256 Passport.
          </p>
        </div>
      </div>

      <ScientificDisclaimer compact />

      {/* Two Column Configuration */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Step 1: Select Drug */}
        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-2xs space-y-3">
          <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
            <Pill className="w-4 h-4 text-teal-600" />
            <h2 className="text-xs font-bold text-slate-900 uppercase tracking-wide">
              Step 1: Select Candidate Compound
            </h2>
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-slate-700 mb-1">
              Registered Compound
            </label>
            <select
              value={selectedDrugId}
              onChange={e => setSelectedDrugId(e.target.value)}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-xs font-mono font-semibold"
            >
              {drugs.map(d => (
                <option key={d.id} value={d.id}>
                  {d.id} - {d.name} ({d.chemicalFormula})
                </option>
              ))}
            </select>
          </div>

          {selectedDrug && (
            <div className="p-3 bg-slate-50 rounded-lg border border-slate-100 text-xs space-y-1 font-mono">
              <div className="text-slate-900 font-bold">{selectedDrug.name}</div>
              <div className="text-slate-500 text-[11px]">
                MW: {selectedDrug.molecularWeight} g/mol | LogP: {selectedDrug.knownProperties.logP} | TPSA: {selectedDrug.knownProperties.tpsa} Å²
              </div>
              <div className="text-slate-400 text-[10px] break-all">
                SMILES: {selectedDrug.smiles}
              </div>
            </div>
          )}
        </div>

        {/* Step 2: Select Biological Profile */}
        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-2xs space-y-3">
          <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
            <Dna className="w-4 h-4 text-blue-600" />
            <h2 className="text-xs font-bold text-slate-900 uppercase tracking-wide">
              Step 2: Select Biological System Profile
            </h2>
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-slate-700 mb-1">
              Biological Model Reference
            </label>
            <select
              value={selectedProfileId}
              onChange={e => setSelectedProfileId(e.target.value)}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-xs font-mono font-semibold"
            >
              {profiles.map(p => (
                <option key={p.id} value={p.id}>
                  {p.id} - {p.name} ({p.system})
                </option>
              ))}
            </select>
          </div>

          {selectedProfile && (
            <div className="p-3 bg-slate-50 rounded-lg border border-slate-100 text-xs space-y-1 font-mono">
              <div className="text-slate-900 font-bold">{selectedProfile.name}</div>
              <div className="text-slate-500 text-[11px]">
                Species: {selectedProfile.system} | Version: {selectedProfile.datasetVersion}
              </div>
              <div className="text-slate-400 text-[10px]">
                Layers: Genomics ({selectedProfile.genomics.quality}), Transcriptomics ({selectedProfile.transcriptomics.quality}), Proteomics ({selectedProfile.proteomics.quality})
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Execution Control Box */}
      <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-2xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h3 className="font-bold text-slate-900 text-sm">
              Ready to Execute Multi-Model Computational Pipeline
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Target Candidate: <strong className="text-slate-800">{selectedDrug?.name}</strong> → Biological Reference: <strong className="text-slate-800">{selectedProfile?.name}</strong>
            </p>
          </div>

          <button
            onClick={handleStartAnalysis}
            disabled={isExecuting}
            className="flex items-center gap-2 px-6 py-3 rounded-lg bg-teal-600 hover:bg-teal-500 disabled:opacity-50 text-white font-extrabold text-xs transition-colors shadow-xs"
          >
            {isExecuting ? (
              <RefreshCw className="w-4 h-4 animate-spin" />
            ) : (
              <Play className="w-4 h-4" />
            )}
            <span>{isExecuting ? 'Running Pipeline...' : 'START COMPUTATIONAL ANALYSIS'}</span>
          </button>
        </div>

        {/* Progress State (Section 28) */}
        {isExecuting && (
          <div className="p-5 bg-slate-900 text-white rounded-xl space-y-3 animate-in fade-in">
            <div className="flex items-center justify-between text-xs font-mono">
              <span className="text-teal-400 font-bold flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-teal-400 animate-ping"></span>
                ACTIVE PIPELINE EXECUTION
              </span>
              <span className="text-slate-400">Deterministic Engine ML-2026.10</span>
            </div>

            <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
              <div className="bg-gradient-to-r from-teal-500 to-emerald-400 h-full rounded-full w-full animate-pulse" />
            </div>

            <div className="text-xs font-mono text-slate-200 bg-slate-800/80 p-3 rounded-lg border border-slate-700">
              &gt; {executionStage}
            </div>
          </div>
        )}

        {/* Completed Results Card */}
        {completedResult && (
          <div className="p-6 bg-emerald-50/60 border-2 border-emerald-500 rounded-xl space-y-4 animate-in zoom-in-95">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-emerald-200">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-emerald-600 text-white flex items-center justify-center">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-extrabold text-slate-900 text-sm">
                    Computational Analysis Completed & Sealed
                  </h3>
                  <p className="text-xs text-slate-600 font-mono mt-0.5">
                    Analysis ID: <strong>{completedResult.analysis.id}</strong> | Passport ID: <strong>{completedResult.passport.passportId}</strong>
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => onViewPassport(completedResult.passport.passportId)}
                  className="px-4 py-2 rounded-lg bg-teal-600 hover:bg-teal-500 text-white font-bold text-xs transition-colors flex items-center gap-1.5 shadow-xs"
                >
                  <FileCheck className="w-4 h-4" />
                  <span>Inspect Evidence Passport</span>
                </button>
              </div>
            </div>

            {/* Quick Summary Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
              <div className="p-3 bg-white rounded-lg border border-emerald-200">
                <span className="text-[10px] uppercase font-mono text-slate-400 block">Consensus Risk Signal</span>
                <span className="font-mono font-bold text-amber-700 text-sm mt-0.5 block">
                  {completedResult.analysis.consensusRiskSignal} Risk Signal
                </span>
              </div>
              <div className="p-3 bg-white rounded-lg border border-emerald-200">
                <span className="text-[10px] uppercase font-mono text-slate-400 block">Model Agreement</span>
                <span className="font-mono font-bold text-teal-800 text-sm mt-0.5 block">
                  {completedResult.analysis.modelAgreement}
                </span>
              </div>
              <div className="p-3 bg-white rounded-lg border border-emerald-200">
                <span className="text-[10px] uppercase font-mono text-slate-400 block">Evidence Strength</span>
                <span className="font-mono font-bold text-slate-800 text-sm mt-0.5 block">
                  {completedResult.analysis.evidenceStrength}
                </span>
              </div>
              <div className="p-3 bg-white rounded-lg border border-emerald-200">
                <span className="text-[10px] uppercase font-mono text-slate-400 block">Uncertainty</span>
                <span className="font-mono font-bold text-amber-600 text-sm mt-0.5 block">
                  {completedResult.analysis.uncertainty}
                </span>
              </div>
            </div>

            {/* SHA-256 seal stamp */}
            <div className="p-3 bg-slate-900 text-white rounded-lg text-xs space-y-1">
              <span className="text-[10px] font-mono uppercase text-teal-400 block font-semibold">
                Cryptographic SHA-256 Seal
              </span>
              <div className="font-mono text-emerald-400 text-[11px] break-all select-all">
                {completedResult.passport.sha256Hash}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
