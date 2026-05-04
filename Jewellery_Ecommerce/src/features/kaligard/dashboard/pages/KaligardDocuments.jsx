import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { X, Upload, FileText } from 'lucide-react';

const KaligardDocuments = () => {
  const navigate = useNavigate();
  const [documents, setDocuments] = useState({
    business: [],
    bank: [],
  });
  const [activeModal, setActiveModal] = useState(null);
  const [selectedDocType, setSelectedDocType] = useState('');
  const [fileName, setFileName] = useState('');

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFileName(file.name);
    }
  };

  const handleUpload = () => {
    if (selectedDocType && fileName) {
      setDocuments(prev => ({
        ...prev,
        [activeModal]: [...prev[activeModal], { name: fileName, type: selectedDocType, uploadedDate: new Date().toLocaleDateString(), id: Date.now() }]
      }));
      setActiveModal(null);
      setSelectedDocType('');
      setFileName('');
    }
  };

  return (
    <div className="mx-auto w-full max-w-6xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Documents</h1>
        <p className="text-white/60">Manage your business documents and bank information</p>
      </div>

      {/* Document Cards Grid */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {/* Business Registration Card */}
        <DocumentCard
          title="Business Registration Document"
          icon="📋"
          documents={documents.business}
          onUpload={() => setActiveModal('business')}
          onViewDetail={() => navigate('/kaligard-dashboard/documents/business', { state: { documents: documents.business } })}
          docType="business"
          docOptions={['Business Registration Number', 'PAN Number']}
        />

        {/* Bank Account Information Card */}
        <DocumentCard
          title="Bank Account Information"
          icon="🏦"
          documents={documents.bank}
          onUpload={() => setActiveModal('bank')}
          onViewDetail={() => navigate('/kaligard-dashboard/documents/bank', { state: { documents: documents.bank } })}
          docType="bank"
          docOptions={['Bank Account Number', 'IFSC Code']}
        />
      </div>

      {/* Upload Modal */}
      {activeModal && (
        <UploadModal
          title={activeModal === 'business' ? 'Business Registration Document' : 'Bank Account Information'}
          onClose={() => setActiveModal(null)}
          onUpload={handleUpload}
          onFileSelect={handleFileSelect}
          docOptions={activeModal === 'business' ? ['Business Registration Number', 'PAN Number'] : ['Bank Account Number', 'IFSC Code']}
          selectedDocType={selectedDocType}
          setSelectedDocType={setSelectedDocType}
          fileName={fileName}
        />
      )}
    </div>
  );
};

const DocumentCard = ({ title, icon, documents, onUpload, docType, onViewDetail, docOptions }) => (
  <div className="rounded-2xl border border-white/15 bg-white/10 backdrop-blur-md p-6 shadow-lg hover:bg-white/15 transition-all cursor-pointer group">
    <div className="flex items-start justify-between mb-4">
      <div className="text-4xl group-hover:scale-110 transition-transform">{icon}</div>
    </div>

    <h3 className="text-xl font-semibold text-white mb-3">{title}</h3>

    {documents && documents.length > 0 ? (
      <div className="space-y-3">
        <div className="p-4 bg-white/5 rounded-lg border border-white/10">
          <p className="text-sm text-white/60 mb-2">Documents: <span className="font-semibold text-white">{documents.length}</span></p>
          <button
            onClick={() => onViewDetail()}
            className="w-full py-2 rounded-lg bg-blue-500/20 text-blue-300 hover:bg-blue-500/30 transition-all text-sm font-medium border border-blue-400/30"
          >
            View All Documents
          </button>
        </div>
        <button
          onClick={onUpload}
          className="w-full py-2 rounded-lg bg-yellow-500/20 text-yellow-300 hover:bg-yellow-500/30 transition-all text-sm font-medium border border-yellow-400/30"
        >
          Add More Document
        </button>
      </div>
    ) : (
      <div className="space-y-3">
        <p className="text-white/70 text-sm">No document uploaded yet</p>
        <div onClick={onUpload} className="flex items-center justify-center gap-2 py-6 border-2 border-dashed border-white/20 rounded-lg hover:border-white/40 transition-all bg-white/5 hover:bg-white/8 cursor-pointer">
          <Upload className="w-5 h-5 text-white/60 hover:text-white/80" />
          <span className="text-white/60 hover:text-white/80 text-sm font-medium">Click to upload</span>
        </div>
      </div>
    )}
  </div>
);

const UploadModal = ({ title, onClose, onUpload, onFileSelect, docOptions, selectedDocType, setSelectedDocType, fileName }) => (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
    <div className="w-full max-w-md rounded-2xl border border-white/15 bg-white/10 backdrop-blur-md p-6 shadow-2xl mx-4">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-white">{title}</h2>
        <button onClick={onClose} className="p-2 rounded-lg hover:bg-white/10 text-white/60 hover:text-white transition-all">
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
            <option key={option} value={option} className="bg-zinc-900">{option}</option>
          ))}
        </select>
      </div>

      <div className="mb-6">
        <label className="block text-sm font-medium text-white/80 mb-3">Upload Document *</label>
        <div className="relative">
          <input type="file" onChange={onFileSelect} className="hidden" id="file-upload" accept=".pdf,.doc,.docx,.jpg,.jpeg,.png" />
          <label htmlFor="file-upload" className="block border-2 border-dashed border-white/20 rounded-xl p-6 text-center cursor-pointer hover:border-white/40 hover:bg-white/8 transition-all bg-white/5">
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
        <button onClick={onClose} className="flex-1 py-3 rounded-xl border border-white/20 bg-white/10 text-white hover:bg-white/15 font-semibold transition-all">Cancel</button>
        <button onClick={onUpload} disabled={!selectedDocType || !fileName} className="flex-1 py-3 rounded-xl bg-gradient-to-r from-[#f5d97c] via-[#d4af37] to-[#a87b12] text-[#231806] font-semibold hover:brightness-110 active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed">Upload Document</button>
      </div>
    </div>
  </div>
);

export default KaligardDocuments;
