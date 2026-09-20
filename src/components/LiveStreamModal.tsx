import React, { useState } from 'react';
import { X, Radio, Link as LinkIcon, Trash2, Video } from 'lucide-react';

interface LiveStreamModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentLiveUrl: string;
  onSaveLiveUrl: (url: string) => void;
}

function getEmbedUrl(url: string): string | null {
  if (!url) return null;
  try {
    if (url.includes('youtube.com/watch?v=')) {
      const v = url.split('v=')[1]?.split('&')[0];
      return `https://www.youtube.com/embed/${v}?autoplay=1`;
    }
    if (url.includes('youtu.be/')) {
      const v = url.split('youtu.be/')[1]?.split('?')[0];
      return `https://www.youtube.com/embed/${v}?autoplay=1`;
    }
    if (url.includes('youtube.com/live/')) {
      const v = url.split('youtube.com/live/')[1]?.split('?')[0];
      return `https://www.youtube.com/embed/${v}?autoplay=1`;
    }
  } catch {
    return null;
  }
  return url;
}

export const LiveStreamModal: React.FC<LiveStreamModalProps> = ({
  isOpen,
  onClose,
  currentLiveUrl,
  onSaveLiveUrl,
}) => {
  const [urlInput, setUrlInput] = useState(currentLiveUrl);

  if (!isOpen) return null;

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    onSaveLiveUrl(urlInput.trim());
    onClose();
  };

  const handleClear = () => {
    setUrlInput('');
    onSaveLiveUrl('');
    onClose();
  };

  const embedUrl = getEmbedUrl(currentLiveUrl);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-xs p-4 animate-in fade-in duration-150">
      <div className="relative w-full max-w-2xl rounded-2xl bg-white shadow-2xl border border-slate-200 overflow-hidden max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50">
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-lg bg-red-50 text-red-600">
              <Radio className="w-5 h-5" />
            </span>
            <div>
              <h2 className="text-base font-bold text-slate-800">Live Incident & River Stream</h2>
              <p className="text-xs text-slate-500">CCTV & Community Live Broadcast</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-4 custom-scrollbar flex-1">
          {currentLiveUrl ? (
            <div className="space-y-3">
              <div className="relative w-full aspect-video rounded-xl bg-black overflow-hidden shadow-inner border border-slate-800">
                {embedUrl && embedUrl.includes('youtube.com/embed') ? (
                  <iframe
                    src={embedUrl}
                    title="Live Stream Broadcast"
                    className="w-full h-full border-0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                  />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center text-slate-400 p-6 text-center">
                    <Video className="w-10 h-10 mb-2 text-slate-500" />
                    <p className="text-sm font-semibold text-slate-300">Custom Stream URL Connected</p>
                    <a
                      href={currentLiveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-2 text-xs text-blue-400 hover:underline break-all"
                    >
                      {currentLiveUrl}
                    </a>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="p-6 text-center rounded-xl border border-dashed border-slate-300 bg-slate-50/70">
              <Radio className="w-8 h-8 mx-auto mb-2 text-slate-400" />
              <h3 className="text-xs font-bold text-slate-700">No Live Stream Connected</h3>
              <p className="text-[11px] text-slate-500 mt-1 max-w-sm mx-auto">
                Paste a YouTube Live or stream link below to display real-time flood monitoring or CCTV feeds.
              </p>
            </div>
          )}

          {/* URL Input Form */}
          <form onSubmit={handleSave} className="space-y-3 pt-2">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Stream / YouTube URL
              </label>
              <div className="relative">
                <LinkIcon className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="url"
                  value={urlInput}
                  onChange={(e) => setUrlInput(e.target.value)}
                  placeholder="https://www.youtube.com/watch?v=..."
                  className="w-full pl-9 pr-3 py-2 rounded-lg border border-slate-300 text-xs focus:outline-none focus:border-blue-500"
                />
              </div>
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-slate-100">
              {currentLiveUrl ? (
                <button
                  type="button"
                  onClick={handleClear}
                  className="inline-flex items-center gap-1 text-xs text-rose-600 hover:text-rose-700 font-medium"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Remove Stream</span>
                </button>
              ) : (
                <div />
              )}
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 rounded-xl text-xs font-medium text-slate-600 hover:bg-slate-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold shadow-md active:scale-95 transition-all"
                >
                  Save Stream URL
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
