import React, { useEffect, useState } from 'react';
import { CloudSun, Droplets, RefreshCw, Wind } from 'lucide-react';

const WEATHER_URL = 'https://api.open-meteo.com/v1/forecast?latitude=14.7425&longitude=121.1310&current=temperature_2m,relative_humidity_2m,apparent_temperature,precipitation,weather_code,wind_speed_10m&timezone=Asia%2FManila';

type WeatherData = {
  current: {
    temperature_2m: number;
    relative_humidity_2m: number;
    apparent_temperature: number;
    precipitation: number;
    weather_code: number;
    wind_speed_10m: number;
    time: string;
  };
};

const DEFAULT_WEATHER: WeatherData = {
  current: {
    temperature_2m: 28,
    relative_humidity_2m: 85,
    apparent_temperature: 32,
    precipitation: 0.0,
    weather_code: 3,
    wind_speed_10m: 3.5,
    time: new Date().toISOString(),
  },
};

const weatherLabel = (code: number) => {
  if (code === 0) return 'Clear sky';
  if (code <= 3) return 'Partly cloudy';
  if (code <= 48) return 'Cloudy';
  if (code <= 67 || code >= 80) return 'Rain showers';
  if (code <= 77) return 'Drizzle';
  if (code >= 95) return 'Thunderstorm';
  return 'Current conditions';
};

interface PagasaFloodStatusProps {
  isIncidentOpen?: boolean;
}

export const PagasaFloodStatus: React.FC<PagasaFloodStatusProps> = ({ isIncidentOpen = false }) => {
  const [data, setData] = useState<WeatherData>(() => {
    try {
      const cached = localStorage.getItem('hazardsync_weather_cache');
      if (cached) {
        const parsed = JSON.parse(cached);
        if (parsed?.current?.temperature_2m) return parsed;
      }
    } catch {
      // ignore storage access issue
    }
    return DEFAULT_WEATHER;
  });
  const [isRefreshing, setIsRefreshing] = useState(false);

  const load = async () => {
    try {
      setIsRefreshing(true);
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 6000);

      const response = await fetch(WEATHER_URL, {
        signal: controller.signal,
      });
      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new Error(`Status ${response.status}`);
      }
      const json = (await response.json()) as any;
      if (json && json.current && typeof json.current.temperature_2m === 'number') {
        const freshData: WeatherData = {
          current: {
            temperature_2m: json.current.temperature_2m,
            relative_humidity_2m: json.current.relative_humidity_2m ?? 80,
            apparent_temperature: json.current.apparent_temperature ?? json.current.temperature_2m,
            precipitation: json.current.precipitation ?? 0,
            weather_code: json.current.weather_code ?? 3,
            wind_speed_10m: json.current.wind_speed_10m ?? 4,
            time: json.current.time || new Date().toISOString(),
          },
        };
        setData(freshData);
        try {
          localStorage.setItem('hazardsync_weather_cache', JSON.stringify(freshData));
        } catch {
          // ignore storage error
        }
      }
    } catch (err) {
      console.warn('Weather fetch warning (using cache/default):', err);
    } finally {
      setIsRefreshing(false);
    }
  };

  useEffect(() => {
    let cancelled = false;
    load();
    // Refresh every 10 minutes
    const timer = window.setInterval(() => {
      if (!cancelled) load();
    }, 10 * 60 * 1000);
    return () => {
      cancelled = true;
      window.clearInterval(timer);
    };
  }, []);

  // If an incident card is open, do not render weather card
  if (isIncidentOpen) {
    return null;
  }

  const current = data.current;
  const updated = (() => {
    if (!current?.time) return '';
    try {
      const d = new Date(current.time);
      if (isNaN(d.getTime())) return '';
      return d.toLocaleTimeString('en-PH', {
        timeZone: 'Asia/Manila',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
      });
    } catch {
      return '';
    }
  })();

  return (
    <div
      className="absolute top-20 right-4 z-10 w-56 rounded-lg bg-slate-900/95 backdrop-blur-md border border-slate-800 shadow-lg text-slate-200 overflow-hidden select-none"
    >
      <div className="px-3 py-2 flex items-center justify-between border-b border-slate-800">
        <div className="flex items-center gap-2">
          <CloudSun className="w-4 h-4 text-sky-300 shrink-0" />
          <div className="text-[10px] font-bold tracking-wide uppercase text-slate-200">Weather (Rizal)</div>
        </div>
        <button
          onClick={() => load()}
          disabled={isRefreshing}
          title="Refresh Weather"
          className="text-slate-400 hover:text-white transition-colors cursor-pointer p-0.5 rounded"
        >
          <RefreshCw className={`w-3 h-3 ${isRefreshing ? 'animate-spin text-sky-400' : ''}`} />
        </button>
      </div>

      <div className="px-2.5 py-2 space-y-1.5">
        <div className="flex items-end justify-between">
          <div className="text-2xl font-bold text-white leading-none">{Math.round(current.temperature_2m)}°C</div>
          <div className="text-[10px] text-slate-400 text-right">Feels like {Math.round(current.apparent_temperature)}°C<br />{weatherLabel(current.weather_code)}</div>
        </div>
        <div className="grid grid-cols-3 gap-1 border-t border-slate-800 pt-2 text-[9px] text-slate-400">
          <span className="flex items-center gap-1"><Droplets className="w-3 h-3 text-sky-400" />{current.relative_humidity_2m}%</span>
          <span className="flex items-center gap-1"><Wind className="w-3 h-3 text-emerald-400" />{Math.round(current.wind_speed_10m)} km/h</span>
          <span>Rain {current.precipitation} mm</span>
        </div>
        <div className="flex items-center gap-1 text-[9px] text-slate-500 font-mono">
          <RefreshCw className="w-2.5 h-2.5" />
          {updated ? `Updated ${updated} PHT` : 'Live Weather'}
        </div>
      </div>
    </div>
  );
};
