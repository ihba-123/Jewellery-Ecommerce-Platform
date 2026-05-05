import { FileText, Upload } from "lucide-react";

const DocumentsPanel = ({
  latestDocument,
  documents,
  onOpenUpload,
  onPreviewDocument,
}) => {
  return (
    <div className="min-w-0 rounded-2xl border border-white/20 bg-white/10 p-4 shadow-[0_24px_50px_-28px_rgba(0,0,0,0.65)] backdrop-blur-md sm:rounded-3xl sm:p-6 lg:p-7">
      <div className="mb-5 flex items-center gap-2 text-lg font-semibold sm:text-xl">
        <FileText className="h-6 w-6 text-white/85" />
        Documents
      </div>

      {latestDocument ? (
        <button
          type="button"
          onClick={onOpenUpload}
          className="w-full overflow-hidden rounded-2xl border border-dashed border-white/25 bg-white/5 px-3 py-5 text-left transition-all hover:bg-white/10 sm:px-4 sm:py-6"
        >
          <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full border border-white/25 bg-white/10">
            <FileText className="h-6 w-6 text-white/80" />
          </div>
          <p className="text-lg font-semibold text-white sm:text-2xl">
            Company Registration
          </p>
          <p
            className="mt-1 truncate text-sm text-white/70 sm:text-base"
            title={latestDocument.name}
          >
            {latestDocument.name}
          </p>
          <p className="mt-1 text-sm text-white/60">
            Total documents: {documents.length}
          </p>
          <p className="mt-1 wrap-break-word text-xs text-white/60 sm:text-sm">
            {latestDocument.size} - Uploaded {latestDocument.uploadedDate}
          </p>
        </button>
      ) : (
        <button
          type="button"
          onClick={onOpenUpload}
          className="w-full rounded-2xl border border-dashed border-white/25 bg-white/5 px-3 py-5 text-center transition-all hover:bg-white/10 sm:px-4 sm:py-6"
        >
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full border border-white/25 bg-white/10">
            <Upload className="h-6 w-6 text-white/80" />
          </div>
          <p className="text-lg font-semibold text-white sm:text-2xl">
            Company Registration
          </p>
          <p className="text-sm text-white/65 sm:text-lg">PDF, JPG up to 5MB</p>
        </button>
      )}

      <button
        type="button"
        onClick={onOpenUpload}
        className="mt-5 w-full rounded-xl border border-white/30 bg-white/15 py-2 text-sm font-semibold transition-all hover:bg-white/25 sm:text-base"
      >
        {latestDocument ? "Add More Documents" : "Upload Documents"}
      </button>

      {documents.length > 0 ? (
        <div className="mt-5 space-y-3">
          <p className="text-sm font-semibold text-white/80">
            Uploaded Documents
          </p>
          <div className="no-scrollbar max-h-56 space-y-2 overflow-y-auto overflow-x-hidden pr-1 sm:max-h-64 lg:max-h-72">
            {documents.map((document) => {
              const isImage = document.mimeType?.startsWith("image/");

              return (
                <button
                  key={document.id}
                  type="button"
                  onClick={() => {
                    if (isImage) {
                      onPreviewDocument(document);
                      return;
                    }
                    window.open(
                      document.previewUrl,
                      "_blank",
                      "noopener,noreferrer",
                    );
                  }}
                  className="flex w-full items-center gap-2.5 rounded-xl border border-white/20 bg-white/5 p-2.5 text-left transition-all hover:bg-white/15 sm:gap-3"
                >
                  {isImage ? (
                    <img
                      src={document.previewUrl}
                      alt={document.name}
                      loading="lazy"
                      className="h-10 w-10 shrink-0 rounded-lg object-cover sm:h-12 sm:w-12"
                    />
                  ) : (
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-white/20 bg-white/10 sm:h-12 sm:w-12">
                      <FileText className="h-5 w-5 text-white/80" />
                    </div>
                  )}

                  <div className="min-w-0 flex-1">
                    <p
                      className="truncate text-xs font-medium text-white sm:text-sm"
                      title={document.name}
                    >
                      {document.name}
                    </p>
                    <p className="wrap-break-word text-[11px] text-white/65 sm:text-xs">
                      {document.size} - {document.uploadedDate}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default DocumentsPanel;
