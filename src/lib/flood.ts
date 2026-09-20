export const SAN_JOSE_BRIDGE_COORDS: [number, number] = [14.7425, 121.131];

export const AUTO_FLOOD_ALERT_ID = 'auto-pagasa-flood-station';

export interface FloodStation {
  id: string;
  name: string;
  landmark?: string;
  currentLevel: number;
  alertLevel: number;
  alarmLevel: number;
  criticalLevel: number;
  unit?: string;
  status: string;
  trend?: string;
  lastUpdated?: string;
}

export type FloodClassification = 'normal' | 'watch' | 'alarm' | 'critical';

export function classifyFloodLevel(station?: FloodStation): FloodClassification {
  if (!station || typeof station.currentLevel !== 'number') return 'normal';
  if (station.currentLevel >= station.criticalLevel) return 'critical';
  if (station.currentLevel >= station.alarmLevel) return 'alarm';
  if (station.currentLevel >= station.alertLevel) return 'watch';
  return 'normal';
}
