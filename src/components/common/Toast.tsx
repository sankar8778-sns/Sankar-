import React from 'react';
import { CheckCircle2, AlertTriangle, AlertCircle, Info, X } from 'lucide-react';

export interface ToastMessage {
  id: string;
  type: 'success' | 'warning' | 'error' | 'info';
  title: string;
  message?: string;
}

interface Props {
  toasts: ToastMessage[];
  onDismiss: (id: string) => void;
}

export const ToastContainer: React.FC<Props> = ({ toasts, onDismiss }) => {
  if (!toasts.length) return null;

  const icons = {
    success: <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />,
    warning: <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />,
    error: <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />,
    info: <Info className="w-4 h-4 text-teal-600 shrink-0" />
  };

  const borders = {
    success: 'border-emerald-200 bg-white',
    warning: 'border-amber-200 bg-white',
    error: 'border-red-200 bg-white',
    info: 'border-teal-200 bg-white'
  };

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2 max-w-sm w-full pointer-events-none">
      {toasts.map(toast => (
        <div
          key={toast.id}
          className={`pointer-events-auto p-3.5 rounded-lg border shadow-lg flex items-start gap-3 transition-all ${borders[toast.type]} animate-in slide-in-from-bottom-2`}
        >
          {icons[toast.type]}
          <div className="flex-1 text-xs">
            <div className="font-bold text-slate-800">{toast.title}</div>
            {toast.message && (
              <div className="text-slate-600 mt-0.5 leading-relaxed">{toast.message}</div>
            )}
          </div>
          <button
            onClick={() => onDismiss(toast.id)}
            className="text-slate-400 hover:text-slate-600 p-0.5"
            aria-label="Dismiss toast"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      ))}
    </div>
  );
};
