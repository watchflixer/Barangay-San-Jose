import React from 'react';
import { X, History, MapPin } from 'lucide-react';
import { HazardAlert } from '../types';

interface HistoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  alerts: HazardAlert[];
}

export const HistoryModal: React.FC<HistoryModalProps> = ({
  isOpen,
  onClose,
  alerts,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-in fade-in duration-150">
      <div className="relative w-full max-w-2xl rounded-2xl bg-white shadow-2xl border border-slate-200 overflow-hidden max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50">
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-lg bg-indigo-50 text-indigo-600">
              <History className="w-5 h-5" />
            </span>
            <div>
              <h2 className="text-base font-bold text-slate-800">Incident History & Audit Log</h2>
              <p className="text-xs text-slate-500">Barangay San Jose Complete Incident Records</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* History List */}
        <div className="p-6 overflow-y-auto space-y-3 custom-scrollbar flex-1">
          {alerts.map((alert) => {
            const isResolved = alert.status === 'resolved';
            return (
              <div
                key={alert.id}
                className="p-4 rounded-xl border border-slate-200 bg-white space-y-2 hover:shadow-xs transition-all"
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-mono font-bold text-slate-400 bg-slate-100 px-1.5 py-0.5 rounded">
                        #{alert.id}
                      </span>
                      <h3 className="text-xs font-bold text-slate-800">{alert.title}</h3>
                    </div>
                    <div className="flex items-center gap-2 text-[11px] text-slate-500">
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-blue-500" />
                        {alert.sitio} • {alert.streetName}
                      </span>
                    </div>
                  </div>
                  <span
                    className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                      isResolved
                        ? 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                        : 'bg-rose-100 text-rose-800 border border-rose-200'
                    }`}
                  >
                    {alert.status}
                  </span>
                </div>

                <p className="text-xs text-slate-600 leading-relaxed">{alert.description}</p>

                <div className="flex items-center justify-between text-[11px] text-slate-400 pt-2 border-t border-slate-100">
                  <span>Reported: {alert.timeReported}</span>
                  {alert.reportedBy && <span>By: {alert.reportedBy}</span>}
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-100 bg-slate-50 text-right">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold"
          >
            Close History
          </button>
        </div>
      </div>
    </div>
  );
};
