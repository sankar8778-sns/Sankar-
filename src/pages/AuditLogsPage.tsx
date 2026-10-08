import React, { useState } from 'react';
import { 
  History, 
  Search, 
  Filter, 
  Download, 
  CheckCircle2, 
  AlertTriangle, 
  XCircle, 
  Calendar, 
  ShieldCheck, 
  FileText 
} from 'lucide-react';
import { AuditLog } from '../types';
import { DemoNoticeBadge } from '../components/common/DemoNoticeBadge';
import { ScientificDisclaimer } from '../components/common/ScientificDisclaimer';

interface Props {
  logs: AuditLog[];
}

export const AuditLogsPage: React.FC<Props> = ({ logs }) => {
  const [search, setSearch] = useState('');
  const [actionFilter, setActionFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');

  const actions = [
    'All',
    'Login',
    'Logout',
    'Analysis Execution',
    'Evidence Passport Creation',
    'Evidence Verification',
    'Report Generation',
    'Data Creation',
    'Data Modification',
    'Data Deletion/Archive',
    'Data Upload',
    'Role Change'
  ];

  const filteredLogs = logs.filter(log => {
    const matchesSearch = 
      log.user.toLowerCase().includes(search.toLowerCase()) ||
      log.id.toLowerCase().includes(search.toLowerCase()) ||
      log.resource.toLowerCase().includes(search.toLowerCase()) ||
      log.resourceId.toLowerCase().includes(search.toLowerCase()) ||
      log.details.toLowerCase().includes(search.toLowerCase());

    const matchesAction = actionFilter === 'All' || log.action === actionFilter;
    const matchesStatus = statusFilter === 'All' || log.status === statusFilter;

    return matchesSearch && matchesAction && matchesStatus;
  });

  const handleExportJson = () => {
    const blob = new Blob([JSON.stringify(logs, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `cygen-vault-audit-trail-${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const statusBadge = (status: string) => {
    switch (status) {
      case 'Success':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-emerald-50 text-emerald-800 border border-emerald-200">
            <CheckCircle2 className="w-3 h-3 text-emerald-600" /> Success
          </span>
        );
      case 'Warning':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-amber-50 text-amber-800 border border-amber-200">
            <AlertTriangle className="w-3 h-3 text-amber-600" /> Warning
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-red-50 text-red-800 border border-red-200">
            <XCircle className="w-3 h-3 text-red-600" /> Error
          </span>
        );
    }
  };

  return (
    <div className="space-y-5">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-200 gap-3">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
              <History className="w-5 h-5 text-teal-600" />
              Cryptographic Audit Log & Compliance Ledger
            </h1>
            <DemoNoticeBadge />
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Immutable traceability ledger recording all computational runs, modifications, verification events, and access.
          </p>
        </div>

        <button
          onClick={handleExportJson}
          className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs transition-colors shadow-xs"
        >
          <Download className="w-4 h-4" />
          <span>Export Audit Trail (JSON)</span>
        </button>
      </div>

      <ScientificDisclaimer compact />

      {/* Filter and Search Bar */}
      <div className="bg-white border border-slate-200 rounded-lg p-3.5 shadow-2xs flex flex-col md:flex-row md:items-center justify-between gap-3 text-xs">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search by event ID, user, resource, details..."
            className="w-full pl-9 pr-3 py-1.5 bg-slate-50 border border-slate-200 rounded-md focus:bg-white focus:outline-hidden focus:ring-1 focus:ring-teal-500 text-xs"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <div className="flex items-center gap-1.5">
            <span className="text-[11px] font-mono text-slate-500">Action:</span>
            <select
              value={actionFilter}
              onChange={e => setActionFilter(e.target.value)}
              className="px-2.5 py-1 bg-white border border-slate-200 rounded text-xs font-mono"
            >
              {actions.map(a => (
                <option key={a} value={a}>{a}</option>
              ))}
            </select>
          </div>

          <div className="flex items-center gap-1.5">
            <span className="text-[11px] font-mono text-slate-500">Status:</span>
            <select
              value={statusFilter}
              onChange={e => setStatusFilter(e.target.value)}
              className="px-2.5 py-1 bg-white border border-slate-200 rounded text-xs font-mono"
            >
              <option value="All">All</option>
              <option value="Success">Success</option>
              <option value="Warning">Warning</option>
              <option value="Error">Error</option>
            </select>
          </div>
        </div>
      </div>

      {/* Audit Log Table */}
      <div className="bg-white border border-slate-200 rounded-lg shadow-2xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-500 font-mono text-[11px] border-b border-slate-200">
              <tr>
                <th className="py-3 px-4 font-semibold">Event ID</th>
                <th className="py-3 px-4 font-semibold">Timestamp (UTC)</th>
                <th className="py-3 px-4 font-semibold">User & Role</th>
                <th className="py-3 px-4 font-semibold">Action</th>
                <th className="py-3 px-4 font-semibold">Resource Target</th>
                <th className="py-3 px-4 font-semibold">Status</th>
                <th className="py-3 px-4 font-semibold">IP Address</th>
                <th className="py-3 px-4 font-semibold">Event Details</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {filteredLogs.map(log => (
                <tr key={log.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-3 px-4 font-mono font-bold text-slate-900">
                    {log.id}
                  </td>
                  <td className="py-3 px-4 font-mono text-slate-500 text-[11px] whitespace-nowrap">
                    {log.timestamp}
                  </td>
                  <td className="py-3 px-4">
                    <span className="font-semibold text-slate-900 block">{log.user}</span>
                    <span className="text-[10px] font-mono text-slate-400">{log.role}</span>
                  </td>
                  <td className="py-3 px-4 font-mono font-semibold text-slate-800">
                    {log.action}
                  </td>
                  <td className="py-3 px-4">
                    <span className="font-mono text-slate-800">{log.resource}</span>
                    <span className="text-[10px] font-mono text-teal-700 block">{log.resourceId}</span>
                  </td>
                  <td className="py-3 px-4">
                    {statusBadge(log.status)}
                  </td>
                  <td className="py-3 px-4 font-mono text-slate-400 text-[10px]">
                    {log.ipAddress}
                  </td>
                  <td className="py-3 px-4 text-xs max-w-sm text-slate-600">
                    {log.details}
                  </td>
                </tr>
              ))}

              {filteredLogs.length === 0 && (
                <tr>
                  <td colSpan={8} className="py-12 text-center text-xs text-slate-400">
                    No audit records match the selected filter criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
