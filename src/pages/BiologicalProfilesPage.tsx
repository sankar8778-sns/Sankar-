import React, { useState } from 'react';
import { 
  Dna, 
  Layers, 
  Activity, 
  FlaskConical, 
  ChevronRight, 
  CheckCircle2, 
  XCircle, 
  Plus, 
  Filter, 
  ShieldCheck, 
  Sparkles 
} from 'lucide-react';
import { BiologicalProfile, BiologicalSystemType, UserRole } from '../types';
import { DemoNoticeBadge } from '../components/common/DemoNoticeBadge';
import { ScientificDisclaimer } from '../components/common/ScientificDisclaimer';

interface Props {
  profiles: BiologicalProfile[];
  onSaveProfile: (profile: BiologicalProfile) => void;
  userRole: UserRole;
  onSelectForAnalysis: (profile: BiologicalProfile) => void;
}

export const BiologicalProfilesPage: React.FC<Props> = ({
  profiles,
  onSaveProfile,
  userRole,
  onSelectForAnalysis
}) => {
  const [selectedSystem, setSelectedSystem] = useState<string>('All');
  const [activeProfile, setActiveProfile] = useState<BiologicalProfile>(profiles[0] || null);

  const systems: (BiologicalSystemType | 'All')[] = [
    'All',
    'Human',
    'Rat',
    'Dog',
    'Cat',
    'Bird',
    'Plant'
  ];

  const filtered = selectedSystem === 'All' 
    ? profiles 
    : profiles.filter(p => p.system === selectedSystem);

  const qualityBadge = (quality: string) => {
    switch (quality) {
      case 'High':
        return <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-emerald-100 text-emerald-800 border border-emerald-300">High Quality</span>;
      case 'Moderate':
        return <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-amber-100 text-amber-800 border border-amber-300">Moderate Quality</span>;
      case 'Low':
        return <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-red-100 text-red-800 border border-red-300">Low Quality</span>;
      default:
        return <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-slate-100 text-slate-500 border border-slate-200">Unavailable</span>;
    }
  };

  return (
    <div className="space-y-5">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-200 gap-3">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
              <Dna className="w-5 h-5 text-teal-600" />
              Biological System Profiles & Multi-Layer Evidence
            </h1>
            <DemoNoticeBadge />
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Genomics, transcriptomics, proteomics, metabolomics, and cellular baseline models across experimental species.
          </p>
        </div>

        <button
          onClick={() => onSelectForAnalysis(activeProfile)}
          className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-teal-600 hover:bg-teal-500 text-white font-semibold text-xs transition-colors shadow-xs"
        >
          <Sparkles className="w-4 h-4" />
          <span>Use {activeProfile?.name || 'Selected'} in Pipeline</span>
        </button>
      </div>

      <ScientificDisclaimer compact />

      {/* Species Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 border-b border-slate-100 text-xs">
        <Filter className="w-3.5 h-3.5 text-slate-400 shrink-0" />
        <span className="text-[11px] font-semibold text-slate-500 uppercase mr-1">Species Filter:</span>
        {systems.map(s => (
          <button
            key={s}
            onClick={() => setSelectedSystem(s)}
            className={`px-3 py-1 rounded-full text-xs font-medium transition-colors shrink-0 ${
              selectedSystem === s
                ? 'bg-slate-900 text-white'
                : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
            }`}
          >
            {s}
          </button>
        ))}
      </div>

      {/* Main Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Left Profiles List (4 cols) */}
        <div className="lg:col-span-4 space-y-2">
          {filtered.map(profile => {
            const isSelected = activeProfile?.id === profile.id;
            return (
              <div
                key={profile.id}
                onClick={() => setActiveProfile(profile)}
                className={`p-3.5 rounded-lg border transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-teal-50/60 border-teal-500 ring-1 ring-teal-500/20 shadow-xs'
                    : 'bg-white border-slate-200 hover:border-slate-300'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-xs text-slate-900">{profile.name}</span>
                    </div>
                    <div className="text-[11px] font-mono text-slate-500 mt-1 flex items-center gap-2">
                      <span className="bg-slate-100 px-1.5 py-0.2 rounded text-slate-700 font-semibold">{profile.system}</span>
                      <span>•</span>
                      <span>Version {profile.datasetVersion}</span>
                    </div>
                  </div>
                  <span className="text-[10px] font-mono text-teal-800 bg-teal-50 px-1.5 py-0.5 rounded border border-teal-200">
                    {profile.id}
                  </span>
                </div>

                <div className="mt-2 text-[11px] text-slate-600 line-clamp-2">
                  {profile.description}
                </div>

                {/* Layer pills indicator */}
                <div className="mt-2.5 pt-2 border-t border-slate-100 flex items-center gap-2 text-[10px] font-mono">
                  <span className={profile.genomics.available ? 'text-emerald-700' : 'text-slate-400'}>G</span>
                  <span className={profile.transcriptomics.available ? 'text-emerald-700' : 'text-slate-400'}>T</span>
                  <span className={profile.proteomics.available ? 'text-emerald-700' : 'text-slate-400'}>P</span>
                  <span className={profile.metabolomics.available ? 'text-emerald-700' : 'text-slate-400'}>M</span>
                  <span className={profile.cellular.available ? 'text-emerald-700' : 'text-slate-400'}>C</span>
                  <span className="text-slate-400 ml-auto">{profile.source.split(' ')[0]}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Right Details - 5 Omics Layers (8 cols) */}
        <div className="lg:col-span-8 space-y-4">
          {activeProfile && (
            <>
              {/* Profile Header Card */}
              <div className="bg-white border border-slate-200 rounded-lg p-5 shadow-2xs">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-slate-100 gap-2">
                  <div>
                    <div className="flex items-center gap-2">
                      <h2 className="text-lg font-bold text-slate-900">{activeProfile.name}</h2>
                      <span className="text-xs font-mono font-bold bg-slate-100 px-2 py-0.5 rounded text-slate-800">
                        {activeProfile.system}
                      </span>
                    </div>
                    <div className="text-xs text-slate-500 font-mono mt-0.5">
                      Sample ID: <strong className="text-slate-800">{activeProfile.id}</strong> | Version: <strong className="text-slate-800">{activeProfile.datasetVersion}</strong> | Source: <strong className="text-slate-800">{activeProfile.source}</strong>
                    </div>
                  </div>
                  <span className="text-xs font-semibold px-2.5 py-1 rounded bg-teal-50 text-teal-800 border border-teal-200 self-start sm:self-auto">
                    {activeProfile.validationStatus}
                  </span>
                </div>

                <p className="text-xs text-slate-600 mt-3 leading-relaxed">
                  {activeProfile.description}
                </p>
              </div>

              {/* Layer 1: Genomics */}
              <div className="bg-white border border-slate-200 rounded-lg p-4 shadow-2xs text-xs space-y-2">
                <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-teal-500"></span>
                    <h3 className="font-bold text-slate-900 uppercase tracking-wide">1. Genomics Layer</h3>
                  </div>
                  <div className="flex items-center gap-2">
                    {qualityBadge(activeProfile.genomics.quality)}
                    <span className="text-[10px] font-mono text-slate-400">Ver: {activeProfile.genomics.datasetVersion}</span>
                  </div>
                </div>

                <p className="text-slate-600 text-xs">{activeProfile.genomics.details}</p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
                  <div className="p-2.5 rounded bg-slate-50 border border-slate-100">
                    <span className="text-[10px] font-mono text-slate-400 uppercase block mb-1">Key Genes Tracked</span>
                    <div className="flex flex-wrap gap-1">
                      {activeProfile.genomics.geneInfo.map((g, i) => (
                        <span key={i} className="px-1.5 py-0.5 rounded text-[10px] font-mono bg-white border border-slate-200 text-slate-700">
                          {g}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="p-2.5 rounded bg-slate-50 border border-slate-100">
                    <span className="text-[10px] font-mono text-slate-400 uppercase block mb-1">Genomic Variants & Alleles</span>
                    <ul className="text-[11px] text-slate-700 space-y-1">
                      {activeProfile.genomics.variants.map((v, i) => (
                        <li key={i} className="flex items-center gap-1.5">
                          <span className="w-1 h-1 rounded-full bg-teal-500"></span>
                          <span>{v}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="p-2 bg-slate-900 rounded font-mono text-[10px] text-teal-400 overflow-x-auto">
                  <span className="text-slate-500 block mb-0.5">FASTA Sequence Excerpt (ADME Reference):</span>
                  {activeProfile.genomics.dnaSequenceSample}
                </div>
              </div>

              {/* Layer 2: Transcriptomics */}
              <div className="bg-white border border-slate-200 rounded-lg p-4 shadow-2xs text-xs space-y-2">
                <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                    <h3 className="font-bold text-slate-900 uppercase tracking-wide">2. Transcriptomics Layer</h3>
                  </div>
                  <div className="flex items-center gap-2">
                    {qualityBadge(activeProfile.transcriptomics.quality)}
                    <span className="text-[10px] font-mono text-slate-400">Ver: {activeProfile.transcriptomics.datasetVersion}</span>
                  </div>
                </div>

                <p className="text-slate-600 text-xs">{activeProfile.transcriptomics.details}</p>

                {activeProfile.transcriptomics.available ? (
                  <div className="p-2.5 bg-slate-50 rounded border border-slate-100 space-y-1">
                    <div className="text-[11px] font-mono text-slate-800">
                      <strong>Expression Metrics:</strong> {activeProfile.transcriptomics.rnaExpressionMetrics}
                    </div>
                    <div className="text-[11px] font-mono text-slate-700">
                      <strong>Differential Genes:</strong> {activeProfile.transcriptomics.differentialGenes.join(' | ')}
                    </div>
                  </div>
                ) : (
                  <div className="p-3 bg-amber-50 text-amber-800 border border-amber-200 rounded text-xs">
                    Notice: Transcriptomics data is currently not available for this profile in prototype dataset version {activeProfile.datasetVersion}.
                  </div>
                )}
              </div>

              {/* Layer 3: Proteomics */}
              <div className="bg-white border border-slate-200 rounded-lg p-4 shadow-2xs text-xs space-y-2">
                <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-purple-500"></span>
                    <h3 className="font-bold text-slate-900 uppercase tracking-wide">3. Proteomics Layer</h3>
                  </div>
                  <div className="flex items-center gap-2">
                    {qualityBadge(activeProfile.proteomics.quality)}
                    <span className="text-[10px] font-mono text-slate-400">Ver: {activeProfile.proteomics.datasetVersion}</span>
                  </div>
                </div>

                <p className="text-slate-600 text-xs">{activeProfile.proteomics.details}</p>

                {activeProfile.proteomics.available && (
                  <div className="p-2.5 bg-slate-50 rounded border border-slate-100 text-xs space-y-1">
                    <span className="text-[10px] font-mono uppercase text-slate-400 block">Identified Proteomic Target Pool</span>
                    <div className="flex flex-wrap gap-1.5">
                      {activeProfile.proteomics.identifiedTargets.map((t, idx) => (
                        <span key={idx} className="px-2 py-0.5 rounded text-[11px] font-mono bg-purple-50 text-purple-900 border border-purple-200">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Layer 4: Metabolomics */}
              <div className="bg-white border border-slate-200 rounded-lg p-4 shadow-2xs text-xs space-y-2">
                <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-amber-500"></span>
                    <h3 className="font-bold text-slate-900 uppercase tracking-wide">4. Metabolomics Layer</h3>
                  </div>
                  <div className="flex items-center gap-2">
                    {qualityBadge(activeProfile.metabolomics.quality)}
                    <span className="text-[10px] font-mono text-slate-400">Ver: {activeProfile.metabolomics.datasetVersion}</span>
                  </div>
                </div>

                <p className="text-slate-600 text-xs">{activeProfile.metabolomics.details}</p>

                {activeProfile.metabolomics.available ? (
                  <div className="p-2.5 bg-slate-50 rounded border border-slate-100">
                    <span className="text-[10px] font-mono text-slate-400 uppercase block mb-1">Key Metabolites</span>
                    <div className="flex flex-wrap gap-1">
                      {activeProfile.metabolomics.keyMetabolites.map((m, idx) => (
                        <span key={idx} className="px-2 py-0.5 rounded text-[11px] font-mono bg-amber-50 text-amber-900 border border-amber-200">
                          {m}
                        </span>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="p-2.5 bg-slate-50 border border-slate-200 rounded text-xs text-slate-500 flex items-center gap-2">
                    <XCircle className="w-4 h-4 text-slate-400" />
                    <span>Layer unavailable in current version. Contributes to model uncertainty evaluation.</span>
                  </div>
                )}
              </div>

              {/* Layer 5: Cellular Information */}
              <div className="bg-white border border-slate-200 rounded-lg p-4 shadow-2xs text-xs space-y-2">
                <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                    <h3 className="font-bold text-slate-900 uppercase tracking-wide">5. Cellular Response Information</h3>
                  </div>
                  <div className="flex items-center gap-2">
                    {qualityBadge(activeProfile.cellular.quality)}
                    <span className="text-[10px] font-mono text-slate-400">Ver: {activeProfile.cellular.datasetVersion}</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-2 pt-1">
                  <div className="p-2 bg-slate-50 rounded border border-slate-100">
                    <span className="text-[10px] text-slate-400 font-mono block">Cell Line / Type</span>
                    <span className="font-semibold text-slate-800">{activeProfile.cellular.cellType}</span>
                  </div>
                  <div className="p-2 bg-slate-50 rounded border border-slate-100">
                    <span className="text-[10px] text-slate-400 font-mono block">Cell Viability</span>
                    <span className="font-semibold text-slate-800">{activeProfile.cellular.cellViability}</span>
                  </div>
                  <div className="p-2 bg-slate-50 rounded border border-slate-100">
                    <span className="text-[10px] text-slate-400 font-mono block">Proliferation Rate</span>
                    <span className="font-semibold text-slate-800">{activeProfile.cellular.cellProliferation}</span>
                  </div>
                  <div className="p-2 bg-slate-50 rounded border border-slate-100">
                    <span className="text-[10px] text-slate-400 font-mono block">Apoptotic Rate</span>
                    <span className="font-semibold text-slate-800">{activeProfile.cellular.apoptosis}</span>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
