import React, { useState } from 'react';
import {
  Search,
  X,
  Radio,
  PlusCircle,
  PhoneCall,
  MapPin,
  AlertCircle,
  Waves,
  Flame,
  Zap,
  Droplets,
  AlertTriangle,
  HelpCircle,
  ShieldAlert
} from 'lucide-react';
import { HazardAlert, HazardType, HazardStatus } from '../types';

interface SidebarProps {
  alerts: HazardAlert[];
  selectedAlert: HazardAlert | null;
  onSelectAlert: (alert: HazardAlert | null) => void;
  onToggleAlertStatus: (id: string) => void;
  onOpenReportModal: () => void;
  onOpenHotlinesModal: () => void;
  activeFilterType: HazardType | 'all';
  setActiveFilterType: (type: HazardType | 'all') => void;
  activeFilterStatus: HazardStatus | 'all';
  setActiveFilterStatus: (status: HazardStatus | 'all') => void;
  liveUrl?: string;
  onOpenLiveModal?: () => void;
  onRemoveLive?: () => void;
  onClose?: () => void;
}

const TYPE_ICONS: Record<string, React.ReactNode> = {
  flood: <Waves className="w-4 h-4 text-blue-400" />,
  fire: <Flame className="w-4 h-4 text-rose-400" />,
  power_outage: <Zap className="w-4 h-4 text-amber-400" />,
  water_outage: <Droplets className="w-4 h-4 text-cyan-400" />,
  road_obstruction: <AlertTriangle className="w-4 h-4 text-orange-400" />,
  other: <HelpCircle className="w-4 h-4 text-purple-400" />,
};

const FILTER_BUTTONS: { type: HazardType | 'all'; label: string }[] = [
  { type: 'all', label: 'All Hazards' },
  { type: 'flood', label: 'Flood' },
  { type: 'fire', label: 'Fire' },
  { type: 'road_obstruction', label: 'Road' },
  { type: 'power_outage', label: 'Power' },
  { type: 'water_outage', label: 'Water' },
];

export const Sidebar: React.FC<SidebarProps> = ({
  alerts,
  selectedAlert,
  onSelectAlert,
  onToggleAlertStatus,
  onOpenReportModal,
  onOpenHotlinesModal,
  activeFilterType,
  setActiveFilterType,
  activeFilterStatus,
  setActiveFilterStatus,
  liveUrl,
  onOpenLiveModal,
  onRemoveLive,
  onClose,
}) => {
  const [searchTerm, setSearchTerm] = useState('');

  const activeCount = alerts.filter((a) => a.status === 'active').length;
  const resolvedCount = alerts.filter((a) => a.status === 'resolved').length;

  const filteredAlerts = alerts.filter((alert) => {
    if (activeFilterStatus !== 'all' && alert.status !== activeFilterStatus) return false;
    if (activeFilterType !== 'all' && alert.type !== activeFilterType) return false;
    if (searchTerm.trim()) {
      const q = searchTerm.toLowerCase();
      const matchTitle = alert.title.toLowerCase().includes(q);
      const matchSitio = alert.sitio.toLowerCase().includes(q);
      const matchStreet = alert.streetName.toLowerCase().includes(q);
      const matchDesc = alert.description.toLowerCase().includes(q);
      return matchTitle || matchSitio || matchStreet || matchDesc;
    }
    return true;
  });

  return (
    <div className="flex flex-col h-full bg-slate-900 text-slate-100 border-r border-slate-800 shadow-2xl overflow-hidden select-none">
      {/* Header & Search */}
      <div className="p-4 border-b border-slate-800 bg-slate-900/90 backdrop-blur-md">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-rose-500"></span>
            </span>
            <h2 className="text-sm font-bold tracking-wide uppercase text-slate-200">
              Live Incident Feed
            </h2>
          </div>
          {onClose && (
            <button
              onClick={onClose}
              className="lg:hidden p-1.5 text-slate-400 hover:text-white rounded-md hover:bg-slate-800"
              aria-label="Close sidebar"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Live Stream Banner if configured */}
        {liveUrl && (
          <div className="mb-3 p-2.5 rounded-lg bg-red-950/40 border border-red-800/60 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Radio className="w-4 h-4 text-red-400 animate-pulse" />
              <span className="text-xs font-semibold text-red-200">Active Live Stream</span>
            </div>
            <div className="flex items-center gap-1.5">
              <button
                onClick={onOpenLiveModal}
                className="text-[11px] px-2 py-0.5 rounded bg-red-600 hover:bg-red-500 text-white font-medium"
              >
                Watch
              </button>
              {onRemoveLive && (
                <button
                  onClick={onRemoveLive}
                  className="p-1 text-red-400 hover:text-red-200"
                  title="Remove stream link"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>
        )}

        {/* Search input */}
        <div className="relative mb-3">
          <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search sitio, road, or hazard..."
            className="w-full pl-9 pr-3 py-1.5 bg-slate-800/80 border border-slate-700/60 rounded-lg text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-200 text-xs"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Status Filters */}
        <div className="grid grid-cols-2 gap-1.5 p-1 bg-slate-800/60 rounded-lg border border-slate-700/50 mb-3 text-xs">
          <button
            onClick={() => setActiveFilterStatus(activeFilterStatus === 'active' ? 'all' : 'active')}
            className={`py-1 rounded-md font-medium transition-all ${
              activeFilterStatus === 'active'
                ? 'bg-rose-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Active ({activeCount})
          </button>
          <button
            onClick={() => setActiveFilterStatus(activeFilterStatus === 'resolved' ? 'all' : 'resolved')}
            className={`py-1 rounded-md font-medium transition-all ${
              activeFilterStatus === 'resolved'
                ? 'bg-emerald-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Resolved ({resolvedCount})
          </button>
        </div>

        {/* Hazard Type Scroll Filter */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
          {FILTER_BUTTONS.map((btn) => (
            <button
              key={btn.type}
              onClick={() => setActiveFilterType(btn.type)}
              className={`px-2.5 py-1 rounded-md text-[11px] font-medium whitespace-nowrap transition-colors ${
                activeFilterType === btn.type
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'bg-slate-800 text-slate-400 hover:text-slate-200 hover:bg-slate-700/60'
              }`}
            >
              {btn.label}
            </button>
          ))}
        </div>
      </div>

      {/* Incident List Feed */}
      <div className="flex-1 overflow-y-auto divide-y divide-slate-800/60 p-2 space-y-1 custom-scrollbar">
        {filteredAlerts.length === 0 ? (
          <div className="p-8 text-center text-slate-500">
            <ShieldAlert className="w-8 h-8 mx-auto mb-2 text-slate-600 opacity-60" />
            <p className="text-xs font-semibold text-slate-400">No reports found</p>
            <p className="text-[11px] mt-1 text-slate-500">
              {searchTerm ? 'Try clearing search filters' : 'All clear in this category'}
            </p>
          </div>
        ) : (
          filteredAlerts.map((alert) => {
            const isSelected = selectedAlert?.id === alert.id;
            const isResolved = alert.status === 'resolved';

            return (
              <div
                key={alert.id}
                onClick={() => onSelectAlert(isSelected ? null : alert)}
                className={`p-3 rounded-xl cursor-pointer transition-all duration-150 border text-left ${
                  isSelected
                    ? 'bg-slate-800/95 border-blue-500 shadow-md ring-1 ring-blue-500/50'
                    : 'bg-slate-800/30 border-slate-800 hover:bg-slate-800/70 hover:border-slate-700'
                }`}
              >
                <div className="flex items-start justify-between gap-2 mb-1.5">
                  <div className="flex items-center gap-2">
                    <span className="p-1.5 rounded-lg bg-slate-900 border border-slate-700/50 shrink-0">
                      {TYPE_ICONS[alert.type] || <AlertCircle className="w-4 h-4 text-slate-400" />}
                    </span>
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider ${
                        isResolved
                          ? 'bg-emerald-950/80 text-emerald-300 border border-emerald-800/60'
                          : alert.severity === 'critical'
                          ? 'bg-rose-950/80 text-rose-300 border border-rose-800/60'
                          : alert.severity === 'high'
                          ? 'bg-orange-950/80 text-orange-300 border border-orange-800/60'
                          : 'bg-amber-950/80 text-amber-300 border border-amber-800/60'
                      }`}
                    >
                      {alert.severity}
                    </span>
                  </div>
                  <span className="text-[10px] text-slate-400 font-mono shrink-0">
                    {alert.timeReported}
                  </span>
                </div>

                <h3 className="text-xs font-semibold text-slate-100 line-clamp-1 mb-1">
                  {alert.title}
                </h3>
                <p className="text-[11px] text-slate-400 line-clamp-2 mb-2 leading-relaxed">
                  {alert.description}
                </p>

                <div className="flex items-center justify-between text-[10px] text-slate-400 pt-1 border-t border-slate-800/50">
                  <div className="flex items-center gap-1 text-slate-300 font-medium">
                    <MapPin className="w-3 h-3 text-blue-400 shrink-0" />
                    <span className="truncate max-w-[150px]">{alert.sitio}</span>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onToggleAlertStatus(alert.id);
                    }}
                    className={`px-2 py-0.5 rounded text-[10px] font-medium transition-colors ${
                      isResolved
                        ? 'bg-slate-700 hover:bg-slate-600 text-slate-200'
                        : 'bg-emerald-600 hover:bg-emerald-500 text-white'
                    }`}
                  >
                    {isResolved ? 'Re-open' : 'Mark Resolved'}
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Bottom Quick Actions */}
      <div className="p-3 border-t border-slate-800 bg-slate-900/90 grid grid-cols-2 gap-2">
        <button
          onClick={onOpenReportModal}
          className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold shadow-md active:scale-95 transition-all"
        >
          <PlusCircle className="w-3.5 h-3.5" />
          <span>Report Hazard</span>
        </button>
        <button
          onClick={onOpenHotlinesModal}
          className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-semibold active:scale-95 transition-all"
        >
          <PhoneCall className="w-3.5 h-3.5 text-emerald-400" />
          <span>Hotlines</span>
        </button>
      </div>
    </div>
  );
};
