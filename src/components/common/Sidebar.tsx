import React from 'react';
import { 
  LayoutDashboard, 
  Pill, 
  Dna, 
  FlaskConical, 
  Crosshair, 
  Layers, 
  Cpu, 
  AlertTriangle, 
  Globe2, 
  FileCheck, 
  ShieldCheck, 
  History, 
  FileText, 
  Settings, 
  Play, 
  ChevronRight,
  Shield
} from 'lucide-react';
import { UserRole } from '../../types';

export type NavTabId = 
  | 'dashboard'
  | 'drugs'
  | 'biological'
  | 'lab-records'
  | 'target-pathway'
  | 'multi-omics'
  | 'ai-ml'
  | 'risk-evidence'
  | 'cross-system'
  | 'passport'
  | 'integrity'
  | 'audit-logs'
  | 'reports'
  | 'settings'
  | 'analysis-wizard';

interface Props {
  activeTab: NavTabId;
  setActiveTab: (tab: NavTabId) => void;
  userRole: UserRole;
  mobileMenuOpen: boolean;
  setMobileMenuOpen: (open: boolean) => void;
}

export const Sidebar: React.FC<Props> = ({
  activeTab,
  setActiveTab,
  userRole,
  mobileMenuOpen,
  setMobileMenuOpen
}) => {
  const navItems = [
    { id: 'dashboard' as NavTabId, label: 'Dashboard', icon: LayoutDashboard, group: 'Overview' },
    { id: 'analysis-wizard' as NavTabId, label: 'Start Analysis', icon: Play, group: 'Workflow', highlight: true },
    { id: 'drugs' as NavTabId, label: 'Drug Registry', icon: Pill, group: 'Data Repository' },
    { id: 'biological' as NavTabId, label: 'Biological Profiles', icon: Dna, group: 'Data Repository' },
    { id: 'lab-records' as NavTabId, label: 'AS GARDIAN Lab Records', icon: FlaskConical, group: 'Data Repository' },
    { id: 'target-pathway' as NavTabId, label: 'Target & Pathway Analysis', icon: Crosshair, group: 'Computational Modules' },
    { id: 'multi-omics' as NavTabId, label: 'Multi-Omics Evidence', icon: Layers, group: 'Computational Modules' },
    { id: 'ai-ml' as NavTabId, label: 'AI/ML Analysis', icon: Cpu, group: 'Computational Modules' },
    { id: 'risk-evidence' as NavTabId, label: 'Risk & Evidence', icon: AlertTriangle, group: 'Computational Modules' },
    { id: 'cross-system' as NavTabId, label: 'Cross-System Comparison', icon: Globe2, group: 'Computational Modules' },
    { id: 'passport' as NavTabId, label: 'Evidence Passport', icon: FileCheck, group: 'Trust & Cryptography' },
    { id: 'integrity' as NavTabId, label: 'Integrity Verification', icon: ShieldCheck, group: 'Trust & Cryptography' },
    { id: 'audit-logs' as NavTabId, label: 'Audit Logs', icon: History, group: 'Compliance & Governance' },
    { id: 'reports' as NavTabId, label: 'Reports', icon: FileText, group: 'Compliance & Governance' },
    { id: 'settings' as NavTabId, label: 'Settings', icon: Settings, group: 'System' }
  ];

  const handleSelect = (tab: NavTabId) => {
    setActiveTab(tab);
    setMobileMenuOpen(false);
  };

  return (
    <>
      {/* Mobile Backdrop */}
      {mobileMenuOpen && (
        <div 
          onClick={() => setMobileMenuOpen(false)}
          className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs z-40 lg:hidden"
        />
      )}

      {/* Sidebar Container */}
      <aside className={`
        fixed lg:sticky top-0 lg:top-16 left-0 z-40 lg:z-10
        w-64 h-full lg:h-[calc(100vh-4rem)]
        bg-slate-900 text-slate-300
        border-r border-slate-800
        flex flex-col justify-between
        transition-transform duration-200 ease-in-out
        ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        {/* Navigation list */}
        <div className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
          {/* Mobile title */}
          <div className="lg:hidden px-3 pb-3 mb-2 border-b border-slate-800 flex items-center justify-between">
            <span className="font-bold text-white text-sm">Navigation</span>
            <span className="text-[10px] font-mono bg-teal-900 text-teal-300 px-2 py-0.5 rounded">
              {userRole}
            </span>
          </div>

          {navItems.map((item, index) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            const isHighlight = item.highlight;
            const prevItem = index > 0 ? navItems[index - 1] : null;
            const showGroupHeader = !prevItem || prevItem.group !== item.group;

            return (
              <React.Fragment key={item.id}>
                {showGroupHeader && (
                  <div className="text-[10px] font-mono uppercase tracking-wider text-slate-400 font-semibold px-3 pt-3 pb-1">
                    {item.group}
                  </div>
                )}
                <button
                  type="button"
                  onClick={() => handleSelect(item.id)}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-md text-xs font-medium transition-all group cursor-pointer ${
                    isActive
                      ? 'bg-teal-600 text-white font-semibold shadow-xs'
                      : isHighlight
                      ? 'bg-gradient-to-r from-teal-900/80 to-slate-800 text-teal-200 border border-teal-500/30 hover:border-teal-500/60'
                      : 'text-slate-300 hover:text-white hover:bg-slate-800/80'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon className={`w-4 h-4 transition-colors ${
                      isActive ? 'text-white' : isHighlight ? 'text-teal-400' : 'text-slate-400 group-hover:text-slate-200'
                    }`} />
                    <span className="truncate">{item.label}</span>
                  </div>
                  {isActive && <ChevronRight className="w-3.5 h-3.5 text-white/70" />}
                  {isHighlight && !isActive && (
                    <span className="w-2 h-2 rounded-full bg-teal-400 animate-ping"></span>
                  )}
                </button>
              </React.Fragment>
            );
          })}
        </div>

        {/* Bottom Platform Info Box */}
        <div className="p-3 border-t border-slate-800/90 bg-slate-950/60">
          <div className="p-2.5 rounded-md bg-slate-900/90 border border-slate-800 text-[11px] space-y-1">
            <div className="flex items-center gap-1.5 text-slate-300 font-semibold">
              <Shield className="w-3.5 h-3.5 text-teal-400" />
              <span>CYGEN VAULT Core</span>
            </div>
            <div className="text-[10px] text-slate-400 font-mono">
              Engine: <span className="text-slate-300">Prototype ML-2026.10</span>
            </div>
            <div className="text-[10px] text-slate-400 font-mono">
              Database: <span className="text-slate-300">Relational SQLite Model</span>
            </div>
            <div className="text-[10px] text-teal-400 font-mono flex items-center gap-1 pt-0.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
              SHA-256 Hash Guard Active
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};
