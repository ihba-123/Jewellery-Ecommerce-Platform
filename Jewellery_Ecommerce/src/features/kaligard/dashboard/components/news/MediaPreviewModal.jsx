import { useEffect } from 'react';
import { X } from 'lucide-react';

const MediaPreviewModal = ({ item, onClose }) => {
  const isImage = item.type === 'image';
  const isVideo = item.type === 'video';

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-110 flex items-center justify-center bg-linear-to-br from-[#667eea]/85 via-[#5f6bb8]/80 to-[#764ba2]/85 p-4 backdrop-blur-md"
      onClick={(event) => {
        if (event.target === event.currentTarget) {
          onClose();
        }
      }}
      role="dialog"
      aria-modal="true"
      aria-label="Media preview"
    >
      <div className="relative flex w-full max-w-4xl flex-col overflow-hidden rounded-2xl border border-white/20 bg-white/10 shadow-2xl backdrop-blur-xl">
        <div className="flex items-center justify-between gap-4 border-b border-white/15 bg-white/10 px-4 py-3 sm:px-5 sm:py-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/50">Preview</p>
            <h3 className="mt-1 line-clamp-1 text-sm font-semibold text-white sm:text-base">{item.title}</h3>
          </div>
          <button
            onClick={onClose}
            className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-2 text-sm font-semibold text-white transition-all hover:bg-white/20"
            aria-label="Close preview"
          >
            <X className="h-4 w-4" />
            <span className="hidden sm:inline">Close</span>
          </button>
        </div>

        <div className="flex items-center justify-center bg-white/5 px-4 py-4 sm:px-6 sm:py-6">
          {isImage && (
            <img
              src={item.imageUrl}
              alt={item.title}
              className="max-h-[70vh] w-full rounded-xl border border-white/10 object-contain shadow-lg"
            />
          )}
          {isVideo && (
            <video
              src={item.videoUrl}
              controls
              autoPlay={false}
              playsInline
              preload="metadata"
              className="max-h-[70vh] w-full rounded-xl border border-white/10 object-contain shadow-lg"
            />
          )}
        </div>

        <div className="border-t border-white/15 bg-white/10 p-4 backdrop-blur-md sm:p-6">
          <h3 className="mb-2 text-lg font-bold text-white sm:text-xl">{item.title}</h3>
          {item.description && <p className="text-sm text-white/80 sm:text-base">{item.description}</p>}
          <p className="mt-3 text-xs text-white/50 sm:text-sm">
            {new Date(item.date).toLocaleDateString('en-IN', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
              hour: '2-digit',
              minute: '2-digit'
            })}
          </p>
        </div>
      </div>
    </div>
  );
};

export default MediaPreviewModal;
