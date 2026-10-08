import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Lock, 
  User as UserIcon, 
  ArrowRight, 
  Key, 
  AlertCircle, 
  Sparkles,
  Shield
} from 'lucide-react';
import { User, UserRole } from '../types';
import { DEMO_USERS } from '../data/mockData';
import { DemoNoticeBadge } from '../components/common/DemoNoticeBadge';

interface Props {
  onLogin: (user: User) => void;
}

export const LoginPage: React.FC<Props> = ({ onLogin }) => {
  const [username, setUsername] = useState('researcher');
  const [password, setPassword] = useState('Demo@123');
  const [error, setError] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const found = DEMO_USERS.find(u => u.username.toLowerCase() === username.toLowerCase().trim());
    if (found && password.trim() === 'Demo@123') {
      onLogin(found);
    } else if (found) {
      // In prototype, allow password Demo@123
      setError('Invalid credentials. For the prototype demonstration, use password: Demo@123');
    } else {
      setError('User not recognized. Choose researcher, admin, reviewer, or viewer.');
    }
  };

  const handleQuickLogin = (user: User) => {
    setUsername(user.username);
    setPassword('Demo@123');
    onLogin(user);
  };

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col justify-center items-center p-4 relative overflow-hidden text-slate-100">
      {/* Subtle scientific grid / particle pattern */}
      <div className="absolute inset-0 opacity-15 pointer-events-none bg-[radial-gradient(#0d9488_1px,transparent_1px)] [background-size:24px_24px]"></div>

      <div className="relative z-10 w-full max-w-md space-y-6">
        {/* Logo and Branding Header */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-teal-600/30 border border-teal-500/50 text-teal-300 shadow-xl mb-2">
            <ShieldCheck className="w-8 h-8" />
          </div>

          <h1 className="text-2xl font-extrabold tracking-wider text-white">
            CYGEN<span className="text-teal-400">VAULT</span>
          </h1>

          <p className="text-xs text-teal-300/90 font-medium">
            &ldquo;Secure Biological Intelligence. Traceable Scientific Evidence.&rdquo;
          </p>

          <p className="text-[11px] text-slate-400 font-mono">
            Drug Intelligence + Biological Evidence + AI/ML + Cybersecurity
          </p>
        </div>

        {/* Login Box */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 lg:p-8 shadow-2xl backdrop-blur-md space-y-5">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <span className="text-xs font-mono font-bold uppercase text-slate-300">
              Researcher Authentication
            </span>
            <DemoNoticeBadge className="bg-slate-800 text-teal-400 border-slate-700" />
          </div>

          {error && (
            <div className="p-3 bg-red-950/60 border border-red-800 rounded-lg text-xs text-red-200 flex items-start gap-2">
              <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4 text-xs">
            <div>
              <label className="block text-[11px] font-semibold text-slate-300 mb-1">
                Username / Identifier
              </label>
              <div className="relative">
                <UserIcon className="w-4 h-4 text-slate-500 absolute left-3 top-2.5" />
                <input
                  type="text"
                  value={username}
                  onChange={e => setUsername(e.target.value)}
                  required
                  placeholder="researcher"
                  className="w-full pl-9 pr-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-slate-100 placeholder-slate-600 focus:outline-hidden focus:border-teal-500 font-mono"
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-slate-300 mb-1">
                Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-500 absolute left-3 top-2.5" />
                <input
                  type="password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  required
                  placeholder="Demo@123"
                  className="w-full pl-9 pr-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-slate-100 placeholder-slate-600 focus:outline-hidden focus:border-teal-500 font-mono"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-2.5 px-4 rounded-lg bg-teal-500 hover:bg-teal-400 text-slate-950 font-extrabold text-xs transition-colors flex items-center justify-center gap-2 shadow-xs cursor-pointer"
            >
              <span>ACCESS RESEARCH VAULT</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          {/* Quick Demo Switcher */}
          <div className="pt-4 border-t border-slate-800 space-y-2">
            <div className="flex items-center justify-between text-[10px] font-mono text-slate-400 uppercase">
              <span>Prototype 1-Click Access</span>
              <span className="text-teal-400">Password: Demo@123</span>
            </div>

            <div className="grid grid-cols-2 gap-2">
              {DEMO_USERS.map(u => (
                <button
                  key={u.id}
                  onClick={() => handleQuickLogin(u)}
                  className="p-2 rounded-lg bg-slate-850 hover:bg-slate-800 border border-slate-800 hover:border-slate-700 text-left transition-colors cursor-pointer"
                >
                  <div className="font-semibold text-xs text-slate-200">{u.username}</div>
                  <div className="text-[10px] font-mono text-teal-400">{u.role}</div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Footer Disclaimer */}
        <div className="text-center text-[11px] text-slate-500 space-y-1">
          <p>
            CYGEN VAULT Prototype v1.0 • FIPS SHA-256 Sealed Records
          </p>
          <p className="text-[10px] text-slate-600">
            Computational decision-support platform. Not for direct clinical diagnosis or therapeutic certification.
          </p>
        </div>
      </div>
    </div>
  );
};
