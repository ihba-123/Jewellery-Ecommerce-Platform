import { Play, Trash2, Eye } from 'lucide-react';

const NewsCard = ({ item, onDelete, onView }) => {
  const isImage = item.type === 'image';
  const isVideo = item.type === 'video';

  return (
    <div className="group overflow-hidden rounded-xl border border-white/20 bg-white/8 backdrop-blur-md transition-all hover:bg-white/12 sm:rounded-2xl">
      <div className="relative flex h-40 w-full items-center justify-center overflow-hidden bg-linear-to-br from-[#6f6bdb]/20 to-[#8a5eae]/20 sm:h-48 lg:h-56">
        {isImage && item.imageUrl && (
          <img
            src={item.imageUrl}
            alt={item.title}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        )}

        {isVideo && item.videoUrl && (
          <div className="relative flex h-full w-full items-center justify-center bg-linear-to-br from-black/30 via-[#6f6bdb]/25 to-[#8a5eae]/30">
            <div className="absolute inset-0 bg-black/10" />
            <div className="relative flex flex-col items-center gap-3 text-white">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white/15 shadow-lg ring-1 ring-white/20 backdrop-blur-sm">
                <Play className="h-7 w-7 fill-white" />
              </div>
              <div className="rounded-full bg-black/25 px-3 py-1 text-xs font-semibold tracking-wide text-white/90 ring-1 ring-white/15">
                Video ready to view
              </div>
            </div>
          </div>
        )}

        {!isImage && !isVideo && <div className="text-4xl sm:text-5xl">📰</div>}

        <div className="absolute inset-0 flex items-center justify-center gap-3 bg-black/50 opacity-0 transition-opacity group-hover:opacity-100">
          <button
            onClick={() => onView(item)}
            className="rounded-full bg-white/20 p-2 text-white transition-all hover:bg-white/30 sm:p-3"
            title="View"
          >
            <Eye className="h-5 w-5 sm:h-6 sm:w-6" />
          </button>
          <button
            onClick={() => onDelete(item.id)}
            className="rounded-full bg-red-500/20 p-2 text-red-300 transition-all hover:bg-red-500/30 sm:p-3"
            title="Delete"
          >
            <Trash2 className="h-5 w-5 sm:h-6 sm:w-6" />
          </button>
        </div>
      </div>

      <div className="p-4 sm:p-5 lg:p-6">
        <h3 className="mb-2 line-clamp-2 text-base font-bold text-white sm:text-lg lg:text-xl">
          {item.title}
        </h3>

        {item.description && (
          <p className="mb-3 line-clamp-2 text-xs text-white/70 sm:text-sm">
            {item.description}
          </p>
        )}

        <div className="flex flex-wrap items-center justify-between gap-2 text-xs sm:text-sm">
          <div className="flex items-center gap-2">
            <span className="rounded-full border border-white/20 bg-white/15 px-2 py-1 text-xs font-semibold text-white/90 sm:px-3">
              {item.type === 'image' ? '🖼️ Image' : item.type === 'video' ? '🎥 Video' : '📝 Update'}
            </span>
          </div>
          <span className="text-xs text-white/50 sm:text-sm">
            {new Date(item.date).toLocaleDateString('en-IN', {
              year: 'numeric',
              month: 'short',
              day: 'numeric'
            })}
          </span>
        </div>
      </div>
    </div>
  );
};

export default NewsCard;
