import React, { useState } from 'react';
import { 
  Pill, 
  Search, 
  Plus, 
  Edit3, 
  Archive, 
  Eye, 
  SlidersHorizontal, 
  Atom, 
  Sparkles, 
  ExternalLink, 
  Check, 
  Layers
} from 'lucide-react';
import { DrugProfile, UserRole } from '../types';
import { DemoNoticeBadge } from '../components/common/DemoNoticeBadge';
import { ScientificDisclaimer } from '../components/common/ScientificDisclaimer';
import { ChemicalStructureView } from '../components/molecular/ChemicalStructureView';
import { Modal } from '../components/common/Modal';

interface Props {
  drugs: DrugProfile[];
  onSaveDrug: (drug: DrugProfile) => void;
  onArchiveDrug: (id: string) => void;
  userRole: UserRole;
  onRunAnalysisWithDrug: (drug: DrugProfile) => void;
}

export const DrugRegistryPage: React.FC<Props> = ({
  drugs,
  onSaveDrug,
  onArchiveDrug,
  userRole,
  onRunAnalysisWithDrug
}) => {
  const [search, setSearch] = useState('');
  const [selectedDrug, setSelectedDrug] = useState<DrugProfile | null>(drugs[0] || null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isNew, setIsNew] = useState(false);
  const [similarityTarget, setSimilarityTarget] = useState<string>('DG-001');

  // Form state for creating/editing
  const [form, setForm] = useState<Partial<DrugProfile>>({
    id: '',
    name: '',
    chemicalFormula: '',
    molecularWeight: 150,
    smiles: '',
    inchi: '',
    casNumber: '',
    knownTargets: [],
    knownProperties: {
      logP: 1.0,
      tpsa: 50,
      hbd: 2,
      hba: 3,
      rotatableBonds: 2,
      heavyAtomCount: 12,
      aromaticRings: 1
    },
    knownToxicityInfo: '',
    sourceDatabase: 'Public Research Dataset (Synthetic Demonstration)',
    functionalGroups: ['Aromatic Ring', 'Amide'],
    fingerprintBits: Array(32).fill(0).map(() => Math.round(Math.random()))
  });

  const canEdit = userRole === 'Administrator' || userRole === 'Researcher';

  const filteredDrugs = drugs.filter(d => 
    !d.isArchived && (
      d.name.toLowerCase().includes(search.toLowerCase()) ||
      d.id.toLowerCase().includes(search.toLowerCase()) ||
      d.chemicalFormula.toLowerCase().includes(search.toLowerCase()) ||
      d.casNumber.toLowerCase().includes(search.toLowerCase())
    )
  );

  const handleOpenNew = () => {
    const newId = `DG-00${drugs.length + 1}`;
    setForm({
      id: newId,
      name: `Demo Candidate ${String.fromCharCode(65 + drugs.length)}`,
      chemicalFormula: 'C10H12N2O',
      molecularWeight: 176.22,
      smiles: 'CC(=O)Nc1ccc(C)cc1',
      inchi: 'InChI=1S/C10H12N2O/...',
      casNumber: `100-${Math.floor(100 + Math.random() * 900)}-${Math.floor(1 + Math.random() * 9)}`,
      knownTargets: ['COX-2 (PTGS2)', 'Albumin Binding (HSA)'],
      knownProperties: {
        logP: 1.45,
        tpsa: 38.2,
        hbd: 1,
        hba: 2,
        rotatableBonds: 2,
        heavyAtomCount: 13,
        aromaticRings: 1
      },
      knownToxicityInfo: 'Computational screen indicates low to moderate reactive metabolite signal; experimental validation required.',
      sourceDatabase: 'Public Research Dataset (Synthetic Demonstration)',
      functionalGroups: ['Aromatic Amide', 'Methyl Group'],
      fingerprintBits: Array(32).fill(0).map(() => Math.round(Math.random()))
    });
    setIsNew(true);
    setIsEditModalOpen(true);
  };

  const handleOpenEdit = (drug: DrugProfile) => {
    setForm({ ...drug });
    setIsNew(false);
    setIsEditModalOpen(true);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.chemicalFormula) return;

    const drugToSave: DrugProfile = {
      id: form.id || `DG-00${drugs.length + 1}`,
      name: form.name,
      chemicalFormula: form.chemicalFormula,
      molecularWeight: Number(form.molecularWeight) || 150,
      smiles: form.smiles || 'C',
      inchi: form.inchi || 'InChI=1S/...',
      casNumber: form.casNumber || 'N/A',
      knownTargets: typeof form.knownTargets === 'string' 
        ? (form.knownTargets as string).split(',').map(s => s.trim()) 
        : (form.knownTargets || ['Non-specific']),
      knownProperties: form.knownProperties || {
        logP: 1.0,
        tpsa: 50,
        hbd: 2,
        hba: 3,
        rotatableBonds: 2,
        heavyAtomCount: 12,
        aromaticRings: 1
      },
      knownToxicityInfo: form.knownToxicityInfo || 'No preliminary risk signal registered.',
      sourceDatabase: form.sourceDatabase || 'Public Research Dataset',
      functionalGroups: typeof form.functionalGroups === 'string'
        ? (form.functionalGroups as string).split(',').map(s => s.trim())
        : (form.functionalGroups || ['Aromatic']),
      fingerprintBits: form.fingerprintBits || Array(32).fill(0).map(() => Math.round(Math.random())),
      createdAt: form.createdAt || new Date().toISOString().replace('T', ' ').substring(0, 19) + ' UTC',
      updatedAt: new Date().toISOString().replace('T', ' ').substring(0, 19) + ' UTC'
    };

    onSaveDrug(drugToSave);
    setSelectedDrug(drugToSave);
    setIsEditModalOpen(false);
  };

  // Compute simulated Tanimoto molecular similarity between 32-bit fingerprints
  const calculateSimulatedSimilarity = (fp1: number[], fp2: number[]) => {
    if (!fp1 || !fp2 || fp1.length !== fp2.length) return 0.5;
    let both = 0;
    let either = 0;
    for (let i = 0; i < fp1.length; i++) {
      if (fp1[i] === 1 && fp2[i] === 1) both++;
      if (fp1[i] === 1 || fp2[i] === 1) either++;
    }
    return either === 0 ? 1 : +(both / either).toFixed(2);
  };

  return (
    <div className="space-y-5">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-200 gap-3">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
              <Pill className="w-5 h-5 text-teal-600" />
              Drug Registry & Molecular Intelligence
            </h1>
            <DemoNoticeBadge />
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Standardized chemical inventory, simulated molecular fingerprints, and known pharmacophore profiles.
          </p>
        </div>

        <div className="flex items-center gap-2">
          {canEdit && (
            <button
              onClick={handleOpenNew}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-teal-600 hover:bg-teal-500 text-white font-semibold text-xs transition-colors shadow-xs"
            >
              <Plus className="w-4 h-4" />
              <span>Register Compound</span>
            </button>
          )}
        </div>
      </div>

      <ScientificDisclaimer compact />

      {/* Main Grid: Left List, Right Detail */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Drug List (5 cols) */}
        <div className="lg:col-span-5 space-y-3">
          <div className="bg-white border border-slate-200 rounded-lg p-3 shadow-2xs">
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
              <input
                type="text"
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Search by name, ID, formula, CAS..."
                className="w-full pl-9 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-md focus:bg-white focus:outline-hidden focus:ring-1 focus:ring-teal-500"
              />
            </div>
          </div>

          <div className="space-y-2">
            {filteredDrugs.map(drug => {
              const isSelected = selectedDrug?.id === drug.id;
              return (
                <div
                  key={drug.id}
                  onClick={() => setSelectedDrug(drug)}
                  className={`p-3.5 rounded-lg border transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-teal-50/60 border-teal-500 shadow-xs ring-1 ring-teal-500/30'
                      : 'bg-white border-slate-200 hover:border-slate-300 hover:bg-slate-50/50'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-xs text-slate-900">{drug.name}</span>
                        <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-slate-100 text-slate-600 border border-slate-200">
                          {drug.id}
                        </span>
                      </div>
                      <div className="text-[11px] font-mono text-slate-500 mt-1 flex items-center gap-2">
                        <span>{drug.chemicalFormula}</span>
                        <span>•</span>
                        <span>{drug.molecularWeight} g/mol</span>
                      </div>
                    </div>
                    <span className="text-[10px] font-mono text-slate-400">
                      CAS: {drug.casNumber}
                    </span>
                  </div>

                  <div className="mt-2.5 flex items-center justify-between text-[11px] text-slate-500 border-t border-slate-100 pt-2">
                    <span className="truncate max-w-[200px]">
                      Targets: {drug.knownTargets.join(', ')}
                    </span>
                    <span className="text-teal-700 font-semibold flex items-center gap-1">
                      <Eye className="w-3 h-3" />
                      <span>Inspect</span>
                    </span>
                  </div>
                </div>
              );
            })}

            {filteredDrugs.length === 0 && (
              <div className="p-8 text-center text-xs text-slate-400 bg-white border border-slate-200 rounded-lg">
                No compounds found matching &quot;{search}&quot;.
              </div>
            )}
          </div>
        </div>

        {/* Drug Details & Molecular Intelligence (7 cols) */}
        <div className="lg:col-span-7">
          {selectedDrug ? (
            <div className="space-y-4">
              {/* Top Card */}
              <div className="bg-white border border-slate-200 rounded-lg p-5 shadow-2xs">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-100 gap-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <h2 className="text-lg font-bold text-slate-900">{selectedDrug.name}</h2>
                      <span className="text-xs font-mono px-2 py-0.5 rounded bg-teal-50 text-teal-800 border border-teal-200 font-bold">
                        {selectedDrug.id}
                      </span>
                    </div>
                    <div className="text-xs text-slate-500 font-mono mt-0.5">
                      Formula: <strong className="text-slate-800">{selectedDrug.chemicalFormula}</strong> | Mass: <strong className="text-slate-800">{selectedDrug.molecularWeight} g/mol</strong> | CAS: <strong className="text-slate-800">{selectedDrug.casNumber}</strong>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => onRunAnalysisWithDrug(selectedDrug)}
                      className="px-3 py-1.5 rounded-md bg-teal-600 hover:bg-teal-500 text-white text-xs font-bold transition-colors flex items-center gap-1.5 shadow-xs"
                    >
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>Analyze with Profile</span>
                    </button>
                    {canEdit && (
                      <>
                        <button
                          onClick={() => handleOpenEdit(selectedDrug)}
                          className="p-1.5 rounded-md border border-slate-200 hover:bg-slate-100 text-slate-600 text-xs transition-colors"
                          title="Edit compound"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => onArchiveDrug(selectedDrug.id)}
                          className="p-1.5 rounded-md border border-slate-200 hover:bg-red-50 text-red-600 text-xs transition-colors"
                          title="Archive compound"
                        >
                          <Archive className="w-3.5 h-3.5" />
                        </button>
                      </>
                    )}
                  </div>
                </div>

                {/* Primary Identifiers */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 py-3 border-b border-slate-100 text-xs">
                  <div>
                    <span className="text-[10px] font-mono text-slate-400 uppercase block">Canonical SMILES</span>
                    <span className="font-mono text-slate-800 break-all select-all text-[11px] bg-slate-50 p-1.5 rounded border border-slate-100 block mt-1">
                      {selectedDrug.smiles}
                    </span>
                  </div>
                  <div>
                    <span className="text-[10px] font-mono text-slate-400 uppercase block">Standard InChI</span>
                    <span className="font-mono text-slate-800 break-all select-all text-[11px] bg-slate-50 p-1.5 rounded border border-slate-100 block mt-1">
                      {selectedDrug.inchi}
                    </span>
                  </div>
                </div>

                {/* Known Toxicity & Targets */}
                <div className="py-3 border-b border-slate-100 text-xs space-y-2">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block mb-1">
                      Reported Mechanistic & Toxicity Information
                    </span>
                    <p className="text-slate-700 bg-slate-50 p-3 rounded border border-slate-100 text-xs leading-relaxed">
                      {selectedDrug.knownToxicityInfo}
                    </p>
                  </div>
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block mb-1">
                      Reported Target Interactions
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {selectedDrug.knownTargets.map((t, idx) => (
                        <span key={idx} className="px-2 py-0.5 rounded text-[11px] font-mono bg-blue-50 text-blue-800 border border-blue-200">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="pt-3 text-[11px] text-slate-400 font-mono flex items-center justify-between">
                  <span>Source: {selectedDrug.sourceDatabase}</span>
                  <span>Registered: {selectedDrug.createdAt}</span>
                </div>
              </div>

              {/* Chemical Structure & Descriptors View */}
              <ChemicalStructureView drug={selectedDrug} />

              {/* Molecular Similarity Sandbox */}
              <div className="bg-white border border-slate-200 rounded-lg p-4 shadow-2xs text-xs">
                <div className="flex items-center justify-between pb-2 border-b border-slate-100 mb-3">
                  <div className="flex items-center gap-2">
                    <SlidersHorizontal className="w-4 h-4 text-teal-600" />
                    <h4 className="font-bold text-slate-800 uppercase tracking-wide text-xs">
                      Simulated Tanimoto Molecular Similarity Screen
                    </h4>
                  </div>
                  <span className="text-[10px] font-mono text-slate-400">ECFP4 Bit Sim</span>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-slate-50 p-3 rounded-md border border-slate-100">
                  <div className="text-slate-600">
                    Compare <strong className="text-slate-900">{selectedDrug.name}</strong> against:
                  </div>
                  <div className="flex items-center gap-2">
                    <select
                      value={similarityTarget}
                      onChange={e => setSimilarityTarget(e.target.value)}
                      className="px-2.5 py-1 text-xs bg-white border border-slate-300 rounded font-mono"
                    >
                      {drugs.filter(d => d.id !== selectedDrug.id).map(d => (
                        <option key={d.id} value={d.id}>
                          {d.id} - {d.name}
                        </option>
                      ))}
                    </select>
                    {(() => {
                      const other = drugs.find(d => d.id === similarityTarget);
                      if (!other) return null;
                      const score = calculateSimulatedSimilarity(selectedDrug.fingerprintBits, other.fingerprintBits);
                      return (
                        <div className="px-3 py-1 rounded bg-teal-100 text-teal-900 font-mono font-bold text-xs border border-teal-200">
                          Tanimoto: {(score * 100).toFixed(0)}%
                        </div>
                      );
                    })()}
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="p-12 text-center text-xs text-slate-400 bg-white border border-slate-200 rounded-lg">
              Select a compound from the left to view molecular intelligence.
            </div>
          )}
        </div>
      </div>

      {/* Edit/Create Compound Modal */}
      <Modal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        title={isNew ? 'Register New Compound Profile' : `Edit Compound: ${form.name}`}
        subtitle="Provide chemical formula, SMILES, and known mechanistic properties"
        maxWidth="max-w-2xl"
      >
        <form onSubmit={handleFormSubmit} className="space-y-4 text-xs">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-[11px] font-semibold text-slate-700 mb-1">Compound ID</label>
              <input
                type="text"
                value={form.id || ''}
                onChange={e => setForm({ ...form, id: e.target.value })}
                required
                className="w-full px-3 py-1.5 border border-slate-300 rounded focus:ring-1 focus:ring-teal-500 font-mono"
              />
            </div>
            <div>
              <label className="block text-[11px] font-semibold text-slate-700 mb-1">Compound Name</label>
              <input
                type="text"
                value={form.name || ''}
                onChange={e => setForm({ ...form, name: e.target.value })}
                required
                placeholder="e.g. Demo Compound A"
                className="w-full px-3 py-1.5 border border-slate-300 rounded focus:ring-1 focus:ring-teal-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="block text-[11px] font-semibold text-slate-700 mb-1">Chemical Formula</label>
              <input
                type="text"
                value={form.chemicalFormula || ''}
                onChange={e => setForm({ ...form, chemicalFormula: e.target.value })}
                required
                placeholder="e.g. C8H9NO2"
                className="w-full px-3 py-1.5 border border-slate-300 rounded focus:ring-1 focus:ring-teal-500 font-mono"
              />
            </div>
            <div>
              <label className="block text-[11px] font-semibold text-slate-700 mb-1">Molecular Weight (g/mol)</label>
              <input
                type="number"
                step="0.01"
                value={form.molecularWeight || 0}
                onChange={e => setForm({ ...form, molecularWeight: parseFloat(e.target.value) })}
                required
                className="w-full px-3 py-1.5 border border-slate-300 rounded focus:ring-1 focus:ring-teal-500 font-mono"
              />
            </div>
            <div>
              <label className="block text-[11px] font-semibold text-slate-700 mb-1">CAS Registry Number</label>
              <input
                type="text"
                value={form.casNumber || ''}
                onChange={e => setForm({ ...form, casNumber: e.target.value })}
                placeholder="e.g. 103-90-2"
                className="w-full px-3 py-1.5 border border-slate-300 rounded focus:ring-1 focus:ring-teal-500 font-mono"
              />
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-slate-700 mb-1">Canonical SMILES</label>
            <input
              type="text"
              value={form.smiles || ''}
              onChange={e => setForm({ ...form, smiles: e.target.value })}
              placeholder="e.g. CC(=O)Nc1ccc(O)cc1"
              className="w-full px-3 py-1.5 border border-slate-300 rounded focus:ring-1 focus:ring-teal-500 font-mono text-[11px]"
            />
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="block text-[11px] font-semibold text-slate-700 mb-1">LogP</label>
              <input
                type="number"
                step="0.01"
                value={form.knownProperties?.logP || 0}
                onChange={e => setForm({
                  ...form,
                  knownProperties: { ...form.knownProperties!, logP: parseFloat(e.target.value) }
                })}
                className="w-full px-3 py-1.5 border border-slate-300 rounded font-mono"
              />
            </div>
            <div>
              <label className="block text-[11px] font-semibold text-slate-700 mb-1">TPSA (Å²)</label>
              <input
                type="number"
                step="0.1"
                value={form.knownProperties?.tpsa || 0}
                onChange={e => setForm({
                  ...form,
                  knownProperties: { ...form.knownProperties!, tpsa: parseFloat(e.target.value) }
                })}
                className="w-full px-3 py-1.5 border border-slate-300 rounded font-mono"
              />
            </div>
            <div>
              <label className="block text-[11px] font-semibold text-slate-700 mb-1">Rotatable Bonds</label>
              <input
                type="number"
                value={form.knownProperties?.rotatableBonds || 0}
                onChange={e => setForm({
                  ...form,
                  knownProperties: { ...form.knownProperties!, rotatableBonds: parseInt(e.target.value) }
                })}
                className="w-full px-3 py-1.5 border border-slate-300 rounded font-mono"
              />
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-slate-700 mb-1">Known Targets (Comma-separated)</label>
            <input
              type="text"
              value={Array.isArray(form.knownTargets) ? form.knownTargets.join(', ') : (form.knownTargets || '')}
              onChange={e => setForm({ ...form, knownTargets: e.target.value as any })}
              placeholder="e.g. COX-2 (PTGS2), CYP2E1"
              className="w-full px-3 py-1.5 border border-slate-300 rounded"
            />
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-slate-700 mb-1">Known Toxicity / ADME Mechanism Notes</label>
            <textarea
              rows={2}
              value={form.knownToxicityInfo || ''}
              onChange={e => setForm({ ...form, knownToxicityInfo: e.target.value })}
              className="w-full px-3 py-1.5 border border-slate-300 rounded"
            />
          </div>

          <div className="flex justify-end gap-2 pt-3 border-t border-slate-200">
            <button
              type="button"
              onClick={() => setIsEditModalOpen(false)}
              className="px-3.5 py-1.5 rounded border border-slate-300 hover:bg-slate-100 font-semibold"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-1.5 rounded bg-teal-600 hover:bg-teal-500 text-white font-bold"
            >
              Save Compound Record
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
