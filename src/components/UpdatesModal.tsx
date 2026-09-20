import React from 'react';
import { X, BellRing, MapPin, PlusCircle, Radio } from 'lucide-react';
import { HazardAlert } from '../types';

interface UpdatesModalProps {
  isOpen: boolean;
  onClose: () => void;
  alerts: HazardAlert[];
  onOpenReportModal: () => void;
  onOpenLiveModal: () => void;
  hasLiveUrl: boolean;
}

export const UpdatesModal: React.FC<UpdatesModalProps> = ({
  isOpen,
  onClose,
  alerts,
  onOpenReportModal,
  onOpenLiveModal,
  hasLiveUrl,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-in fade-in duration-150">
      <div className="relative w-full max-w-xl rounded-2xl bg-white shadow-2xl border border-slate-200 overflow-hidden max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50">
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-lg bg-blue-50 text-blue-600">
              <BellRing className="w-5 h-5" />
            </span>
            <div>
              <h2 className="text-base font-bold text-slate-800">Live Situation Updates</h2>
              <p className="text-xs text-slate-500">Real-Time Community & Weather Activity</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Updates List */}
        <div className="p-6 overflow-y-auto space-y-3 custom-scrollbar flex-1">
          {alerts.map((alert) => (
            <div
              key={alert.id}
              className="p-4 rounded-xl border border-slate-200 bg-white hover:shadow-xs transition-all space-y-1.5"
            >
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span
                    className={`p-1 rounded-md text-[10px] font-bold uppercase ${
                      alert.status === 'resolved'
                        ? 'bg-emerald-100 text-emerald-800'
                        : 'bg-rose-100 text-rose-800'
                    }`}
                  >
                    {alert.status}
                  </span>
                  <span className="text-xs font-bold text-slate-800">{alert.title}</span>
                </div>
                <span className="text-[11px] text-slate-400 font-mono">{alert.timeReported}</span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">{alert.description}</p>
              <div className="flex items-center gap-3 text-[11px] text-slate-500 pt-1">
                <span className="flex items-center gap-1">
                  <MapPin className="w-3 h-3 text-blue-500" />
                  {alert.sitio} ({alert.streetName})
                </span>
                {alert.reportedBy && (
                  <span className="text-slate-400">• By {alert.reportedBy}</span>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Footer Actions */}
        <div className="p-4 border-t border-slate-100 bg-slate-50 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <button
              onClick={onOpenReportModal}
              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold shadow-xs"
            >
              <PlusCircle className="w-3.5 h-3.5" />
              <span>Report Hazard</span>
            </button>
            {hasLiveUrl && (
              <button
                onClick={onOpenLiveModal}
                className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-red-600 hover:bg-red-500 text-white text-xs font-semibold shadow-xs"
              >
                <Radio className="w-3.5 h-3.5" />
                <span>Watch Stream</span>
              </button>
            )}
          </div>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-slate-200 hover:bg-slate-300 text-slate-700 text-xs font-semibold"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
