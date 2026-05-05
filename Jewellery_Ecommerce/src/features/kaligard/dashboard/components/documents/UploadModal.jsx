import { Upload, X } from "lucide-react";

const UploadModal = ({
  selectedFiles,
  uploadError,
  onClose,
  onFileSelect,
  onUpload,
}) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
      <div className="max-h-[90vh] w-full max-w-md overflow-y-auto rounded-2xl border border-white/20 bg-[#261738]/95 p-4 text-white shadow-2xl sm:max-w-lg sm:p-6">
        <div className="mb-5 flex items-start justify-between">
          <div>
            <h2 className="text-xl font-bold sm:text-2xl">
              Upload Company Registration
            </h2>
            <p className="mt-1 text-sm text-white/65">
              Accepted formats: PDF, JPG, JPEG and PNG (max 5MB)
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg border border-white/20 bg-white/10 p-2 text-white/70 transition-all hover:bg-white/20 hover:text-white"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <label
          htmlFor="business-registration-upload"
          className="block cursor-pointer rounded-xl border-2 border-dashed border-white/30 bg-white/5 p-6 text-center transition-all hover:bg-white/10"
        >
          <Upload className="mx-auto h-7 w-7 text-white/75" />
          <p className="mt-2 text-sm font-medium">Click to choose file(s)</p>
          <p className="text-xs text-white/60">
            You can select multiple documents
          </p>
        </label>

        <input
          id="business-registration-upload"
          type="file"
          onChange={onFileSelect}
          className="hidden"
          accept=".pdf,.jpg,.jpeg,.png"
          multiple
        />

        {selectedFiles.length > 0 ? (
          <div className="mt-4 rounded-lg border border-white/20 bg-white/10 p-3 text-sm">
            <p className="font-medium">
              Selected: {selectedFiles.length} file(s)
            </p>
            <ul className="no-scrollbar mt-2 max-h-24 list-disc overflow-y-auto overflow-x-hidden pl-5 text-white/85">
              {selectedFiles.map((file) => (
                <li
                  key={`${file.name}-${file.lastModified}`}
                  className="break-all"
                >
                  {file.name}
                </li>
              ))}
            </ul>
          </div>
        ) : null}

        {uploadError ? (
          <div className="mt-3 rounded-lg border border-red-300/40 bg-red-500/15 p-3 text-sm text-red-100">
            {uploadError}
          </div>
        ) : null}

        <div className="mt-5 flex flex-col gap-3 sm:flex-row">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 rounded-xl border border-white/20 bg-white/10 py-2.5 text-sm font-semibold transition-all hover:bg-white/20"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onUpload}
            disabled={!selectedFiles.length}
            className="flex-1 rounded-xl border border-[#f6deb0]/70 bg-linear-to-r from-[#f3ddb0] to-[#d3a857] py-2.5 text-sm font-bold text-[#3d2510] transition-all hover:brightness-105"
          >
            Upload Documents
          </button>
        </div>
      </div>
    </div>
  );
};

export default UploadModal;
