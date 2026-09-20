import React from 'react';
import {
  X,
  PhoneCall,
  ShieldAlert,
  Flame,
  Zap,
  Droplets,
  LifeBuoy,
  Building2
} from 'lucide-react';

interface EmergencyHotlinesModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface HotlineItem {
  title: string;
  number: string;
  category: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
}

const HOTLINES: HotlineItem[] = [
  {
    title: 'Barangay San Jose BDRRMC Operation Center',
    number: '(02) 8997-1234 / 0917-888-SANJOSE',
    category: 'Barangay Emergency',
    icon: Building2,
    color: 'text-blue-600 bg-blue-50',
  },
  {
    title: 'Rodriguez (Montalban) MDRRMO Rescue 911',
    number: '(02) 8941-5555 / 0920-999-MDRRMO',
    category: 'Municipal Rescue',
    icon: LifeBuoy,
    color: 'text-rose-600 bg-rose-50',
  },
  {
    title: 'Bureau of Fire Protection (BFP) Rodriguez',
    number: '(02) 8948-2222 / 0917-555-FIRE',
    category: 'Fire Emergency',
    icon: Flame,
    color: 'text-orange-600 bg-orange-50',
  },
  {
    title: 'Rodriguez Municipal Police Station (PNP)',
    number: '(02) 8941-1111 / 0998-598-7654',
    category: 'Police Assistance',
    icon: ShieldAlert,
    color: 'text-indigo-600 bg-indigo-50',
  },
  {
    title: 'Meralco Emergency Hotline (Power Outages)',
    number: '16211 / 0920-971-6211',
    category: 'Electricity / Power',
    icon: Zap,
    color: 'text-amber-600 bg-amber-50',
  },
  {
    title: 'Manila Water Hotline (Water Supply / Pipe Burst)',
    number: '1627',
    category: 'Water Utility',
    icon: Droplets,
    color: 'text-cyan-600 bg-cyan-50',
  },
];

export const EmergencyHotlinesModal: React.FC<EmergencyHotlinesModalProps> = ({
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-in fade-in duration-150">
      <div className="relative w-full max-w-lg rounded-2xl bg-white shadow-2xl border border-slate-200 overflow-hidden max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50">
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-lg bg-rose-50 text-rose-600">
              <PhoneCall className="w-5 h-5" />
            </span>
            <div>
              <h2 className="text-base font-bold text-slate-800">Emergency Hotlines</h2>
              <p className="text-xs text-slate-500">Barangay San Jose & Rodriguez, Rizal</p>
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
          {HOTLINES.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="p-3.5 rounded-xl border border-slate-200 bg-slate-50/50 hover:bg-white hover:border-slate-300 hover:shadow-xs transition-all space-y-1"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className={`p-1.5 rounded-lg ${item.color}`}>
                      <Icon className="w-4 h-4" />
                    </span>
                    <h3 className="text-xs font-bold text-slate-800">{item.title}</h3>
                  </div>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-slate-100 text-slate-600 font-medium">
                    {item.category}
                  </span>
                </div>
                <div className="flex items-center justify-between pl-8 pt-1">
                  <span className="text-xs font-mono font-semibold text-slate-700">
                    {item.number}
                  </span>
                  <a
                    href={`tel:${item.number.split('/')[0].trim().replace(/[^0-9]/g, '')}`}
                    className="inline-flex items-center gap-1 px-3 py-1 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-[11px] font-semibold transition-colors"
                  >
                    <PhoneCall className="w-3 h-3" />
                    <span>Call Now</span>
                  </a>
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
            Close Directory
          </button>
        </div>
      </div>
    </div>
  );
};
