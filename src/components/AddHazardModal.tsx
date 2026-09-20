import React, { useState } from 'react';
import { 
  X, 
  MapPin, 
  Image as ImageIcon, 
  Send, 
  AlertTriangle, 
  Waves, 
  Flame, 
  Zap, 
  Droplets, 
  Crosshair,
  ShieldAlert
} from 'lucide-react';
import { HazardAlert, HazardType, HazardSeverity } from '../types';
import { SAN_JOSE_CENTER, SAN_JOSE_SITIOS } from '../data/geoData';

interface AddHazardModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddAlert: (alert: Omit<HazardAlert, 'id' | 'timeReported'>) => void;
  selectedCoordinates: [number, number] | null;
  onEnablePickCoordinateMode: () => void;
}

const HAZARD_TYPES: { type: HazardType; label: string; icon: React.ComponentType<{ className?: string }>; color: string }[] = [
  { type: 'flood', label: 'Flood', icon: Waves, color: 'text-blue-500' },
  { type: 'fire', label: 'Fire', icon: Flame, color: 'text-rose-500' },
  { type: 'power_outage', label: 'Power', icon: Zap, color: 'text-amber-500' },
  { type: 'road_obstruction', label: 'Road', icon: AlertTriangle, color: 'text-orange-500' },
  { type: 'water_outage', label: 'Water', icon: Droplets, color: 'text-cyan-500' },
  { type: 'other', label: 'Other', icon: ShieldAlert, color: 'text-purple-500' },
];

const SEVERITIES: { level: HazardSeverity; label: string; bg: string }[] = [
  { level: 'low', label: 'Low', bg: 'bg-emerald-50 text-emerald-700 border-emerald-200' },
  { level: 'moderate', label: 'Moderate', bg: 'bg-amber-50 text-amber-700 border-amber-200' },
  { level: 'high', label: 'High', bg: 'bg-orange-50 text-orange-700 border-orange-200' },
  { level: 'critical', label: 'Critical', bg: 'bg-rose-50 text-rose-700 border-rose-200' },
];

export const AddHazardModal: React.FC<AddHazardModalProps> = ({
  isOpen,
  onClose,
  onAddAlert,
  selectedCoordinates,
  onEnablePickCoordinateMode,
}) => {
  const [type, setType] = useState<HazardType>('flood');
  const [severity, setSeverity] = useState<HazardSeverity>('moderate');
  const [title, setTitle] = useState('');
  const [sitio, setSitio] = useState(SAN_JOSE_SITIOS[0]?.name || 'Kasiglahan Village 1');
  const [streetName, setStreetName] = useState('');
  const [description, setDescription] = useState('');
  const [reportedBy, setReportedBy] = useState('');
  const [photoUrl, setPhotoUrl] = useState<string | undefined>(undefined);

  if (!isOpen) return null;

  const currentCoords = selectedCoordinates || SAN_JOSE_CENTER;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !description.trim()) return;

    onAddAlert({
      type,
      severity,
      title: title.trim(),
      sitio,
      streetName: streetName.trim() || sitio,
      coordinates: currentCoords,
      status: 'active',
      description: description.trim(),
      reportedBy: reportedBy.trim() || 'Concerned Resident',
      photoUrl,
    });

    setTitle('');
    setStreetName('');
    setDescription('');
    setReportedBy('');
    setPhotoUrl(undefined);
    onClose();
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-in fade-in duration-150">
      <div className="relative w-full max-w-lg rounded-2xl bg-white shadow-2xl border border-slate-200 overflow-hidden max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50/80">
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-lg bg-blue-50 text-blue-600">
              <ShieldAlert className="w-5 h-5" />
            </span>
            <div>
              <h2 className="text-base font-bold text-slate-800">Report Incident or Hazard</h2>
              <p className="text-xs text-slate-500">Barangay San Jose Community Watch</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-4 custom-scrollbar flex-1">
          {/* Hazard Type */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
              Hazard Type
            </label>
            <div className="grid grid-cols-3 gap-2">
              {HAZARD_TYPES.map((ht) => {
                const Icon = ht.icon;
                const isSelected = type === ht.type;
                return (
                  <button
                    key={ht.type}
                    type="button"
                    onClick={() => setType(ht.type)}
                    className={`flex items-center gap-1.5 p-2 rounded-xl border text-xs font-medium transition-all ${
                      isSelected
                        ? 'border-blue-600 bg-blue-50/70 text-blue-900 shadow-xs'
                        : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    <Icon className={`w-3.5 h-3.5 ${ht.color}`} />
                    <span>{ht.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Severity */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
              Severity Level
            </label>
            <div className="grid grid-cols-4 gap-2 text-xs">
              {SEVERITIES.map((s) => (
                <button
                  key={s.level}
                  type="button"
                  onClick={() => setSeverity(s.level)}
                  className={`py-1.5 px-2 rounded-lg border font-semibold text-center transition-all ${
                    severity === s.level
                      ? `${s.bg} ring-2 ring-blue-500 shadow-xs`
                      : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  {s.label}
                </button>
              ))}
            </div>
          </div>

          {/* Incident Summary */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Incident Summary / Title *
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g., Gutter-level flood along Phase 1K Road"
              className="w-full px-3.5 py-2 rounded-lg border border-slate-300 text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            />
          </div>

          {/* Location details */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Sitio / Purok *
              </label>
              <select
                value={sitio}
                onChange={(e) => setSitio(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs focus:outline-none focus:border-blue-500"
              >
                {SAN_JOSE_SITIOS.map((s) => (
                  <option key={s.name} value={s.name}>
                    {s.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Street / Landmark
              </label>
              <input
                type="text"
                value={streetName}
                onChange={(e) => setStreetName(e.target.value)}
                placeholder="e.g., Block 12, Main Ave"
                className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs focus:outline-none focus:border-blue-500"
              />
            </div>
          </div>

          {/* Map Coordinates & Change Pin */}
          <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-emerald-600" />
              <div>
                <p className="text-xs font-medium text-slate-700">Map Coordinates</p>
                <p className="text-[11px] font-mono text-slate-500">
                  {currentCoords[0].toFixed(5)}°N, {currentCoords[1].toFixed(5)}°E
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={onEnablePickCoordinateMode}
              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-white border border-slate-300 hover:bg-slate-50 text-xs font-medium text-slate-700 shadow-2xs"
            >
              <Crosshair className="w-3.5 h-3.5 text-blue-600" />
              <span>Change Pin</span>
            </button>
          </div>

          {/* Description */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Detailed Description *
            </label>
            <textarea
              required
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe situation, passability for vehicles, urgent assistance needed..."
              className="w-full px-3.5 py-2 rounded-lg border border-slate-300 text-xs focus:outline-none focus:border-blue-500"
            />
          </div>

          {/* Reporter & Photo Upload */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Reported By (Optional)
              </label>
              <input
                type="text"
                value={reportedBy}
                onChange={(e) => setReportedBy(e.target.value)}
                placeholder="Name or Organization"
                className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs focus:outline-none focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Attach Photo
              </label>
              <label className="flex items-center gap-2 px-3 py-2 rounded-lg border border-dashed border-slate-300 hover:border-blue-500 bg-white cursor-pointer text-xs text-slate-600">
                <ImageIcon className="w-3.5 h-3.5 text-slate-400" />
                <span className="truncate">{photoUrl ? 'Photo attached' : 'Upload photo'}</span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handlePhotoUpload}
                  className="hidden"
                />
              </label>
            </div>
          </div>

          {/* Actions */}
          <div className="pt-2 border-t border-slate-100 flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs font-medium text-slate-600 hover:bg-slate-100"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="inline-flex items-center gap-1.5 px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold shadow-md active:scale-95 transition-all"
            >
              <Send className="w-4 h-4" />
              <span>Submit Report</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
