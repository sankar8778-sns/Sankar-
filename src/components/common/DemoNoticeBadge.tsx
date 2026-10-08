import React from 'react';
import { Database } from 'lucide-react';

interface Props {
  text?: string;
  className?: string;
}

export const DemoNoticeBadge: React.FC<Props> = ({ 
  text = 'SYNTHETIC / PUBLIC / ILLUSTRATIVE DEMO DATA',
  className = ''
}) => {
  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded text-[11px] font-mono font-medium bg-slate-100 text-slate-700 border border-slate-300 ${className}`}>
      <Database className="w-3 h-3 text-slate-500" />
      <span>{text}</span>
    </span>
  );
};
