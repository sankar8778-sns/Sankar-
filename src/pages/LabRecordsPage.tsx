import React, { useState } from 'react';
import { 
  FlaskConical, 
  Dna, 
  FileCheck2, 
  Plus, 
  CheckCircle2, 
  Calendar, 
  User, 
  Microscope,
  Info
} from 'lucide-react';
import { LabRecord, UserRole } from '../types';
import { DemoNoticeBadge } from '../components/common/DemoNoticeBadge';
import { ScientificDisclaimer } from '../components/common/ScientificDisclaimer';
import { Modal } from '../components/common/Modal';

interface Props {
  records: LabRecord[];
  onSaveRecord: (rec: LabRecord) => void;
  userRole: UserRole;
}

export const LabRecordsPage: React.FC<Props> = ({
  records,
  onSaveRecord,
  userRole
}) => {
  const [selectedRecord, setSelectedRecord] = useState<LabRecord>(records[0] || null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // New Record state
  const [newRec, setNewRec] = useState<Partial<LabRecord>>({
    sampleId: `AG-S00${records.length + 1}`,
    laboratory: 'AS GARDIAN',
    sampleType: 'Research Dataset',
    analysisRequested: 'DNA + RNA',
    batchId: `AG-EXT-2026-B0${records.length + 4}`,
    datasetVersion: 'v1.0',
    notes: 'Standard quality control batch passing electrophoretic and spectrophotometric gates.',
    dna: {
      status: 'Completed',
      concentration: 88.0,
      a260_a280: 1.86,
      a260_a230: 2.10,
      integrity: 'DIN 8.8',
      extractionBatch: `AG-EXT-2026-B0${records.length + 4}-DNA`,
      datasetVersion: 'v1.0'
    },
    rna: {
      status: 'Completed',
      concentration: 120.5,
      a260_a280: 2.04,
      a260_a230: 2.12,
      integrity: 'RIN 9.2',
      dnaseTreatment: 'Completed',
      extractionBatch: `AG-EXT-2026-B0${records.length + 4}-RNA`,
      datasetVersion: 'v1.0'
    }
  });

  const canCreate = userRole === 'Administrator' || userRole === 'Researcher';

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    const rec: LabRecord = {
      id: `AG-LAB-2026-00${records.length + 1}`,
      sampleId: newRec.sampleId || 'AG-S001',
      laboratory: newRec.laboratory || 'AS GARDIAN',
      sampleType: newRec.sampleType || 'Research Dataset',
      analysisRequested: newRec.analysisRequested || 'DNA + RNA',
      batchId: newRec.batchId || 'AG-EXT-2026-B01',
      datasetVersion: newRec.datasetVersion || 'v1.0',
      timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19) + ' UTC',
      operator: 'Dr. Evelyn Vance (Senior Laboratory Analyst)',
      dna: newRec.dna as any,
      rna: newRec.rna as any,
      notes: newRec.notes || 'Routine sample preparation.'
    };
    onSaveRecord(rec);
    setSelectedRecord(rec);
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-5">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-200 gap-3">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
              <FlaskConical className="w-5 h-5 text-teal-600" />
              AS GARDIAN Laboratory Module
            </h1>
            <DemoNoticeBadge />
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Molecular sample extraction records, microfluidic integrity metrics, and spectrophotometric purity quality gates.
          </p>
        </div>

        {canCreate && (
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-teal-600 hover:bg-teal-500 text-white font-semibold text-xs transition-colors shadow-xs"
          >
            <Plus className="w-4 h-4" />
            <span>Log Sample Record</span>
          </button>
        )}
      </div>

      {/* Prominent Section 8 Notice */}
      <div className="p-3 bg-slate-100 border border-slate-300 rounded-lg text-xs text-slate-700 flex items-start gap-2.5">
        <Info className="w-4 h-4 text-teal-700 shrink-0 mt-0.5" />
        <div>
          <span className="font-bold text-slate-900">Prototype Experimental Notice: </span>
          &ldquo;This prototype uses simulated or public research data unless an experimentally generated dataset is explicitly provided.&rdquo;
        </div>
      </div>

      <ScientificDisclaimer compact />

      {/* Main Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Left: Samples list (4 cols) */}
        <div className="lg:col-span-4 space-y-2">
          <div className="text-[11px] font-mono text-slate-400 uppercase font-semibold px-1">
            Logged Lab Batches ({records.length})
          </div>
          {records.map(rec => {
            const isSelected = selectedRecord?.id === rec.id;
            return (
              <div
                key={rec.id}
                onClick={() => setSelectedRecord(rec)}
                className={`p-3.5 rounded-lg border transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-teal-50/60 border-teal-500 ring-1 ring-teal-500/20 shadow-xs'
                    : 'bg-white border-slate-200 hover:border-slate-300'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div>
                    <span className="font-bold text-xs text-slate-900">{rec.sampleId}</span>
                    <div className="text-[11px] font-mono text-slate-500 mt-0.5">
                      Batch: {rec.batchId}
                    </div>
                  </div>
                  <span className="text-[10px] font-mono bg-teal-100 text-teal-800 px-1.5 py-0.5 rounded font-bold">
                    {rec.id}
                  </span>
                </div>

                <div className="mt-2 text-[11px] text-slate-600 flex items-center justify-between">
                  <span>Req: {rec.analysisRequested}</span>
                  <span className="font-mono text-slate-400 text-[10px]">{rec.timestamp.split(' ')[0]}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Right: Detailed Molecular Sample Record (8 cols) */}
        <div className="lg:col-span-8 space-y-4">
          {selectedRecord ? (
            <div className="space-y-4">
              {/* Main Record Header Card */}
              <div className="bg-white border border-slate-200 rounded-lg p-5 shadow-2xs">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-slate-100 gap-2">
                  <div>
                    <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block">
                      AS GARDIAN LABORATORY RECORD
                    </span>
                    <h2 className="text-lg font-bold text-slate-900 mt-0.5">
                      Molecular Sample Record: {selectedRecord.sampleId}
                    </h2>
                  </div>
                  <div className="text-right">
                    <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                      Quality Certified
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 py-3 border-b border-slate-100 text-xs">
                  <div>
                    <span className="text-[10px] font-mono text-slate-400 uppercase block">Laboratory</span>
                    <span className="font-bold text-slate-800">{selectedRecord.laboratory}</span>
                  </div>
                  <div>
                    <span className="text-[10px] font-mono text-slate-400 uppercase block">Sample Type</span>
                    <span className="font-bold text-slate-800">{selectedRecord.sampleType}</span>
                  </div>
                  <div>
                    <span className="text-[10px] font-mono text-slate-400 uppercase block">Requested Analysis</span>
                    <span className="font-bold text-slate-800">{selectedRecord.analysisRequested}</span>
                  </div>
                  <div>
                    <span className="text-[10px] font-mono text-slate-400 uppercase block">Extraction Batch</span>
                    <span className="font-bold font-mono text-slate-800">{selectedRecord.batchId}</span>
                  </div>
                </div>

                <div className="pt-3 text-[11px] text-slate-500 flex flex-wrap items-center justify-between gap-2">
                  <span>Operator: <strong>{selectedRecord.operator}</strong></span>
                  <span className="font-mono">Timestamp: {selectedRecord.timestamp}</span>
                </div>
              </div>

              {/* DNA Record Card */}
              <div className="bg-white border border-slate-200 rounded-lg p-5 shadow-2xs text-xs space-y-3">
                <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                  <div className="flex items-center gap-2">
                    <div className="p-1 rounded bg-teal-50 text-teal-700 border border-teal-200">
                      <Dna className="w-4 h-4" />
                    </div>
                    <h3 className="font-bold text-slate-900 text-sm">DNA Extraction & Purity Record</h3>
                  </div>
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-emerald-100 text-emerald-800">
                    Status: {selectedRecord.dna.status}
                  </span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <div className="p-3 bg-slate-50 rounded-lg border border-slate-100">
                    <span className="text-[10px] font-mono text-slate-500 uppercase block">DNA Concentration</span>
                    <span className="text-base font-bold font-mono text-slate-900">
                      {selectedRecord.dna.concentration} <span className="text-xs font-normal">ng/μL</span>
                    </span>
                  </div>
                  <div className="p-3 bg-slate-50 rounded-lg border border-slate-100">
                    <span className="text-[10px] font-mono text-slate-500 uppercase block">A260 / A280 Purity</span>
                    <span className="text-base font-bold font-mono text-slate-900">
                      {selectedRecord.dna.a260_a280}
                    </span>
                    <span className="text-[10px] text-emerald-700 block mt-0.5 font-mono">1.8 - 2.0 Optimal</span>
                  </div>
                  <div className="p-3 bg-slate-50 rounded-lg border border-slate-100">
                    <span className="text-[10px] font-mono text-slate-500 uppercase block">A260 / A230 Ratio</span>
                    <span className="text-base font-bold font-mono text-slate-900">
                      {selectedRecord.dna.a260_a230}
                    </span>
                    <span className="text-[10px] text-emerald-700 block mt-0.5 font-mono">&gt; 2.0 Pure</span>
                  </div>
                  <div className="p-3 bg-slate-50 rounded-lg border border-slate-100">
                    <span className="text-[10px] font-mono text-slate-500 uppercase block">DNA Integrity</span>
                    <span className="text-base font-bold font-mono text-teal-700">
                      {selectedRecord.dna.integrity}
                    </span>
                    <span className="text-[10px] text-slate-500 block mt-0.5 font-mono">Microfluidic DIN</span>
                  </div>
                </div>

                <div className="p-2.5 bg-slate-50 rounded font-mono text-[11px] text-slate-600 flex items-center justify-between">
                  <span>DNA Batch: {selectedRecord.dna.extractionBatch}</span>
                  <span>Dataset Version: {selectedRecord.dna.datasetVersion}</span>
                </div>
              </div>

              {/* RNA Record Card */}
              <div className="bg-white border border-slate-200 rounded-lg p-5 shadow-2xs text-xs space-y-3">
                <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                  <div className="flex items-center gap-2">
                    <div className="p-1 rounded bg-blue-50 text-blue-700 border border-blue-200">
                      <Microscope className="w-4 h-4" />
                    </div>
                    <h3 className="font-bold text-slate-900 text-sm">RNA Extraction & Purity Record</h3>
                  </div>
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-emerald-100 text-emerald-800">
                    Status: {selectedRecord.rna.status}
                  </span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <div className="p-3 bg-slate-50 rounded-lg border border-slate-100">
                    <span className="text-[10px] font-mono text-slate-500 uppercase block">RNA Concentration</span>
                    <span className="text-base font-bold font-mono text-slate-900">
                      {selectedRecord.rna.concentration} <span className="text-xs font-normal">ng/μL</span>
                    </span>
                  </div>
                  <div className="p-3 bg-slate-50 rounded-lg border border-slate-100">
                    <span className="text-[10px] font-mono text-slate-500 uppercase block">A260 / A280 Purity</span>
                    <span className="text-base font-bold font-mono text-slate-900">
                      {selectedRecord.rna.a260_a280}
                    </span>
                    <span className="text-[10px] text-emerald-700 block mt-0.5 font-mono">2.0 ± 0.1 Pure</span>
                  </div>
                  <div className="p-3 bg-slate-50 rounded-lg border border-slate-100">
                    <span className="text-[10px] font-mono text-slate-500 uppercase block">A260 / A230 Ratio</span>
                    <span className="text-base font-bold font-mono text-slate-900">
                      {selectedRecord.rna.a260_a230}
                    </span>
                    <span className="text-[10px] text-emerald-700 block mt-0.5 font-mono">&gt; 2.0 Pure</span>
                  </div>
                  <div className="p-3 bg-slate-50 rounded-lg border border-slate-100">
                    <span className="text-[10px] font-mono text-slate-500 uppercase block">RNA Integrity</span>
                    <span className="text-base font-bold font-mono text-blue-700">
                      {selectedRecord.rna.integrity}
                    </span>
                    <span className="text-[10px] text-slate-500 block mt-0.5 font-mono">Bioanalyzer RIN</span>
                  </div>
                </div>

                <div className="p-2.5 bg-slate-50 rounded font-mono text-[11px] text-slate-600 flex items-center justify-between">
                  <span>DNase Treatment: <strong>{selectedRecord.rna.dnaseTreatment}</strong></span>
                  <span>RNA Batch: {selectedRecord.rna.extractionBatch}</span>
                </div>
              </div>

              {/* Lab Technician Notes */}
              <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg text-xs space-y-1">
                <span className="font-bold text-slate-700 uppercase tracking-wide text-[10px] block">
                  Laboratory Verification & Quality Sign-Off Notes
                </span>
                <p className="text-slate-600 leading-relaxed">{selectedRecord.notes}</p>
              </div>
            </div>
          ) : (
            <div className="p-12 text-center text-xs text-slate-400 bg-white border border-slate-200 rounded-lg">
              Select a sample record to view extraction and purity parameters.
            </div>
          )}
        </div>
      </div>

      {/* Modal: Log New Record */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Log AS GARDIAN Molecular Sample Record"
        subtitle="Record DNA and RNA quality metrics for new biological dataset batch"
      >
        <form onSubmit={handleCreate} className="space-y-4 text-xs">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-[11px] font-semibold text-slate-700 mb-1">Sample ID</label>
              <input
                type="text"
                value={newRec.sampleId || ''}
                onChange={e => setNewRec({ ...newRec, sampleId: e.target.value })}
                required
                className="w-full px-3 py-1.5 border border-slate-300 rounded font-mono"
              />
            </div>
            <div>
              <label className="block text-[11px] font-semibold text-slate-700 mb-1">Batch ID</label>
              <input
                type="text"
                value={newRec.batchId || ''}
                onChange={e => setNewRec({ ...newRec, batchId: e.target.value })}
                required
                className="w-full px-3 py-1.5 border border-slate-300 rounded font-mono"
              />
            </div>
          </div>

          <div className="p-3 bg-teal-50/50 rounded-md border border-teal-100 space-y-2">
            <h4 className="font-bold text-teal-900 text-xs">DNA Extraction Parameters</h4>
            <div className="grid grid-cols-3 gap-2">
              <div>
                <label className="block text-[10px] text-slate-600">DNA Conc (ng/μL)</label>
                <input
                  type="number"
                  step="0.1"
                  value={newRec.dna?.concentration || 0}
                  onChange={e => setNewRec({
                    ...newRec,
                    dna: { ...newRec.dna!, concentration: parseFloat(e.target.value) }
                  })}
                  className="w-full px-2 py-1 border border-slate-300 rounded font-mono"
                />
              </div>
              <div>
                <label className="block text-[10px] text-slate-600">A260 / A280</label>
                <input
                  type="number"
                  step="0.01"
                  value={newRec.dna?.a260_a280 || 0}
                  onChange={e => setNewRec({
                    ...newRec,
                    dna: { ...newRec.dna!, a260_a280: parseFloat(e.target.value) }
                  })}
                  className="w-full px-2 py-1 border border-slate-300 rounded font-mono"
                />
              </div>
              <div>
                <label className="block text-[10px] text-slate-600">Integrity (DIN)</label>
                <input
                  type="text"
                  value={newRec.dna?.integrity || 'DIN 8.7'}
                  onChange={e => setNewRec({
                    ...newRec,
                    dna: { ...newRec.dna!, integrity: e.target.value }
                  })}
                  className="w-full px-2 py-1 border border-slate-300 rounded font-mono"
                />
              </div>
            </div>
          </div>

          <div className="p-3 bg-blue-50/50 rounded-md border border-blue-100 space-y-2">
            <h4 className="font-bold text-blue-900 text-xs">RNA Extraction Parameters</h4>
            <div className="grid grid-cols-3 gap-2">
              <div>
                <label className="block text-[10px] text-slate-600">RNA Conc (ng/μL)</label>
                <input
                  type="number"
                  step="0.1"
                  value={newRec.rna?.concentration || 0}
                  onChange={e => setNewRec({
                    ...newRec,
                    rna: { ...newRec.rna!, concentration: parseFloat(e.target.value) }
                  })}
                  className="w-full px-2 py-1 border border-slate-300 rounded font-mono"
                />
              </div>
              <div>
                <label className="block text-[10px] text-slate-600">A260 / A280</label>
                <input
                  type="number"
                  step="0.01"
                  value={newRec.rna?.a260_a280 || 0}
                  onChange={e => setNewRec({
                    ...newRec,
                    rna: { ...newRec.rna!, a260_a280: parseFloat(e.target.value) }
                  })}
                  className="w-full px-2 py-1 border border-slate-300 rounded font-mono"
                />
              </div>
              <div>
                <label className="block text-[10px] text-slate-600">Integrity (RIN)</label>
                <input
                  type="text"
                  value={newRec.rna?.integrity || 'RIN 9.0'}
                  onChange={e => setNewRec({
                    ...newRec,
                    rna: { ...newRec.rna!, integrity: e.target.value }
                  })}
                  className="w-full px-2 py-1 border border-slate-300 rounded font-mono"
                />
              </div>
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-slate-700 mb-1">Quality Sign-Off Notes</label>
            <textarea
              rows={2}
              value={newRec.notes || ''}
              onChange={e => setNewRec({ ...newRec, notes: e.target.value })}
              className="w-full px-3 py-1.5 border border-slate-300 rounded"
            />
          </div>

          <div className="flex justify-end gap-2 pt-3 border-t border-slate-200">
            <button
              type="button"
              onClick={() => setIsModalOpen(false)}
              className="px-3.5 py-1.5 rounded border border-slate-300 hover:bg-slate-100 font-semibold"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-1.5 rounded bg-teal-600 hover:bg-teal-500 text-white font-bold"
            >
              Log Sample
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
