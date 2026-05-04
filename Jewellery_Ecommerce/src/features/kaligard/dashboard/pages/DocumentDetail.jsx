import { useState } from 'react';
import { X, Upload, FileText, CheckCircle, ArrowLeft, Trash2 } from 'lucide-react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';

const DocumentDetail = () => {
  const { documentType } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const documents = location.state?.documents || [];
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [selectedDocType, setSelectedDocType] = useState('');
  const [fileName, setFileName] = useState('');
  const [localDocuments, setLocalDocuments] = useState(documents);

  const docOptions = documentType === 'business'
    ? ['Business Registration Number', 'PAN Number']
    : ['Bank Account Number', 'IFSC Code'];

  const title = documentType === 'business'
    ? 'Business Registration Document'
    : 'Bank Account Information';

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFileName(file.name);
    }
  };

  const handleUpload = () => {
    if (selectedDocType && fileName) {
      const newDoc = { name: fileName, type: selectedDocType, uploadedDate: new Date().toLocaleDateString(), id: Date.now() };
      setLocalDocuments([...localDocuments, newDoc]);
      setShowUploadModal(false);
      setSelectedDocType('');
      setFileName('');
    }
  };

  const handleDelete = (id) => {
    setLocalDocuments(localDocuments.filter(doc => doc.id !== id));
  };

  return (
    <div className="mx-auto w-full max-w-4xl">
      {/* Header */}
      <div className="mb-8 flex items-center gap-4">
        <button
          onClick={() => navigate('/kaligard-dashboard/documents')}
          className="p-2 rounded-lg hover:bg-white/10 text-white/60 hover:text-white transition-all"
        >
          <ArrowLeft className="w-6 h-6" />
        </button>
        <div>
          <h1 className="text-3xl font-bold text-white">{title}</h1>
          <p className="text-white/60">Manage and add your documents</p>
        </div>
      </div>

      {/* Documents List */}
      <div className="space-y-4 mb-8">
        {localDocuments && localDocuments.length > 0 ? (
          localDocuments.map((doc, index) => (
            <div key={doc.id} className="p-6 bg-white/5 rounded-xl border border-white/10 hover:bg-white/8 transition-all">
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-4 flex-1">
                  <div className="p-3 rounded-lg bg-yellow-500/20 flex-shrink-0">
                    <FileText className="w-6 h-6 text-yellow-400" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-white/60 mb-1">Document {index + 1}</p>
                    <p className="text-lg font-semibold text-white truncate">{doc.name}</p>
                    <p className="text-sm text-white/60 mt-2">{doc.type} • {doc.uploadedDate}</p>
                  </div>
                </div>
                <button
                  onClick={() => handleDelete(doc.id)}
                  className="p-2 rounded-lg hover:bg-red-500/20 text-red-400 hover:text-red-300 transition-all flex-shrink-0"
                  title="Delete document"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="p-8 bg-white/5 rounded-xl border border-white/10 text-center">
            <p className="text-white/60">No documents uploaded yet</p>
          </div>
        )}
      </div>

      {/* Add Document Card */}
      <div className="rounded-2xl border border-white/15 bg-white/10 backdrop-blur-md p-8 shadow-lg">
        <div className="text-center">
          <div className="flex justify-center mb-4">
            <div className="p-4 rounded-lg bg-yellow-500/20">
              <Upload className="w-8 h-8 text-yellow-400" />
            </div>
          </div>
          <h2 className="text-xl font-semibold text-white mb-2">Add Another Document</h2>
          <p className="text-white/60 mb-6">Upload additional {title.toLowerCase()}</p>
          <button
            onClick={() => setShowUploadModal(true)}
            className="px-8 py-3 rounded-xl bg-gradient-to-r from-[#f5d97c] via-[#d4af37] to-[#a87b12] text-[#231806] font-semibold hover:brightness-110 active:scale-95 transition-all"
          >
            Add Document
          </button>
        </div>
      </div>

      {/* Back Button */}
      <div className="mt-8 flex justify-start">
        <button
          onClick={() => navigate('/kaligard-dashboard/documents')}
          className="px-6 py-3 rounded-xl border border-white/20 bg-white/10 text-white hover:bg-white/15 font-semibold transition-all"
        >
          Back to Documents
        </button>
      </div>

      {/* Upload Modal */}
      {showUploadModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-2xl border border-white/15 bg-white/10 backdrop-blur-md p-6 shadow-2xl mx-4">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-white">Add Document</h2>
              <button
                onClick={() => setShowUploadModal(false)}
                className="p-2 rounded-lg hover:bg-white/10 text-white/60 hover:text-white transition-all"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-white/80 mb-3">Document Type *</label>
              <select
                value={selectedDocType}
                onChange={(e) => setSelectedDocType(e.target.value)}
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/40 focus:ring-2 focus:border-amber-500 outline-none transition-all appearance-none"
              >
                <option value="">Select document type</option>
                {docOptions.map((option) => (
                  <option key={option} value={option} className="bg-zinc-900">
                    {option}
                  </option>
                ))}
              </select>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-white/80 mb-3">Upload Document *</label>
              <div className="relative">
                <input
                  type="file"
                  onChange={handleFileSelect}
                  className="hidden"
                  id="file-upload"
                  accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                />
                <label
                  htmlFor="file-upload"
                  className="block border-2 border-dashed border-white/20 rounded-xl p-6 text-center cursor-pointer hover:border-white/40 hover:bg-white/8 transition-all bg-white/5"
                >
                  <Upload className="w-8 h-8 text-white/60 mx-auto mb-2" />
                  <p className="text-white/80 font-medium">Click to upload or drag and drop</p>
                  <p className="text-white/40 text-sm">PDF, DOC, DOCX, JPG, PNG (Max 10MB)</p>
                </label>
              </div>
              {fileName && (
                <div className="mt-3 p-3 bg-green-500/10 border border-green-400/30 rounded-lg flex items-center gap-2">
                  <FileText className="w-5 h-5 text-green-400" />
                  <span className="text-green-300 text-sm font-medium">{fileName}</span>
                </div>
              )}
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setShowUploadModal(false)}
                className="flex-1 py-3 rounded-xl border border-white/20 bg-white/10 text-white hover:bg-white/15 font-semibold transition-all"
              >
                Cancel
              </button>
              <button
                onClick={handleUpload}
                disabled={!selectedDocType || !fileName}
                className="flex-1 py-3 rounded-xl bg-gradient-to-r from-[#f5d97c] via-[#d4af37] to-[#a87b12] text-[#231806] font-semibold hover:brightness-110 active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Upload Document
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DocumentDetail;
