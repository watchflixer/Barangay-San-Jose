import { EmergencyContact, HazardAlert } from '../types';

export const SAN_JOSE_CENTER: [number, number] = [14.7425, 121.131];

export const SAN_JOSE_BOUNDS: [[number, number], [number, number]] = [
  [14.718, 121.100],
  [14.767, 121.162],
];

export const SAN_JOSE_POLYGON_COORDS: [number, number][] = [
  [14.7612, 121.1215],
  [14.7635, 121.1350],
  [14.7598, 121.1485],
  [14.7520, 121.1560],
  [14.7435, 121.1590],
  [14.7340, 121.1575],
  [14.7265, 121.1510],
  [14.7210, 121.1415],
  [14.7195, 121.1305],
  [14.7225, 121.1190],
  [14.7285, 121.1110],
  [14.7365, 121.1070],
  [14.7460, 121.1085],
  [14.7545, 121.1140],
  [14.7612, 121.1215],
];

export function getInvertedMaskCoordinates(
  innerPolygon: [number, number][] = SAN_JOSE_POLYGON_COORDS
): [[number, number][], [number, number][]] {
  const outerWorld: [number, number][] = [
    [85, -180],
    [85, 180],
    [-85, 180],
    [-85, -180],
    [85, -180],
  ];
  return [outerWorld, innerPolygon];
}

export interface SitioInfo {
  name: string;
  coordinates: [number, number];
}

export const SAN_JOSE_SITIOS: SitioInfo[] = [
  { name: 'Kasiglahan Village 1', coordinates: [14.7482, 121.1385] },
  { name: 'Kasiglahan Village 2', coordinates: [14.7510, 121.1420] },
  { name: 'Sitio Wawa', coordinates: [14.7315, 121.1425] },
  { name: 'Sub-Urban Housing', coordinates: [14.7390, 121.1250] },
  { name: 'Eastwood Greenview', coordinates: [14.7445, 121.1180] },
  { name: 'Litex / San Jose Poblacion', coordinates: [14.7410, 121.1330] },
  { name: 'Sitio Balite', coordinates: [14.7350, 121.1370] },
  { name: 'Amityville', coordinates: [14.7535, 121.1280] },
  { name: 'San Jose Bridge Crossing', coordinates: [14.7425, 121.1310] },
];

export const INITIAL_HAZARDS: HazardAlert[] = [
  {
    id: 'hz-1001',
    type: 'flood',
    title: 'Gutter Deep Flood along Main Access Road',
    streetName: 'Phase 1K Access Road',
    sitio: 'Kasiglahan Village 1',
    coordinates: [14.7488, 121.1378],
    timeReported: '15 mins ago',
    status: 'active',
    severity: 'moderate',
    description: 'Continuous heavy rainfall causing gutter-level flood. Light vehicles can still pass with caution.',
    reportedBy: 'BDRRMC Patrol Team 2',
    updatesCount: 1,
    lastUpdated: '5 mins ago',
  },
  {
    id: 'hz-1002',
    type: 'road_obstruction',
    title: 'Fallen Tree Branch on Power Lines',
    streetName: 'Rodriguez Highway near Sitio Balite',
    sitio: 'Sitio Balite',
    coordinates: [14.7360, 121.1365],
    timeReported: '40 mins ago',
    status: 'active',
    severity: 'high',
    description: 'Large acacia branch hanging over primary power distribution lines. Meralco & rescue crews alerted.',
    reportedBy: 'Brgy. Tanod Desk',
    updatesCount: 2,
    lastUpdated: '12 mins ago',
  },
  {
    id: 'hz-1003',
    type: 'water_outage',
    title: 'Emergency Main Pipe Repair',
    streetName: 'Eastwood Drive',
    sitio: 'Eastwood Greenview',
    coordinates: [14.7450, 121.1195],
    timeReported: '2 hours ago',
    status: 'active',
    severity: 'low',
    description: 'Manila Water emergency mainline maintenance underway. Estimated restoration by 6:00 PM.',
    reportedBy: 'Manila Water Advisory',
    updatesCount: 1,
    lastUpdated: '30 mins ago',
  },
  {
    id: 'hz-1004',
    type: 'flood',
    title: 'Cleared Water Flow - Kasiglahan Spillway',
    streetName: 'Spillway Access',
    sitio: 'Kasiglahan Village 2',
    coordinates: [14.7525, 121.1440],
    timeReported: '4 hours ago',
    status: 'resolved',
    severity: 'moderate',
    description: 'Spillway culvert cleared of debris by MMDA & Barangay Maintenance. Water subsiding normally.',
    reportedBy: 'Eng. Dela Cruz',
    updatesCount: 3,
    lastUpdated: '1 hour ago',
  },
];

/** Emergency contacts used by the hotlines directory. */
export const EMERGENCY_CONTACTS: EmergencyContact[] = [
  {
    agency: 'Barangay San Jose Hall & Operations Center',
    label: 'Brgy. San Jose OpCen',
    numbers: ['(02) 8997-1823', '0917-890-7265'],
    type: 'barangay',
    icon: 'ShieldAlert',
  },
  {
    agency: 'Rodriguez (Montalban) MDRRMO Rescue 911',
    label: 'MDRRMO Rescue',
    numbers: ['(02) 8997-1800', '0920-955-7372', '911'],
    type: 'rescue',
    icon: 'LifeBuoy',
  },
  {
    agency: 'Bureau of Fire Protection (BFP) Rodriguez Fire Station',
    label: 'BFP Fire Dept',
    numbers: ['(02) 8948-2211', '0966-248-1890'],
    type: 'fire',
    icon: 'Flame',
  },
  {
    agency: 'Philippine National Police (PNP) Rodriguez Sub-Station',
    label: 'PNP Rodriguez',
    numbers: ['(02) 8941-1191', '0998-598-5712'],
    type: 'police',
    icon: 'BadgeCheck',
  },
  {
    agency: 'Manila Water Montalban Emergency Desk',
    label: 'Manila Water',
    numbers: ['1627', '(02) 7917-4221'],
    type: 'utility',
    icon: 'Droplets',
  },
  {
    agency: 'MERALCO Emergency & Outage Dispatch',
    label: 'Meralco Power',
    numbers: ['16211', '0920-971-6211'],
    type: 'utility',
    icon: 'Zap',
  },
];

export const MAP_PROVIDERS = {
  streets: {
    url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
  light: {
    url: 'https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png',
    attribution: '&copy; <a href="https://carto.com/">CARTO</a>',
  },
  dark: {
    url: 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png',
    attribution: '&copy; <a href="https://carto.com/">CARTO</a>',
  },
  satellite: {
    url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
    attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community',
  },
};
