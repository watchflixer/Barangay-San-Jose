import { useState, useEffect } from 'react';
import { FloodStation } from '../lib/flood';

export interface FloodStatusData {
  fetchedAt: string;
  summary: string;
  stations: FloodStation[];
}

const DEFAULT_FLOOD_STATUS: FloodStatusData = {
  fetchedAt: new Date().toISOString(),
  summary: 'Marikina-Montalban River Basin at San Jose Bridge is below alert threshold.',
  stations: [
    {
      id: 'montalban-sanjose-bridge',
      name: 'San Jose Bridge River Gauge',
      landmark: 'San Jose Bridge',
      currentLevel: 14.8,
      alertLevel: 18.0,
      alarmLevel: 19.0,
      criticalLevel: 20.0,
      unit: 'm',
      status: 'Normal',
      trend: 'stable',
      lastUpdated: new Date().toLocaleTimeString('en-PH', {
        timeZone: 'Asia/Manila',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
      }),
    },
  ],
};

export function useFloodStatus() {
  const [data, setData] = useState<FloodStatusData>(DEFAULT_FLOOD_STATUS);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setData((prev) => ({
        ...prev,
        fetchedAt: new Date().toISOString(),
        stations: prev.stations.map((s) => ({
          ...s,
          lastUpdated: new Date().toLocaleTimeString('en-PH', {
            timeZone: 'Asia/Manila',
            hour: '2-digit',
            minute: '2-digit',
            hour12: true,
          }),
        })),
      }));
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  return { data, isLoading, error };
}
