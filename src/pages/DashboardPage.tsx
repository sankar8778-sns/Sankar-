import React from 'react';
import { 
  Pill, 
  Dna, 
  Cpu, 
  FileCheck, 
  TrendingUp, 
  FlaskConical, 
  Plus, 
  Play, 
  History, 
  FileText, 
  ArrowUpRight, 
  ShieldCheck,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { AnalysisRecord, DrugProfile, BiologicalProfile, EvidencePassport } from '../types';
import { ScientificDisclaimer } from '../components/common/ScientificDisclaimer';
import { DemoNoticeBadge } from '../components/common/DemoNoticeBadge';
import { EvidencePipeline } from '../components/pipeline/EvidencePipeline';
import { NavTabId } from '../components/common/Sidebar';

interface Props {
  drugs: DrugProfile[];
  profiles: BiologicalProfile[];
  analyses: AnalysisRecord[];
  passports: EvidencePassport[];
  onNavigate: (tab: NavTabId, selectedId?: string) => void;
  onOpenRegisterDrug: () => void;
  onOpenRegisterBio: () => void;
}

export const DashboardPage: React.FC<Props> = ({
  drugs,
  profiles,
  analyses,
  passports,
  onNavigate,
  onOpenRegisterDrug,
  onOpenRegisterBio
}) => {
  const kpis = [
    {
      title: 'Total Drug Profiles',
      value: drugs.length,
      icon: Pill,
      color: 'text-teal-600 bg-teal-50 border-teal-200',
      change: 'Active library'
    },
    {
      title: 'Biological Profiles',
      value: profiles.length,
      icon: Dna,
      color: 'text-blue-600 bg-blue-50 border-blue-200',
      change: '6 species models'
    },
    {
      title: 'Completed Analyses',
      value: analyses.length,
      icon: Cpu,
      color: 'text-indigo-600 bg-indigo-50 border-indigo-200',
      change: 'Deterministic runs'
    },
    {
      title: 'Evidence Passports',
      value: passports.length,
      icon: FileCheck,
      color: 'text-emerald-600 bg-emerald-50 border-emerald-200',
      change: '100% SHA-256 sealed'
    },
    {
      title: 'Model Agreements',
      value: '75%',
      icon: TrendingUp,
      color: 'text-purple-600 bg-purple-50 border-purple-200',
      change: '3/4 Ensemble avg'
    },
    {
      title: 'Pending Lab Validations',
      value: '4 Targets',
      icon: FlaskConical,
      color: 'text-amber-600 bg-amber-50 border-amber-200',
      change: 'Prioritized for bench'
    }
  ];

  const quickActions = [
    {
      title: 'Register Drug',
      desc: 'Add a new drug or compound profile.',
      icon: Plus,
      action: onOpenRegisterDrug,
      buttonText: 'New Compound',
      color: 'hover:border-teal-400 group-hover:text-teal-600'
    },
    {
      title: 'Register Biological Profile',
      desc: 'Create a biological-system profile.',
      icon: Plus,
      action: onOpenRegisterBio,
      buttonText: 'New Profile',
      color: 'hover:border-blue-400 group-hover:text-blue-600'
    },
    {
      title: 'Start Analysis',
      desc: 'Combine drug and biological evidence for computational analysis.',
      icon: Play,
      action: () => onNavigate('analysis-wizard'),
      buttonText: 'Run Pipeline',
      color: 'hover:border-emerald-400 group-hover:text-emerald-600',
      primary: true
    },
    {
      title: 'Evidence Passport',
      desc: 'View and verify previous analyses.',
      icon: FileCheck,
      action: () => onNavigate('passport'),
      buttonText: 'View Passports',
      color: 'hover:border-purple-400 group-hover:text-purple-600'
    },
    {
      title: 'Audit Logs',
      desc: 'Track important system activities.',
      icon: History,
      action: () => onNavigate('audit-logs'),
      buttonText: 'Open Audit',
      color: 'hover:border-slate-400 group-hover:text-slate-600'
    },
    {
      title: 'Generate Report',
      desc: 'Create a computational evidence report.',
      icon: FileText,
      action: () => onNavigate('reports'),
      buttonText: 'Reports',
      color: 'hover:border-indigo-400 group-hover:text-indigo-600'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-850 to-slate-900 border border-slate-800 rounded-xl p-6 text-white relative overflow-hidden shadow-sm">
        <div className="absolute right-0 top-0 bottom-0 w-96 bg-gradient-to-l from-teal-500/10 to-transparent pointer-events-none"></div>
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <DemoNoticeBadge className="bg-slate-800 text-teal-300 border-teal-800/60" />
              <span className="text-[11px] font-mono text-slate-400">
                PROTOTYPE ENVIRONMENT
              </span>
            </div>
            <h1 className="text-2xl lg:text-3xl font-extrabold tracking-tight text-white">
              Welcome to CYGEN VAULT
            </h1>
            <p className="text-slate-300 text-sm mt-1 max-w-2xl font-light">
              Secure Biological Intelligence. Traceable Scientific Evidence.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => onNavigate('analysis-wizard')}
              className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold text-xs transition-colors shadow-xs"
            >
              <Play className="w-4 h-4" />
              <span>Start Analysis Workflow</span>
            </button>
            <button
              onClick={() => onNavigate('integrity')}
              className="flex items-center gap-2 px-3.5 py-2.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-semibold text-xs transition-colors"
            >
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Verify Integrity</span>
            </button>
          </div>
        </div>
      </div>

      {/* Scientific Disclaimer */}
      <ScientificDisclaimer />

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
        {kpis.map((kpi, idx) => {
          const Icon = kpi.icon;
          return (
            <div
              key={idx}
              className="bg-white border border-slate-200 rounded-lg p-3.5 shadow-2xs hover:border-slate-300 transition-all"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-[11px] text-slate-500 font-medium line-clamp-1">{kpi.title}</span>
                <div className={`p-1.5 rounded-md border ${kpi.color}`}>
                  <Icon className="w-3.5 h-3.5" />
                </div>
              </div>
              <div className="text-xl font-bold font-mono text-slate-900">{kpi.value}</div>
              <div className="text-[10px] text-slate-500 mt-1 font-mono">{kpi.change}</div>
            </div>
          );
        })}
      </div>

      {/* Quick Actions */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider font-mono">
            Platform Quick Actions
          </h2>
          <span className="text-xs text-slate-500">Fast path actions</span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {quickActions.map((qa, idx) => {
            const Icon = qa.icon;
            return (
              <div
                key={idx}
                className={`group bg-white border border-slate-200 rounded-lg p-4 transition-all shadow-2xs flex flex-col justify-between ${
                  qa.primary ? 'ring-1 ring-teal-500/30 border-teal-500/40 bg-teal-50/20' : ''
                } ${qa.color}`}
              >
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="font-bold text-xs text-slate-900 group-hover:text-teal-700 transition-colors">
                      {qa.title}
                    </h3>
                    <div className="p-1 rounded bg-slate-100 text-slate-600 group-hover:bg-teal-50 group-hover:text-teal-600 transition-colors">
                      <Icon className="w-3.5 h-3.5" />
                    </div>
                  </div>
                  <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">
                    {qa.desc}
                  </p>
                </div>
                <div className="mt-3 pt-3 border-t border-slate-100 flex justify-end">
                  <button
                    onClick={qa.action}
                    className={`inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded transition-colors ${
                      qa.primary
                        ? 'bg-teal-600 text-white hover:bg-teal-500'
                        : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                    }`}
                  >
                    <span>{qa.buttonText}</span>
                    <ArrowUpRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Evidence Pipeline Visualization */}
      <EvidencePipeline onSelectStep={step => onNavigate(step as NavTabId)} />

      {/* Recent Analyses Table */}
      <div className="bg-white border border-slate-200 rounded-lg shadow-2xs overflow-hidden">
        <div className="p-4 border-b border-slate-100 flex items-center justify-between">
          <div>
            <h3 className="text-sm font-bold text-slate-900">Recent Computational Analyses</h3>
            <p className="text-xs text-slate-500">Audit-sealed runs with multi-model consensus and uncertainty metrics</p>
          </div>
          <button
            onClick={() => onNavigate('passport')}
            className="text-xs font-semibold text-teal-700 hover:text-teal-800 flex items-center gap-1"
          >
            <span>View All Passports</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-500 font-mono text-[11px] border-b border-slate-200">
              <tr>
                <th className="py-2.5 px-4 font-semibold">Analysis ID</th>
                <th className="py-2.5 px-4 font-semibold">Drug Candidate</th>
                <th className="py-2.5 px-4 font-semibold">Biological System</th>
                <th className="py-2.5 px-4 font-semibold">Risk Signal</th>
                <th className="py-2.5 px-4 font-semibold">Model Agreement</th>
                <th className="py-2.5 px-4 font-semibold">Evidence Strength</th>
                <th className="py-2.5 px-4 font-semibold">Date</th>
                <th className="py-2.5 px-4 font-semibold">Status</th>
                <th className="py-2.5 px-4 font-semibold text-right">Passport</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {analyses.map(item => (
                <tr key={item.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-3 px-4 font-mono font-bold text-slate-900">
                    {item.id}
                  </td>
                  <td className="py-3 px-4">
                    <div className="font-semibold text-slate-900">{item.drugName}</div>
                    <div className="text-[10px] font-mono text-slate-400">{item.drugId}</div>
                  </td>
                  <td className="py-3 px-4">
                    <span className="font-medium text-slate-800">{item.biologicalSystem}</span>
                    <span className="text-[10px] block text-slate-400 font-mono">Dataset {item.datasetVersion}</span>
                  </td>
                  <td className="py-3 px-4">
                    <span className={`inline-flex items-center px-2 py-0.5 rounded text-[11px] font-mono font-bold ${
                      item.consensusRiskSignal === 'High'
                        ? 'bg-amber-100 text-amber-900 border border-amber-300'
                        : item.consensusRiskSignal === 'Moderate'
                        ? 'bg-amber-50 text-amber-800 border border-amber-200'
                        : 'bg-teal-50 text-teal-800 border border-teal-200'
                    }`}>
                      {item.consensusRiskSignal} Risk Signal
                    </span>
                  </td>
                  <td className="py-3 px-4 font-mono font-semibold text-slate-800">
                    {item.modelAgreement}
                  </td>
                  <td className="py-3 px-4">
                    <span className="font-mono text-slate-800 font-semibold">{item.evidenceStrength}</span>
                  </td>
                  <td className="py-3 px-4 font-mono text-slate-500 text-[11px]">
                    {item.completedAt.split(' ')[0]}
                  </td>
                  <td className="py-3 px-4">
                    <span className="inline-flex items-center gap-1 text-[11px] text-emerald-700 font-medium">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                      Sealed
                    </span>
                  </td>
                  <td className="py-3 px-4 text-right">
                    <button
                      onClick={() => onNavigate('passport', item.passportId)}
                      className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-teal-50 hover:bg-teal-100 text-teal-800 font-mono text-[11px] font-bold border border-teal-200 transition-colors"
                    >
                      <span>{item.passportId}</span>
                      <ArrowUpRight className="w-3 h-3" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Bottom Mandate Statement (Section 39) */}
      <div className="p-6 bg-slate-900 border border-slate-800 rounded-xl text-white text-center space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-teal-950/80 border border-teal-700/60 rounded-full text-xs font-mono text-teal-300">
          <ShieldCheck className="w-3.5 h-3.5 text-teal-400" />
          <span>CYGEN VAULT PLATFORM MANDATE</span>
        </div>

        <div className="max-w-2xl mx-auto space-y-2">
          <h4 className="text-base font-bold text-slate-100">
            Drug Intelligence + Biological Evidence + AI/ML + Cybersecurity
          </h4>
          <div className="text-teal-400 text-xs font-mono">↓</div>
          <h4 className="text-base font-bold text-teal-300">
            Secure Computational Evidence
          </h4>
          <div className="text-teal-400 text-xs font-mono">↓</div>
          <h4 className="text-base font-bold text-emerald-400">
            Experimental Prioritization
          </h4>
        </div>

        <p className="text-xs text-slate-400 max-w-2xl mx-auto leading-relaxed border-t border-slate-800 pt-4">
          &ldquo;CYGEN VAULT does not replace the laboratory. It creates a secure, traceable computational evidence layer that helps researchers understand what should be investigated next.&rdquo;
        </p>
      </div>
    </div>
  );
};
