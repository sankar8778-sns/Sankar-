import React from 'react';
import { DrugProfile } from '../../types';
import { Atom, Binary, Layers } from 'lucide-react';

interface Props {
  drug: DrugProfile;
  compact?: boolean;
}

export const ChemicalStructureView: React.FC<Props> = ({ drug, compact = false }) => {
  // Render deterministic SVG chemical representations based on drug ID / formula
  const renderStructureSvg = () => {
    if (drug.id === 'DG-001' || drug.chemicalFormula === 'C8H9NO2') {
      // Paracetamol-like 2D structure
      return (
        <svg viewBox="0 0 320 220" className="w-full h-full max-h-56 stroke-slate-800 fill-none text-slate-800">
          <g strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            {/* Benzene ring with alternating double bonds */}
            <polygon points="160,70 195,90 195,130 160,150 125,130 125,90" className="stroke-slate-800 fill-slate-50/50" />
            <line x1="160" y1="78" x2="188" y2="94" className="stroke-teal-600" strokeWidth="2" />
            <line x1="190" y1="126" x2="160" y2="143" className="stroke-teal-600" strokeWidth="2" />
            <line x1="132" y1="94" x2="132" y2="126" className="stroke-teal-600" strokeWidth="2" />
            
            {/* Top 4-hydroxy group: bond to OH */}
            <line x1="160" y1="70" x2="160" y2="38" className="stroke-slate-800" />
            <text x="160" y="32" textAnchor="middle" className="text-sm font-mono font-bold fill-red-600 stroke-none">OH</text>
            
            {/* Bottom 1-acetamide group: bond to NH */}
            <line x1="160" y1="150" x2="160" y2="175" className="stroke-slate-800" />
            <text x="160" y="190" textAnchor="middle" className="text-xs font-mono font-bold fill-blue-600 stroke-none">NH</text>
            
            {/* Carbonyl and methyl extension */}
            <line x1="172" y1="188" x2="200" y2="188" className="stroke-slate-800" />
            <line x1="200" y1="188" x2="225" y2="205" className="stroke-slate-800" />
            <text x="235" y="210" textAnchor="start" className="text-xs font-mono font-bold fill-slate-700 stroke-none">CH₃</text>
            
            {/* Double bond to Oxygen (=O) */}
            <line x1="197" y1="188" x2="197" y2="165" className="stroke-red-500" strokeWidth="2.5" />
            <line x1="203" y1="188" x2="203" y2="165" className="stroke-red-500" strokeWidth="2.5" />
            <text x="200" y="158" textAnchor="middle" className="text-xs font-mono font-bold fill-red-600 stroke-none">O</text>
          </g>
          {/* Subtle atom callout dots */}
          <circle cx="160" cy="70" r="3" className="fill-teal-600 stroke-none" />
          <circle cx="195" cy="90" r="3" className="fill-teal-600 stroke-none" />
          <circle cx="195" cy="130" r="3" className="fill-teal-600 stroke-none" />
          <circle cx="160" cy="150" r="3" className="fill-teal-600 stroke-none" />
          <circle cx="125" cy="130" r="3" className="fill-teal-600 stroke-none" />
          <circle cx="125" cy="90" r="3" className="fill-teal-600 stroke-none" />
        </svg>
      );
    } else if (drug.id === 'DG-002' || drug.chemicalFormula === 'C21H18F3N7O') {
      // Kinase Inhibitor scaffold 2D representation
      return (
        <svg viewBox="0 0 340 220" className="w-full h-full max-h-56 stroke-slate-800 fill-none text-slate-800">
          <g strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            {/* Pyrimidine and Pyridine Rings */}
            <polygon points="50,90 75,75 100,90 100,120 75,135 50,120" className="stroke-slate-800 fill-slate-50/50" />
            <text x="75" y="72" textAnchor="middle" className="text-[10px] font-mono font-bold fill-blue-600 stroke-none">N</text>
            <polygon points="120,90 145,75 170,90 170,120 145,135 120,120" className="stroke-slate-800 fill-slate-50/50" />
            <text x="145" y="72" textAnchor="middle" className="text-[10px] font-mono font-bold fill-blue-600 stroke-none">N</text>
            <text x="145" y="138" textAnchor="middle" className="text-[10px] font-mono font-bold fill-blue-600 stroke-none">N</text>
            
            <line x1="100" y1="105" x2="120" y2="105" className="stroke-slate-800" />
            <line x1="170" y1="105" x2="195" y2="105" className="stroke-slate-800" />
            <text x="195" y="100" textAnchor="middle" className="text-[11px] font-mono font-bold fill-blue-600 stroke-none">NH</text>
            
            {/* Central Phenyl ring */}
            <polygon points="215,90 240,75 265,90 265,120 240,135 215,120" className="stroke-slate-800 fill-slate-50/50" />
            <line x1="265" y1="105" x2="285" y2="105" className="stroke-slate-800" />
            
            {/* Trifluoromethyl group */}
            <text x="295" y="109" textAnchor="start" className="text-xs font-mono font-bold fill-emerald-600 stroke-none">CF₃</text>
            
            {/* Carbonyl branch */}
            <line x1="240" y1="135" x2="240" y2="155" className="stroke-slate-800" />
            <text x="240" y="170" textAnchor="middle" className="text-[11px] font-mono font-bold fill-red-600 stroke-none">O</text>
          </g>
        </svg>
      );
    } else {
      // General scientific molecular network
      return (
        <svg viewBox="0 0 320 200" className="w-full h-full max-h-56 stroke-slate-800 fill-none text-slate-800">
          <g strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <polygon points="120,60 150,45 180,60 180,95 150,110 120,95" className="stroke-slate-800 fill-teal-50/30" />
            <polygon points="180,95 210,80 240,95 240,130 210,145 180,130" className="stroke-slate-800 fill-teal-50/30" />
            <line x1="150" y1="110" x2="150" y2="140" className="stroke-slate-800" />
            <circle cx="150" cy="150" r="8" className="stroke-red-500 fill-red-50" />
            <text x="150" y="154" textAnchor="middle" className="text-[10px] font-mono font-bold fill-red-600 stroke-none">OH</text>
            
            <line x1="120" y1="60" x2="95" y2="50" className="stroke-slate-800" />
            <circle cx="85" cy="45" r="8" className="stroke-blue-500 fill-blue-50" />
            <text x="85" y="49" textAnchor="middle" className="text-[10px] font-mono font-bold fill-blue-600 stroke-none">N</text>
            
            <line x1="240" y1="95" x2="265" y2="85" className="stroke-slate-800" />
            <text x="275" y="90" textAnchor="middle" className="text-[10px] font-mono font-bold fill-slate-600 stroke-none">R</text>
          </g>
        </svg>
      );
    }
  };

  return (
    <div className="bg-white border border-slate-200 rounded-lg p-4 shadow-2xs">
      <div className="flex items-center justify-between pb-3 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <Atom className="w-4 h-4 text-teal-600" />
          <h4 className="text-xs font-bold text-slate-800 tracking-wide uppercase">
            Molecular Structure & Descriptors
          </h4>
        </div>
        <span className="text-[11px] font-mono text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
          SMILES: {drug.smiles.length > 24 ? drug.smiles.substring(0, 24) + '...' : drug.smiles}
        </span>
      </div>

      {/* SVG 2D Visualization Container */}
      <div className="my-3 bg-slate-50 border border-slate-200/80 rounded-md p-2 flex flex-col items-center justify-center relative overflow-hidden">
        <div className="absolute top-2 left-2 flex items-center gap-1.5 text-[10px] font-mono text-slate-500">
          <span className="w-1.5 h-1.5 rounded-full bg-teal-500 animate-pulse"></span>
          2D Topology Generator
        </div>
        {renderStructureSvg()}
        <div className="w-full text-center text-[10px] text-slate-400 font-mono">
          Formula: <strong className="text-slate-700">{drug.chemicalFormula}</strong> | Mass: <strong className="text-slate-700">{drug.molecularWeight} g/mol</strong> | CAS: <strong className="text-slate-700">{drug.casNumber}</strong>
        </div>
      </div>

      {/* Descriptors Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs">
        <div className="p-2 bg-slate-50 rounded border border-slate-100">
          <span className="text-[10px] text-slate-500 uppercase block font-semibold">LogP (Lipophilicity)</span>
          <span className="font-mono font-bold text-slate-800">{drug.knownProperties.logP.toFixed(2)}</span>
        </div>
        <div className="p-2 bg-slate-50 rounded border border-slate-100">
          <span className="text-[10px] text-slate-500 uppercase block font-semibold">TPSA (Polar Surface)</span>
          <span className="font-mono font-bold text-slate-800">{drug.knownProperties.tpsa} Å²</span>
        </div>
        <div className="p-2 bg-slate-50 rounded border border-slate-100">
          <span className="text-[10px] text-slate-500 uppercase block font-semibold">H-Bond Donors / Acc</span>
          <span className="font-mono font-bold text-slate-800">{drug.knownProperties.hbd} / {drug.knownProperties.hba}</span>
        </div>
        <div className="p-2 bg-slate-50 rounded border border-slate-100">
          <span className="text-[10px] text-slate-500 uppercase block font-semibold">Rotatable Bonds</span>
          <span className="font-mono font-bold text-slate-800">{drug.knownProperties.rotatableBonds}</span>
        </div>
        <div className="p-2 bg-slate-50 rounded border border-slate-100">
          <span className="text-[10px] text-slate-500 uppercase block font-semibold">Heavy Atoms</span>
          <span className="font-mono font-bold text-slate-800">{drug.knownProperties.heavyAtomCount}</span>
        </div>
        <div className="p-2 bg-slate-50 rounded border border-slate-100">
          <span className="text-[10px] text-slate-500 uppercase block font-semibold">Aromatic Rings</span>
          <span className="font-mono font-bold text-slate-800">{drug.knownProperties.aromaticRings}</span>
        </div>
      </div>

      {!compact && (
        <>
          {/* Functional Groups */}
          <div className="mt-3 pt-3 border-t border-slate-100">
            <span className="text-[10px] text-slate-500 uppercase font-semibold flex items-center gap-1.5 mb-1.5">
              <Layers className="w-3 h-3 text-slate-400" />
              Identified Functional Groups & Pharmacophores
            </span>
            <div className="flex flex-wrap gap-1.5">
              {drug.functionalGroups.map((group, idx) => (
                <span
                  key={idx}
                  className="px-2 py-0.5 rounded text-[11px] font-mono bg-teal-50 text-teal-800 border border-teal-200"
                >
                  {group}
                </span>
              ))}
            </div>
          </div>

          {/* 32-bit Molecular Fingerprint Bit Matrix */}
          <div className="mt-3 pt-3 border-t border-slate-100">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-[10px] text-slate-500 uppercase font-semibold flex items-center gap-1.5">
                <Binary className="w-3 h-3 text-slate-400" />
                32-Bit Topological Fingerprint (Simulated Morgan / ECFP4)
              </span>
              <span className="text-[10px] font-mono text-slate-400">
                Density: {drug.fingerprintBits.filter(b => b === 1).length} / 32
              </span>
            </div>
            <div className="grid grid-cols-16 gap-1 bg-slate-900 p-2 rounded border border-slate-800">
              {drug.fingerprintBits.map((bit, idx) => (
                <div
                  key={idx}
                  title={`Bit ${idx}: ${bit}`}
                  className={`h-4 rounded-xs flex items-center justify-center text-[9px] font-mono transition-colors ${
                    bit === 1
                      ? 'bg-teal-400 text-slate-950 font-bold shadow-xs'
                      : 'bg-slate-800 text-slate-500'
                  }`}
                >
                  {bit}
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};
