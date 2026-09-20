import React from 'react';
import { X, Building2, MapPin, Users, Phone, CheckCircle2 } from 'lucide-react';

interface EvacuationCentersModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface EvacuationCenter {
  name: string;
  sitio: string;
  capacity: string;
  status: string;
  contact: string;
  features: string[];
}

const EVACUATION_CENTERS: EvacuationCenter[] = [
  {
    name: 'Barangay San Jose Main Multi-Purpose Covered Court',
    sitio: 'San Jose Poblacion / Litex',
    capacity: '500 Families',
    status: 'Primary Central Evacuation Center',
    contact: '(02) 8997-1234',
    features: ['Generator Backup', 'Medical Station', 'Clean Water Tanks', 'Portalets'],
  },
  {
    name: 'Kasiglahan Village Elementary School (KVES)',
    sitio: 'Kasiglahan Village 1',
    capacity: '800 Families',
    status: 'Active Evacuation Hub',
    contact: '0917-888-KVES',
    features: ['Covered Court', 'Relief Goods Storage', 'Child-Friendly Space'],
  },
  {
    name: 'Sub-Urban Covered Court',
    sitio: 'Sub-Urban Housing',
    capacity: '250 Families',
    status: 'Standby / Pre-emptive',
    contact: '0920-999-SUBC',
    features: ['Elevated Flooring', 'Security Desk', 'Kitchen Facility'],
  },
  {
    name: 'Eastwood Greenview Multi-Purpose Hall',
    sitio: 'Eastwood Greenview',
    capacity: '180 Families',
    status: 'Standby',
    contact: '0919-444-EAST',
    features: ['First Aid Post', 'Power Inverter Station'],
  },
];

export const EvacuationCentersModal: React.FC<EvacuationCentersModalProps> = ({
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-in fade-in duration-150">
      <div className="relative w-full max-w-2xl rounded-2xl bg-white shadow-2xl border border-slate-200 overflow-hidden max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50">
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-lg bg-emerald-50 text-emerald-600">
              <Building2 className="w-5 h-5" />
            </span>
            <div>
              <h2 className="text-base font-bold text-slate-800">Designated Evacuation Centers</h2>
              <p className="text-xs text-slate-500">Barangay San Jose, Rodriguez (Montalban)</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Directory List */}
        <div className="p-6 overflow-y-auto space-y-3 custom-scrollbar">
          {EVACUATION_CENTERS.map((center, idx) => (
            <div
              key={idx}
              className="p-4 rounded-xl border border-slate-200 bg-white hover:border-emerald-300 hover:shadow-xs transition-all space-y-2"
            >
              <div className="flex items-start justify-between gap-2">
                <div>
                  <h3 className="text-sm font-bold text-slate-800">{center.name}</h3>
                  <div className="flex items-center gap-1.5 text-xs text-slate-500 mt-0.5">
                    <MapPin className="w-3.5 h-3.5 text-blue-500" />
                    <span>{center.sitio}</span>
                  </div>
                </div>
                <span className="px-2.5 py-1 rounded-md text-[11px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200 whitespace-nowrap">
                  {center.status}
                </span>
              </div>

              <div className="flex flex-wrap items-center gap-4 text-xs text-slate-600 pt-1">
                <div className="flex items-center gap-1">
                  <Users className="w-3.5 h-3.5 text-slate-400" />
                  <span>Capacity: {center.capacity}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Phone className="w-3.5 h-3.5 text-slate-400" />
                  <span className="font-mono">{center.contact}</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-1.5 pt-1">
                {center.features.map((feature, fIdx) => (
                  <span
                    key={fIdx}
                    className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-slate-100 text-slate-600 text-[10px]"
                  >
                    <CheckCircle2 className="w-3 h-3 text-emerald-500" />
                    <span>{feature}</span>
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-100 bg-slate-50 text-right">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
