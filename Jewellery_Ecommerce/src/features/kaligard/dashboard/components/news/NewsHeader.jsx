import { Plus } from 'lucide-react';

const NewsHeader = ({ onAddClick }) => {
  return (
    <div className="flex flex-col gap-3 sm:gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div className="min-w-0 flex-1">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-2">
          NEWS & INFO
        </h1>
        <p className="text-sm sm:text-base text-white/70">
          Post promotional videos, pictures and news updates for your showroom.
        </p>
      </div>
      <button
        onClick={onAddClick}
        className="inline-flex items-center justify-center gap-2 px-4 sm:px-6 py-2.5 sm:py-3 rounded-xl bg-white text-[#3d2510] font-bold text-sm sm:text-base transition-all hover:bg-white/90 shadow-lg hover:shadow-xl shrink-0"
      >
        <Plus className="h-5 w-5 sm:h-6 sm:w-6" />
        <span>ADD NEWS/MEDIA</span>
      </button>
    </div>
  );
};

export default NewsHeader;
