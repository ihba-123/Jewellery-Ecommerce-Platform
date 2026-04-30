import { useState } from 'react';

const KaligardDocuments = () => {
  const [documents, setDocuments] = useState([
    { id: 1, name: "Business Registration", file: "registration.pdf", uploadedDate: "2024-01-15", category: "Registration", status: "Verified" },
    { id: 2, name: "GST Certificate", file: "gst_cert.pdf", uploadedDate: "2024-01-16", category: "Tax", status: "Verified" },
    { id: 3, name: "Factory License", file: "factory_license.pdf", uploadedDate: "2024-01-17", category: "License", status: "Pending" },
    { id: 4, name: "Bank Authorization", file: "bank_auth.pdf", uploadedDate: "2024-01-18", category: "Bank", status: "Pending" }
  ]);

  const getStatusColor = (status) => {
    return status === 'Verified'
      ? 'bg-green-500/20 text-green-200'
      : 'bg-yellow-500/20 text-yellow-200';
  };

  return (
    <div className="mx-auto w-full max-w-6xl space-y-6">
      {/* Document Stats */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <StatCard title="Total Documents" value={documents.length} icon="📄" />
        <StatCard title="Verified" value="2" icon="✅" />
        <StatCard title="Pending" value="2" icon="⏳" />
      </div>

      {/* Document Categories */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <CategoryCard
          title="Business Registration Documents"
          description="GST, Business License, Registration"
          icon="🏢"
          count="2"
        />
        <CategoryCard
          title="Bank Account Information"
          description="Bank Details, Authorization Letters"
          icon="🏦"
          count="2"
        />
      </div>

      {/* Documents Table */}
      <div className="rounded-2xl border border-white/15 bg-white/10 backdrop-blur-md overflow-hidden shadow-lg">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/15 bg-white/8">
                <th className="px-4 py-3 text-left text-sm font-semibold text-white">Document Name</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-white">Category</th>
                <th className="px-4 py-3 text-center text-sm font-semibold text-white">Uploaded Date</th>
                <th className="px-4 py-3 text-center text-sm font-semibold text-white">Status</th>
                <th className="px-4 py-3 text-center text-sm font-semibold text-white">Actions</th>
              </tr>
            </thead>
            <tbody>
              {documents.map((doc) => (
                <tr key={doc.id} className="border-b border-white/10 hover:bg-white/8 transition-all">
                  <td className="px-4 py-3 text-white font-medium">{doc.name}</td>
                  <td className="px-4 py-3 text-white/70">{doc.category}</td>
                  <td className="px-4 py-3 text-center text-white/70 text-sm">{doc.uploadedDate}</td>
                  <td className="px-4 py-3 text-center">
                    <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(doc.status)}`}>
                      {doc.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-center space-x-2">
                    <button className="text-blue-300 hover:text-blue-200 transition-all text-sm font-medium">
                      View
                    </button>
                    <button className="text-yellow-300 hover:text-yellow-200 transition-all text-sm font-medium">
                      Replace
                    </button>
                    <button className="text-red-300 hover:text-red-200 transition-all text-sm font-medium">
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Upload New Document */}
      <div className="rounded-2xl border-2 border-dashed border-white/30 bg-white/5 backdrop-blur-md p-8 text-center hover:border-white/50 transition-all cursor-pointer group">
        <div className="text-5xl mb-3 group-hover:scale-110 transition-transform">📤</div>
        <h3 className="text-lg font-semibold text-white mb-1">Upload New Document</h3>
        <p className="text-white/70 text-sm mb-4">Drag and drop or click to upload</p>
        <button className="px-6 py-2.5 rounded-lg bg-gradient-to-r from-[#f5d97c] via-[#d4af37] to-[#a87b12] text-[#231806] font-semibold hover:brightness-110 active:scale-95 transition-all">
          Select File
        </button>
      </div>

      {/* Document Checklist */}
      <div className="rounded-2xl border border-white/15 bg-white/10 backdrop-blur-md p-6 shadow-lg">
        <h3 className="text-lg font-bold text-white mb-4">Required Documents Checklist</h3>
        <div className="space-y-3">
          <ChecklistItem label="Business Registration Document" checked={true} />
          <ChecklistItem label="GST Certificate" checked={true} />
          <ChecklistItem label="Factory License" checked={false} />
          <ChecklistItem label="Bank Account Authorization" checked={false} />
          <ChecklistItem label="Owner ID Proof" checked={false} />
        </div>
      </div>
    </div>
  );
};

const StatCard = ({ title, value, icon }) => (
  <div className="rounded-xl border border-white/15 bg-white/10 backdrop-blur-sm p-4 hover:bg-white/15 transition-all">
    <div className="text-3xl mb-2">{icon}</div>
    <p className="text-white/60 text-sm font-medium">{title}</p>
    <p className="text-2xl font-bold text-white mt-1">{value}</p>
  </div>
);

const CategoryCard = ({ title, description, icon, count }) => (
  <div className="rounded-xl border border-white/15 bg-white/10 backdrop-blur-sm p-4 hover:bg-white/15 transition-all">
    <div className="flex items-start justify-between">
      <div>
        <h4 className="text-base font-semibold text-white">{title}</h4>
        <p className="text-white/70 text-sm mt-1">{description}</p>
      </div>
      <div className="text-3xl">{icon}</div>
    </div>
    <div className="mt-3 inline-block px-3 py-1 rounded-full bg-white/10 text-white/80 text-xs font-medium">
      {count} documents
    </div>
  </div>
);

const ChecklistItem = ({ label, checked }) => (
  <label className="flex items-center gap-3 cursor-pointer hover:bg-white/8 p-3 rounded-lg transition-all">
    <input
      type="checkbox"
      checked={checked}
      onChange={() => {}}
      className="w-5 h-5 rounded border-white/30 bg-white/10 accent-yellow-400 cursor-pointer"
    />
    <span className={`text-sm font-medium ${checked ? 'text-green-300' : 'text-white/70'}`}>
      {label}
    </span>
  </label>
);

export default KaligardDocuments;
