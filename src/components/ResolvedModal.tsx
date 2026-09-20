import React from 'react';
import { X, CheckCircle2, MapPin, ArrowUpRight, ShieldCheck, Filter } from 'lucide-react';
import { HazardAlert } from '../types';

interface ResolvedModalProps {
  isOpen: boolean;
  onClose: () => void;
  resolvedAlerts: HazardAlert[];
  onFilterToResolved: () => void;
  onSelectAlert: (alert: HazardAlert | null) => void;
}

export const ResolvedModal: React.FC<ResolvedModalProps> = ({
  isOpen,
  onClose,
  resolvedAlerts,
  onFilterToResolved,
  onSelectAlert,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-in fade-in duration-150">
      <div className="relative w-full max-w-xl rounded-2xl bg-white shadow-2xl border border-slate-200 overflow-hidden max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50">
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-lg bg-emerald-50 text-emerald-600">
              <CheckCircle2 className="w-5 h-5" />
            </span>
            <div>
              <h2 className="text-base font-bold text-slate-800">Resolved & Cleared Hazards</h2>
              <p className="text-xs text-slate-500">
                {resolvedAlerts.length} incidents marked as resolved
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-3 custom-scrollbar flex-1">
          {resolvedAlerts.length === 0 ? (
            <div className="p-8 text-center text-slate-400">
              <ShieldCheck className="w-10 h-10 mx-auto mb-2 text-slate-300" />
              <p className="text-sm font-semibold">No resolved incidents yet</p>
              <p className="text-xs text-slate-400 mt-1">
                Active incidents marked as cleared will appear in this archive.
              </p>
            </div>
          ) : (
            resolvedAlerts.map((alert) => (
              <div
                key={alert.id}
                onClick={() => {
                  onSelectAlert(alert);
                  onClose();
                }}
                className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 hover:bg-white hover:border-emerald-300 hover:shadow-xs cursor-pointer transition-all space-y-1.5 group"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-800 group-hover:text-emerald-700 transition-colors">
                    {alert.title}
                  </span>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-semibold">
                    Cleared
                  </span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">{alert.description}</p>
                <div className="flex items-center justify-between text-[11px] text-slate-400 pt-1">
                  <span className="flex items-center gap-1 text-slate-500">
                    <MapPin className="w-3 h-3 text-emerald-500" />
                    {alert.sitio} ({alert.streetName})
                  </span>
                  <span className="flex items-center gap-1 text-emerald-600 font-semibold group-hover:translate-x-0.5 transition-transform">
                    <span>View on Map</span>
                    <ArrowUpRight className="w-3 h-3" />
                  </span>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-100 bg-slate-50 flex items-center justify-between">
          <button
            onClick={() => {
              onFilterToResolved();
              onClose();
            }}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold shadow-xs transition-colors"
          >
            <Filter className="w-3.5 h-3.5" />
            <span>Filter Map to Resolved</span>
          </button>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-slate-200 hover:bg-slate-300 text-slate-700 text-xs font-semibold"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
