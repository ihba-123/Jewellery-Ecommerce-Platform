import { X } from "lucide-react";

const ImagePreviewModal = ({ document, onClose }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-4 backdrop-blur-sm">
      <div className="relative max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-2xl border border-white/20 bg-[#1f1231] p-3 shadow-2xl sm:p-4">
        <button
          type="button"
          onClick={onClose}
          className="absolute right-3 top-3 z-10 rounded-lg border border-white/20 bg-black/40 p-2 text-white/80 transition-all hover:bg-black/65 hover:text-white"
        >
          <X className="h-5 w-5" />
        </button>

        <p className="mb-3 break-all pr-10 text-xs font-medium text-white/80 sm:text-sm">
          {document.name}
        </p>
        <img
          src={document.previewUrl}
          alt={document.name}
          className="max-h-[75vh] w-full rounded-xl object-contain"
        />
      </div>
    </div>
  );
};

export default ImagePreviewModal;
