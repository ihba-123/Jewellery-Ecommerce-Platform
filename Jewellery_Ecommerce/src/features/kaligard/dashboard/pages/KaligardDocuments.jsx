import { useEffect, useMemo, useRef, useState } from 'react';
import { PencilLine } from 'lucide-react';
import BusinessInfoEditor from '../components/documents/BusinessInfoEditor';
import BusinessInfoView from '../components/documents/BusinessInfoView';
import DocumentsPanel from '../components/documents/DocumentsPanel';
import ImagePreviewModal from '../components/documents/ImagePreviewModal';
import UploadModal from '../components/documents/UploadModal';
import { DEFAULT_BUSINESS_INFO } from '../components/documents/defaults';

const KaligardDocuments = () => {
  const [businessInfo, setBusinessInfo] = useState(DEFAULT_BUSINESS_INFO);
  const [draftBusinessInfo, setDraftBusinessInfo] = useState(DEFAULT_BUSINESS_INFO);
  const [isEditing, setIsEditing] = useState(false);
  const [documents, setDocuments] = useState([]);
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [uploadError, setUploadError] = useState('');
  const [previewDocument, setPreviewDocument] = useState(null);
  const documentsRef = useRef([]);

  const latestDocument = useMemo(() => documents[documents.length - 1], [documents]);

  useEffect(() => {
    documentsRef.current = documents;
  }, [documents]);

  useEffect(() => {
    return () => {
      documentsRef.current.forEach((document) => {
        if (document.previewUrl) {
          URL.revokeObjectURL(document.previewUrl);
        }
      });
    };
  }, []);

  const openEditMode = () => {
    setDraftBusinessInfo(businessInfo);
    setIsEditing(true);
  };

  const cancelEditMode = () => {
    setDraftBusinessInfo(businessInfo);
    setIsEditing(false);
  };

  const saveBusinessInfo = () => {
    setBusinessInfo(draftBusinessInfo);
    setIsEditing(false);
  };

  const handleDraftChange = (event) => {
    const { name, value } = event.target;
    setDraftBusinessInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileSelect = (event) => {
    const files = Array.from(event.target.files || []);
    if (!files.length) return;

    const validFiles = [];
    const oversizedFiles = [];

    files.forEach((file) => {
      if (file.size > 5 * 1024 * 1024) {
        oversizedFiles.push(file.name);
        return;
      }
      validFiles.push(file);
    });

    if (!validFiles.length) {
      setUploadError('Every selected file must be 5MB or less.');
      setSelectedFiles([]);
      return;
    }

    if (oversizedFiles.length) {
      setUploadError(`Skipped ${oversizedFiles.length} file(s) above 5MB.`);
    } else {
      setUploadError('');
    }

    setSelectedFiles(validFiles);
  };

  const handleUploadDocument = () => {
    if (!selectedFiles.length) {
      setUploadError('Please select at least one file before uploading.');
      return;
    }

    const uploadedDate = new Date().toLocaleDateString();
    const nextDocuments = selectedFiles.map((file, index) => ({
      id: Date.now() + index,
      name: file.name,
      uploadedDate,
      size: `${(file.size / (1024 * 1024)).toFixed(2)} MB`,
      mimeType: file.type,
      previewUrl: URL.createObjectURL(file),
    }));

    setDocuments((prev) => [...prev, ...nextDocuments]);
    setSelectedFiles([]);
    setUploadError('');
    setIsUploadOpen(false);
  };

  return (
    <section className="mx-auto w-full max-w-384 px-1 text-white sm:px-0">
      <div className="relative overflow-hidden rounded-2xl border border-white/20 bg-linear-to-br from-[#6a7fe9] via-[#6158c8] to-[#6e3ca5] p-3 shadow-[0_30px_80px_-30px_rgba(86,27,130,0.7)] sm:rounded-3xl sm:p-5 lg:p-8">
        <div className="pointer-events-none absolute -left-24 top-8 h-56 w-56 rounded-full bg-white/15 blur-3xl" />
        <div className="pointer-events-none absolute -right-16 bottom-8 h-52 w-52 rounded-full bg-[#4d1578]/35 blur-3xl" />

        <div className="relative z-10 mb-6 flex flex-col items-start gap-4 sm:mb-8 sm:flex-row sm:items-start sm:justify-between">
          <div className="min-w-0">
            <h1 className="text-2xl font-bold tracking-tight sm:text-3xl lg:text-4xl xl:text-5xl">Business Registration</h1>
            <p className="mt-2 max-w-3xl text-sm text-white/75 sm:text-base lg:text-lg xl:text-2xl">
              Manage your business information and legal documents.
            </p>
          </div>

          {!isEditing ? (
            <button
              type="button"
              onClick={openEditMode}
              className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-white/35 bg-white/15 px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-black/15 transition-all hover:bg-white/25 sm:w-auto sm:rounded-2xl sm:px-5 sm:py-3 sm:text-base lg:text-lg"
            >
              <PencilLine className="h-5 w-5" />
              Edit Details
            </button>
          ) : null}
        </div>

        <div className="relative z-10 grid grid-cols-1 gap-4 sm:gap-6 xl:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
          <div className="min-w-0 rounded-2xl border border-white/20 bg-white/10 p-4 shadow-[0_24px_50px_-28px_rgba(0,0,0,0.65)] backdrop-blur-md sm:rounded-3xl sm:p-6 lg:p-7">
            {!isEditing ? (
              <BusinessInfoView businessInfo={businessInfo} />
            ) : (
              <BusinessInfoEditor
                businessInfo={draftBusinessInfo}
                onChange={handleDraftChange}
                onCancel={cancelEditMode}
                onSave={saveBusinessInfo}
              />
            )}
          </div>

          <DocumentsPanel
            latestDocument={latestDocument}
            documents={documents}
            onOpenUpload={() => setIsUploadOpen(true)}
            onPreviewDocument={setPreviewDocument}
          />
        </div>
      </div>

      {isUploadOpen ? (
        <UploadModal
          selectedFiles={selectedFiles}
          uploadError={uploadError}
          onClose={() => {
            setIsUploadOpen(false);
            setSelectedFiles([]);
            setUploadError('');
          }}
          onFileSelect={handleFileSelect}
          onUpload={handleUploadDocument}
        />
      ) : null}

      {previewDocument ? (
        <ImagePreviewModal
          document={previewDocument}
          onClose={() => setPreviewDocument(null)}
        />
      ) : null}
    </section>
  );
};

export default KaligardDocuments;
