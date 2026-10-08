import React from 'react';
import { 
  Layers, 
  Dna, 
  Microscope, 
  Activity, 
  ShieldCheck, 
  CheckCircle2, 
  XCircle, 
  AlertTriangle, 
  ArrowRight,
  Scale
} from 'lucide-react';
import { BiologicalProfile } from '../types';
import { DemoNoticeBadge } from '../components/common/DemoNoticeBadge';
import { ScientificDisclaimer } from '../components/common/ScientificDisclaimer';

interface Props {
  profile: BiologicalProfile;
}

export const MultiOmicsPage: React.FC<Props> = ({ profile }) => {
  const layers = [
    {
      name: 'Genomics',
      chainStep: 'DNA Sequence & Variant Annotations',
      available: profile.genomics.available,
      quality: profile.genomics.quality,
      version: profile.genomics.datasetVersion,
      source: profile.genomics.source,
      status: profile.genomics.validationStatus,
      summary: profile.genomics.details,
      relevance: 'High',
      consistency: 'High'
    },
    {
      name: 'Transcriptomics',
      chainStep: 'RNA Expression (Illumina NovaSeq TPM)',
      available: profile.transcriptomics.available,
      quality: profile.transcriptomics.quality,
      version: profile.transcriptomics.datasetVersion,
      source: profile.transcriptomics.source,
      status: profile.transcriptomics.validationStatus,
      summary: profile.transcriptomics.details,
      relevance: 'High',
      consistency: 'Moderate'
    },
    {
      name: 'Proteomics',
      chainStep: 'Protein Abundance (Orbitrap Mass Spec)',
      available: profile.proteomics.available,
      quality: profile.proteomics.quality,
      version: profile.proteomics.datasetVersion,
      source: profile.proteomics.source,
      status: profile.proteomics.validationStatus,
      summary: profile.proteomics.details,
      relevance: 'High',
      consistency: 'High'
    },
    {
      name: 'Metabolomics',
      chainStep: 'Metabolite Pools & Clearance Dynamics',
      available: profile.metabolomics.available,
      quality: profile.metabolomics.quality,
      version: profile.metabolomics.datasetVersion,
      source: profile.metabolomics.source,
      status: profile.metabolomics.validationStatus,
      summary: profile.metabolomics.details,
      relevance: 'Moderate',
      consistency: 'Unavailable'
    },
    {
      name: 'Cellular Data',
      chainStep: 'Cell Viability & Phenotypic Assays',
      available: profile.cellular.available,
      quality: profile.cellular.quality,
      version: profile.cellular.datasetVersion,
      source: profile.cellular.source,
      status: profile.cellular.validationStatus,
      summary: profile.cellular.details,
      relevance: 'High',
      consistency: 'Moderate'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-200 gap-3">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
              <Layers className="w-5 h-5 text-teal-600" />
              Multi-Omics Evidence Chain & Integration Matrix
            </h1>
            <DemoNoticeBadge />
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Harmonized evidence layers across central dogma: DNA → RNA → Protein → Metabolite → Cellular Response.
          </p>
        </div>

        <div className="text-xs font-mono bg-slate-100 text-slate-700 px-3 py-1.5 rounded-lg border border-slate-200">
          Profile: <strong className="text-slate-900">{profile.name}</strong> ({profile.system})
        </div>
      </div>

      <ScientificDisclaimer compact />

      {/* Prominent Evidence Warning (Section 11) */}
      <div className="p-4 bg-teal-50 border border-teal-200 rounded-lg text-xs text-teal-950 space-y-2">
        <div className="flex items-center gap-2 font-bold text-teal-900 text-sm">
          <Scale className="w-4 h-4 text-teal-700" />
          <span>Core Evidence Principle: Quality Weighted Over Volume</span>
        </div>
        <p className="leading-relaxed">
          &ldquo;<strong>Never automatically assume that more data means stronger evidence.</strong> Evidence strength must consider data quality, data relevance, completeness, consistency, validation, and model applicability.&rdquo;
        </p>
      </div>

      {/* Evidence Chain Visual Diagram */}
      <div className="bg-slate-900 text-white p-5 rounded-xl space-y-4">
        <div className="flex items-center justify-between text-xs font-mono text-teal-400">
          <span>THE CENTRAL DOGMA EVIDENCE CHAIN</span>
          <span className="text-slate-400">Cross-Omics Data Flow</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
          {layers.map((layer, idx) => (
            <div
              key={layer.name}
              className={`p-3.5 rounded-lg border relative ${
                layer.available
                  ? 'bg-slate-800/90 border-slate-700'
                  : 'bg-slate-950/60 border-slate-800 opacity-60'
              }`}
            >
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-[10px] font-mono text-teal-400 font-bold">0{idx + 1}</span>
                {layer.available ? (
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                ) : (
                  <XCircle className="w-3.5 h-3.5 text-slate-500" />
                )}
              </div>
              <div className="font-bold text-sm text-white">{layer.name}</div>
              <div className="text-[11px] text-slate-400 mt-1 line-clamp-2">{layer.chainStep}</div>
              <div className="mt-3 pt-2 border-t border-slate-700/60 flex items-center justify-between text-[10px] font-mono">
                <span className="text-slate-400">Quality:</span>
                <span className={layer.quality === 'High' ? 'text-emerald-400 font-bold' : layer.quality === 'Moderate' ? 'text-amber-400' : 'text-slate-500'}>
                  {layer.quality}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Multi-Omics Evidence Matrix Table */}
      <div className="bg-white border border-slate-200 rounded-lg shadow-2xs overflow-hidden">
        <div className="p-4 border-b border-slate-100 flex items-center justify-between">
          <div>
            <h2 className="text-sm font-bold text-slate-900">Multi-Omics Evidence Matrix</h2>
            <p className="text-xs text-slate-500">Structured evaluation across all biological dimensions</p>
          </div>
          <span className="text-xs font-mono bg-slate-100 px-2 py-1 rounded text-slate-600">
            4 / 5 Layers Active
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-500 font-mono text-[11px] border-b border-slate-200">
              <tr>
                <th className="py-3 px-4 font-semibold">Evidence Layer</th>
                <th className="py-3 px-4 font-semibold">Available</th>
                <th className="py-3 px-4 font-semibold">Quality Level</th>
                <th className="py-3 px-4 font-semibold">Relevance</th>
                <th className="py-3 px-4 font-semibold">Dataset Version</th>
                <th className="py-3 px-4 font-semibold">Validation Status</th>
                <th className="py-3 px-4 font-semibold">Source & Scope</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {layers.map(l => (
                <tr key={l.name} className="hover:bg-slate-50/70 transition-colors">
                  <td className="py-3 px-4 font-bold text-slate-900 flex items-center gap-2">
                    <span className={`w-2 h-2 rounded-full ${l.available ? 'bg-teal-500' : 'bg-slate-300'}`}></span>
                    {l.name}
                  </td>
                  <td className="py-3 px-4 font-mono font-bold">
                    {l.available ? (
                      <span className="inline-flex items-center gap-1 text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                        <CheckCircle2 className="w-3 h-3 text-emerald-600" /> Yes
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-slate-500 bg-slate-100 px-2 py-0.5 rounded border border-slate-200">
                        <XCircle className="w-3 h-3 text-slate-400" /> No
                      </span>
                    )}
                  </td>
                  <td className="py-3 px-4 font-mono">
                    <span className={`px-2 py-0.5 rounded font-bold ${
                      l.quality === 'High'
                        ? 'bg-emerald-100 text-emerald-800'
                        : l.quality === 'Moderate'
                        ? 'bg-amber-100 text-amber-800'
                        : 'bg-slate-100 text-slate-500'
                    }`}>
                      {l.quality}
                    </span>
                  </td>
                  <td className="py-3 px-4 font-mono">{l.relevance}</td>
                  <td className="py-3 px-4 font-mono text-slate-500">{l.version}</td>
                  <td className="py-3 px-4 text-slate-600">{l.status}</td>
                  <td className="py-3 px-4 text-slate-500 text-[11px] max-w-xs truncate" title={l.source}>
                    {l.source}
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
