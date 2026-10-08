import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Bell, 
  User as UserIcon, 
  LogOut, 
  RotateCcw, 
  Menu, 
  X, 
  CheckCircle2, 
  ChevronDown
} from 'lucide-react';
import { User, UserRole } from '../../types';
import { CygenVaultStorage } from '../../services/storage';

interface Props {
  currentUser: User;
  onLogout: () => void;
  onRoleChange: (newRole: UserRole) => void;
  onResetDemo: () => void;
  mobileMenuOpen: boolean;
  setMobileMenuOpen: (open: boolean) => void;
}

export const Header: React.FC<Props> = ({
  currentUser,
  onLogout,
  onRoleChange,
  onResetDemo,
  mobileMenuOpen,
  setMobileMenuOpen
}) => {
  const [showRoleMenu, setShowRoleMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  const roles: UserRole[] = ['Researcher', 'Administrator', 'Reviewer', 'Viewer'];

  const roleColors: Record<UserRole, string> = {
    Administrator: 'bg-purple-100 text-purple-800 border-purple-200',
    Researcher: 'bg-teal-100 text-teal-800 border-teal-200',
    Reviewer: 'bg-blue-100 text-blue-800 border-blue-200',
    Viewer: 'bg-slate-100 text-slate-700 border-slate-200'
  };

  const notifications = [
    { id: 1, title: 'Integrity Check Passed', desc: 'Passport EVP-2026-0001 SHA-256 signature verified.', time: '5m ago' },
    { id: 2, title: 'AS GARDIAN Sample Ready', desc: 'Sample AG-S001 DNA + RNA quality metrics indexed.', time: '1h ago' },
    { id: 3, title: 'Model Ensemble Update', desc: 'Ensemble ML-2026.10 loaded with 4 active classifiers.', time: '2h ago' }
  ];

  return (
    <header className="sticky top-0 z-30 bg-slate-900 border-b border-slate-800 text-white shadow-sm">
      <div className="px-4 lg:px-6 h-16 flex items-center justify-between">
        {/* Left: Mobile hamburger & Logo */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-1.5 text-slate-300 hover:text-white hover:bg-slate-800 rounded-md transition-colors"
            aria-label="Toggle navigation"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>

          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-lg bg-teal-600 flex items-center justify-center text-white shadow-xs">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold tracking-wider text-base text-white">
                  CYGEN<span className="text-teal-400">VAULT</span>
                </span>
                <span className="text-[10px] uppercase font-mono px-1.5 py-0.5 rounded bg-slate-800 text-teal-300 border border-teal-900/40">
                  v1.0 Pro
                </span>
              </div>
              <div className="hidden sm:block text-[11px] text-slate-400 font-mono">
                Secure Computational Evidence Platform
              </div>
            </div>
          </div>
        </div>

        {/* Center/Right: Security status badge */}
        <div className="hidden md:flex items-center gap-2 px-3 py-1 bg-slate-800/80 border border-slate-700 rounded-full text-xs font-mono">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
          <span className="text-slate-300">INTEGRITY:</span>
          <span className="text-emerald-400 font-semibold">SHA-256 SEALED</span>
          <span className="text-slate-500">|</span>
          <span className="text-slate-400">RBAC ACTIVE</span>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-2.5 sm:gap-4">
          {/* Reset Demo Database */}
          <button
            onClick={onResetDemo}
            title="Reset to default synthetic demo state"
            className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 text-xs text-slate-400 hover:text-slate-200 bg-slate-800/60 hover:bg-slate-800 border border-slate-700/60 rounded-md transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Demo</span>
          </button>

          {/* Notifications Dropdown */}
          <div className="relative">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="p-1.5 text-slate-300 hover:text-white hover:bg-slate-800 rounded-md transition-colors relative"
              aria-label="Notifications"
            >
              <Bell className="w-4 h-4" />
              <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-teal-400"></span>
            </button>

            {showNotifications && (
              <div className="absolute right-0 mt-2 w-80 bg-white border border-slate-200 rounded-lg shadow-xl text-slate-800 py-2 z-50 animate-in fade-in zoom-in-95">
                <div className="px-3 py-2 border-b border-slate-100 flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-800 uppercase tracking-wide">
                    System Notifications
                  </span>
                  <span className="text-[10px] text-teal-600 bg-teal-50 px-2 py-0.5 rounded font-mono">
                    3 New
                  </span>
                </div>
                <div className="divide-y divide-slate-100 max-h-64 overflow-y-auto">
                  {notifications.map(n => (
                    <div key={n.id} className="p-3 hover:bg-slate-50 transition-colors">
                      <div className="flex items-center justify-between text-xs font-semibold text-slate-900">
                        <span>{n.title}</span>
                        <span className="text-[10px] text-slate-400 font-normal">{n.time}</span>
                      </div>
                      <p className="text-xs text-slate-600 mt-1">{n.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* User Profile & Role Switcher */}
          <div className="relative">
            <button
              onClick={() => setShowRoleMenu(!showRoleMenu)}
              className="flex items-center gap-2 p-1.5 sm:px-2.5 sm:py-1 rounded-md hover:bg-slate-800 transition-colors text-left"
            >
              <div className="w-7 h-7 rounded-full bg-teal-800/80 border border-teal-500/40 flex items-center justify-center text-teal-200 text-xs font-bold">
                {currentUser.name.charAt(0)}
              </div>
              <div className="hidden sm:block text-xs">
                <div className="font-semibold text-slate-200 leading-tight flex items-center gap-1.5">
                  {currentUser.name}
                  <ChevronDown className="w-3 h-3 text-slate-400" />
                </div>
                <div className="flex items-center gap-1 mt-0.5">
                  <span className={`text-[10px] px-1.5 py-0.2 rounded border font-mono ${roleColors[currentUser.role]}`}>
                    {currentUser.role}
                  </span>
                </div>
              </div>
            </button>

            {showRoleMenu && (
              <div className="absolute right-0 mt-2 w-64 bg-white border border-slate-200 rounded-lg shadow-xl text-slate-800 py-2 z-50">
                <div className="px-3 py-2 border-b border-slate-100">
                  <div className="text-xs font-bold text-slate-900">{currentUser.name}</div>
                  <div className="text-[11px] text-slate-500 font-mono">{currentUser.email}</div>
                  <div className="text-[11px] text-slate-400 mt-0.5">{currentUser.department}</div>
                </div>

                <div className="p-2">
                  <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider px-2 py-1">
                    Simulate Role (RBAC Testing)
                  </div>
                  {roles.map(r => (
                    <button
                      key={r}
                      onClick={() => {
                        onRoleChange(r);
                        setShowRoleMenu(false);
                      }}
                      className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded text-xs transition-colors ${
                        currentUser.role === r
                          ? 'bg-teal-50 text-teal-800 font-bold'
                          : 'text-slate-600 hover:bg-slate-100'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <span className={`w-2 h-2 rounded-full ${
                          r === 'Administrator' ? 'bg-purple-500' :
                          r === 'Researcher' ? 'bg-teal-500' :
                          r === 'Reviewer' ? 'bg-blue-500' : 'bg-slate-400'
                        }`}></span>
                        <span>{r}</span>
                      </div>
                      {currentUser.role === r && <CheckCircle2 className="w-3.5 h-3.5 text-teal-600" />}
                    </button>
                  ))}
                </div>

                <div className="pt-2 border-t border-slate-100 px-2">
                  <button
                    onClick={() => {
                      setShowRoleMenu(false);
                      onLogout();
                    }}
                    className="w-full flex items-center gap-2 px-2.5 py-1.5 text-xs text-red-600 hover:bg-red-50 rounded transition-colors"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                    <span>Log Out</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
