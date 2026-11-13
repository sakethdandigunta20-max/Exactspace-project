import React, { useEffect } from 'react';
import { X, Download, ExternalLink, User } from 'lucide-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp } from '@fortawesome/free-solid-svg-icons';

export default function LightboxModal({
  photo,
  likesCount = 0,
  onLike,
  onClose,
}) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!photo) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative max-w-5xl w-full bg-slate-900 rounded-2xl overflow-hidden shadow-2xl border border-slate-800 text-white flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-blue-600/20 text-blue-400 flex items-center justify-center">
              <User className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-white">
                Photo by {photo.author}
              </h3>
              <p className="text-xs text-slate-400 font-mono">
                {photo.width} × {photo.height} px
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => onLike(photo.id)}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-600/30 text-blue-300 hover:bg-blue-600 hover:text-white transition-all text-xs font-semibold"
            >
              <FontAwesomeIcon icon={faThumbsUp} />
              <span>{likesCount}</span>
            </button>

            <a
              href={photo.download_url}
              target="_blank"
              rel="noopener noreferrer"
              download
              className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
              title="Download Full Image"
            >
              <Download className="w-4 h-4" />
            </a>

            <button
              type="button"
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
              aria-label="Close dialog"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Image Preview */}
        <div className="flex-1 overflow-auto p-4 flex items-center justify-center bg-black/40 min-h-[300px]">
          <img
            src={photo.download_url}
            alt={`Full size by ${photo.author}`}
            className="max-h-[70vh] w-auto max-w-full object-contain rounded-lg shadow-lg"
          />
        </div>

        {/* Footer info */}
        <div className="px-6 py-3 bg-slate-900/90 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
          <span className="truncate">Source: {photo.download_url}</span>
          {photo.url && (
            <a
              href={photo.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-blue-400 hover:underline shrink-0 ml-4"
            >
              <span>Unsplash Page</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
