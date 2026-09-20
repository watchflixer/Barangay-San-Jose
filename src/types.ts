export type HazardType =
  | 'flood'
  | 'fire'
  | 'power_outage'
  | 'power'
  | 'road_obstruction'
  | 'road'
  | 'water_outage'
  | 'water'
  | 'streetlight'
  | 'other';

export type HazardSeverity = 'low' | 'moderate' | 'high' | 'critical';

export type HazardStatus = 'active' | 'resolved' | 'monitoring';

export interface HazardAlert {
  id: string;
  type: HazardType;
  title: string;
  streetName: string;
  sitio: string;
  coordinates: [number, number];
  timeReported: string;
  status: HazardStatus;
  severity: HazardSeverity;
  description: string;
  reportedBy?: string;
  updatesCount?: number;
  lastUpdated?: string;
  photoUrl?: string;
  evacuationCenter?: string;
}

export type TileLayerType = 'streets' | 'light' | 'dark' | 'satellite';

export interface MapSettings {
  maskOpacity: number;
  maskColor: string;
  tileLayer: TileLayerType;
  showBoundaryStroke: boolean;
  boundaryColor: string;
  showSitioLabels: boolean;
  lockCameraToBounds: boolean;
  autoCenterOnSelect: boolean;
  activeFilterType: HazardType | 'all';
  activeFilterStatus: HazardStatus | 'all';
}
