import React, { useState } from 'react';
import { 
  Settings, 
  User as UserIcon, 
  Shield, 
  Cpu, 
  Database, 
  RotateCcw, 
  CheckCircle2, 
  Lock, 
  Key, 
  Sliders, 
  Info 
} from 'lucide-react';
import { User, UserRole } from '../types';
import { CygenVaultStorage } from '../services/storage';
import { DemoNoticeBadge } from '../components/common/DemoNoticeBadge';
import { ScientificDisclaimer } from '../components/common/ScientificDisclaimer';

interface Props {
  currentUser: User;
  onRoleChange: (newRole: UserRole) => void;
  onResetDemo: () => void;
}

export const SettingsPage: React.FC<Props> = ({
  currentUser,
  onRoleChange,
  onResetDemo
}) => {
  const [selectedRole, setSelectedRole] = useState<UserRole>(currentUser.role);
  const [saveToast, setSaveToast] = useState(false);

  const handleRoleSelect = (role: UserRole) => {
    setSelectedRole(role);
    onRoleChange(role);
    setSaveToast(true);
    setTimeout(() => setSaveToast(false), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-200 gap-3">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
              <Settings className="w-5 h-5 text-teal-600" />
              Platform Settings & System Information
            </h1>
            <DemoNoticeBadge />
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Role-based permissions, cryptographic parameters, model configuration, and environment status.
          </p>
        </div>

        {saveToast && (
          <div className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-50 text-emerald-800 border border-emerald-200 rounded-md text-xs font-mono">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>Settings Updated</span>
          </div>
        )}
      </div>

      <ScientificDisclaimer compact />

      {/* Main Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* User Profile & Role Settings */}
        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-2xs space-y-4">
          <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
            <UserIcon className="w-4 h-4 text-teal-600" />
            <h2 className="text-xs font-bold text-slate-900 uppercase tracking-wide">
              Active User Session & Role (RBAC)
            </h2>
          </div>

          <div className="p-3 bg-slate-50 rounded-lg border border-slate-100 text-xs space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-slate-500">Name:</span>
              <strong className="text-slate-900">{currentUser.name}</strong>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-500">Username:</span>
              <span className="font-mono text-slate-800">{currentUser.username}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-500">Email:</span>
              <span className="font-mono text-slate-800">{currentUser.email}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-500">Department:</span>
              <span className="text-slate-800">{currentUser.department}</span>
            </div>
          </div>

          <div className="space-y-2 text-xs">
            <span className="text-[10px] font-mono text-slate-400 uppercase block font-semibold">
              Simulate Role-Based Access Control (RBAC)
            </span>

            <div className="grid grid-cols-2 gap-2">
              {(['Administrator', 'Researcher', 'Reviewer', 'Viewer'] as UserRole[]).map(r => (
                <button
                  key={r}
                  onClick={() => handleRoleSelect(r)}
                  className={`p-2.5 rounded-lg border text-left transition-all ${
                    currentUser.role === r
                      ? 'bg-teal-50 border-teal-500 text-teal-900 font-bold ring-1 ring-teal-500/30'
                      : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <div className="text-xs">{r}</div>
                  <div className="text-[10px] text-slate-400 mt-0.5">
                    {r === 'Administrator' ? 'Full Access' :
                     r === 'Researcher' ? 'Create & Analyze' :
                     r === 'Reviewer' ? 'Inspect & Review' : 'Read-Only'}
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Security & Hashing Architecture */}
        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-2xs space-y-4">
          <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
            <Shield className="w-4 h-4 text-emerald-600" />
            <h2 className="text-xs font-bold text-slate-900 uppercase tracking-wide">
              Cybersecurity & Cryptography Config
            </h2>
          </div>

          <div className="space-y-2 text-xs">
            <div className="p-3 bg-slate-50 rounded-lg border border-slate-100 space-y-1">
              <span className="text-[10px] font-mono text-slate-400 uppercase block">Integrity Hashing Algorithm</span>
              <span className="font-mono font-bold text-slate-900 text-xs">SHA-256 (FIPS PUB 180-4)</span>
              <p className="text-[11px] text-slate-500">WebCrypto API native accelerated with deterministic JSON canonicalization.</p>
            </div>

            <div className="p-3 bg-slate-50 rounded-lg border border-slate-100 space-y-1">
              <span className="text-[10px] font-mono text-slate-400 uppercase block">Password Hashing Layer</span>
              <span className="font-mono font-bold text-slate-900 text-xs">Argon2 / Secure Abstraction</span>
              <p className="text-[11px] text-slate-500">Production compliant PBKDF2/Argon2 password verification interface.</p>
            </div>

            <div className="p-3 bg-slate-50 rounded-lg border border-slate-100 space-y-1">
              <span className="text-[10px] font-mono text-slate-400 uppercase block">Audit Immutability</span>
              <span className="font-mono font-bold text-emerald-700 text-xs">Append-Only Ledger Active</span>
              <p className="text-[11px] text-slate-500">All session events, model executions, and data modifications cryptographically timestamped.</p>
            </div>
          </div>
        </div>

        {/* Section 32: System Information */}
        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-2xs space-y-4">
          <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
            <Cpu className="w-4 h-4 text-indigo-600" />
            <h2 className="text-xs font-bold text-slate-900 uppercase tracking-wide">
              System Specifications & Model Versions
            </h2>
          </div>

          <div className="divide-y divide-slate-100 text-xs font-mono">
            <div className="py-2 flex items-center justify-between">
              <span className="text-slate-500">Application Version</span>
              <strong className="text-slate-900">CYGEN VAULT v1.0 Prototype</strong>
            </div>
            <div className="py-2 flex items-center justify-between">
              <span className="text-slate-500">Analysis Engine</span>
              <strong className="text-slate-900">Prototype Computational Engine</strong>
            </div>
            <div className="py-2 flex items-center justify-between">
              <span className="text-slate-500">Model Suite</span>
              <strong className="text-slate-900">Ensemble ML-2026.10 (RF, SVM, LR, XGB)</strong>
            </div>
            <div className="py-2 flex items-center justify-between">
              <span className="text-slate-500">Database Engine</span>
              <strong className="text-slate-900">SQLite Prototype / Persistent Store</strong>
            </div>
            <div className="py-2 flex items-center justify-between">
              <span className="text-slate-500">Target Framework</span>
              <strong className="text-slate-900">React 19 + TypeScript + Tailwind CSS</strong>
            </div>
          </div>
        </div>

        {/* Database Management & Demo Reset */}
        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-2xs space-y-4">
          <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
            <Database className="w-4 h-4 text-amber-600" />
            <h2 className="text-xs font-bold text-slate-900 uppercase tracking-wide">
              Database Maintenance
            </h2>
          </div>

          <p className="text-xs text-slate-600 leading-relaxed">
            Resetting the database restores the initial demonstration records for Demo Compound A (DG-001), Human Reference AG-S001, completed analysis AN-0001, and sealed Evidence Passport EVP-2026-0001.
          </p>

          <div className="pt-2">
            <button
              onClick={onResetDemo}
              className="flex items-center gap-2 px-4 py-2 bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-300 rounded-lg text-xs font-semibold transition-colors"
            >
              <RotateCcw className="w-4 h-4 text-amber-700" />
              <span>Reset Database to Baseline Demo State</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
