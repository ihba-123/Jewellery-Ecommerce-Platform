import { useState } from 'react';
import { Edit, Trash2, Plus, X, Check, AlertCircle } from 'lucide-react';

const KaligardBankInfo = () => {
  const [bankAccounts, setBankAccounts] = useState([
    {
      id: 1,
      accountHolderName: "Golden Designs Manufacturing",
      bankName: "National Bank",
      accountNumber: "1234567890",
      ifscCode: "NBANK0001",
      accountType: "Business Savings"
    }
  ]);
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    accountHolderName: '',
    bankName: '',
    accountNumber: '',
    ifscCode: '',
    accountType: ''
  });
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};

    if (!formData.accountHolderName.trim()) {
      newErrors.accountHolderName = 'Account holder name is required';
    } else if (formData.accountHolderName.trim().length < 3) {
      newErrors.accountHolderName = 'Name must be at least 3 characters';
    }

    if (!formData.bankName.trim()) {
      newErrors.bankName = 'Bank name is required';
    } else if (formData.bankName.trim().length < 2) {
      newErrors.bankName = 'Bank name must be at least 2 characters';
    }

    if (!formData.accountNumber.trim()) {
      newErrors.accountNumber = 'Account number is required';
    } else if (formData.accountNumber.trim().length < 9) {
      newErrors.accountNumber = 'Account number must be at least 9 digits';
    } else if (!/^\d+$/.test(formData.accountNumber)) {
      newErrors.accountNumber = 'Account number must contain only numbers';
    }

    if (!formData.ifscCode.trim()) {
      newErrors.ifscCode = 'IFSC code is required';
    } else if (!/^[A-Z]{4}0[A-Z0-9]{6}$/.test(formData.ifscCode)) {
      newErrors.ifscCode = 'IFSC code must be in format ABCD0123456 (11 characters)';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleAdd = () => {
    setEditingId(null);
    setFormData({
      accountHolderName: '',
      bankName: '',
      accountNumber: '',
      ifscCode: '',
      accountType: ''
    });
    setErrors({});
    setShowModal(true);
  };

  const handleEdit = (account) => {
    setEditingId(account.id);
    setFormData(account);
    setErrors({});
    setShowModal(true);
  };

  const handleSave = () => {
    if (!validateForm()) {
      return;
    }

    if (editingId) {
      setBankAccounts(bankAccounts.map(acc => acc.id === editingId ? { ...formData, id: editingId } : acc));
    } else {
      setBankAccounts([...bankAccounts, { ...formData, id: Date.now() }]);
    }
    setShowModal(false);
    setFormData({
      accountHolderName: '',
      bankName: '',
      accountNumber: '',
      ifscCode: '',
      accountType: ''
    });
    setErrors({});
  };

  const handleDelete = (id) => {
    if (confirm('Are you sure you want to delete this bank account?')) {
      setBankAccounts(bankAccounts.filter(acc => acc.id !== id));
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Restrict account number to digits only
    if (name === 'accountNumber') {
      const numericValue = value.replace(/[^\d]/g, '');
      setFormData(prev => ({ ...prev, [name]: numericValue }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }

    // Clear error for this field on change
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  return (
    <div className="mx-auto w-full max-w-6xl">
      {/* Header */}
      <div className="mb-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Bank Account Information</h1>
            <p className="text-white/60">Manage your bank accounts</p>
          </div>
          <button
            onClick={handleAdd}
            className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-[#f5d97c] via-[#d4af37] to-[#a87b12] text-[#231806] font-semibold hover:brightness-110 active:scale-95 transition-all whitespace-nowrap shadow-lg hover:shadow-xl"
          >
            <Plus className="w-5 h-5" />
            Add Bank Account
          </button>
        </div>
      </div>

      {/* Bank Accounts Grid */}
      {bankAccounts && bankAccounts.length > 0 ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {bankAccounts.map((account) => (
            <div key={account.id} className="rounded-2xl border border-white/15 bg-white/10 backdrop-blur-md p-6 shadow-lg hover:shadow-2xl hover:border-white/25 hover:bg-white/15 transition-all duration-300">
              {/* Header */}
              <div className="flex items-start justify-between mb-5 pb-4 border-b border-white/10">
                <div className="flex-1">
                  <p className="text-white/60 text-xs font-semibold uppercase tracking-wider mb-2">Account Holder</p>
                  <h3 className="text-xl font-bold text-white">{account.accountHolderName}</h3>
                </div>
                <div className="flex gap-2 ml-4 flex-shrink-0">
                  <button
                    onClick={() => handleEdit(account)}
                    className="p-2.5 rounded-lg hover:bg-blue-500/30 text-blue-300 hover:text-blue-100 transition-all hover:scale-110 active:scale-95"
                    title="Edit"
                  >
                    <Edit className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => handleDelete(account.id)}
                    className="p-2.5 rounded-lg hover:bg-red-500/30 text-red-300 hover:text-red-100 transition-all hover:scale-110 active:scale-95"
                    title="Delete"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Details Grid */}
              <div className="space-y-3">
                <DetailItem label="Bank Name" value={account.bankName} />
                <DetailItem label="Account Number" value={account.accountNumber} mask />
                <DetailItem label="IFSC Code" value={account.ifscCode} />
                <DetailItem label="Account Type" value={account.accountType} />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="rounded-2xl border border-white/15 bg-white/10 backdrop-blur-md p-12 shadow-lg text-center mb-8">
          <p className="text-white/60 mb-6">No bank accounts added yet</p>
          <button
            onClick={handleAdd}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-[#f5d97c] via-[#d4af37] to-[#a87b12] text-[#231806] font-semibold hover:brightness-110 active:scale-95 transition-all shadow-lg hover:shadow-xl"
          >
            <Plus className="w-5 h-5" />
            Add First Bank Account
          </button>
        </div>
      )}

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="w-full max-w-md rounded-2xl border border-white/15 bg-white/10 backdrop-blur-md p-6 shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-white/10">
              <h2 className="text-2xl font-bold text-white">
                {editingId ? 'Edit Bank Account' : 'Add Bank Account'}
              </h2>
              <button
                onClick={() => setShowModal(false)}
                className="p-2 rounded-lg hover:bg-white/10 text-white/60 hover:text-white transition-all active:scale-95"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4 mb-6">
              {/* Account Holder Name */}
              <div>
                <label className="block text-sm font-semibold text-white/90 mb-2.5">Account Holder Name *</label>
                <input
                  type="text"
                  name="accountHolderName"
                  value={formData.accountHolderName}
                  onChange={handleChange}
                  placeholder="Enter account holder name"
                  className={`w-full px-4 py-3 bg-white/10 border ${errors.accountHolderName ? 'border-red-500/50' : 'border-white/20'} rounded-lg text-white placeholder-white/50 focus:ring-2 ${errors.accountHolderName ? 'focus:ring-red-400/50 focus:border-red-400/50' : 'focus:ring-yellow-400/50 focus:border-yellow-400/50'} outline-none transition-all hover:bg-white/15 hover:border-white/30`}
                />
                {errors.accountHolderName && (
                  <div className="flex items-center gap-2 mt-2 text-red-400 text-sm">
                    <AlertCircle className="w-4 h-4" />
                    {errors.accountHolderName}
                  </div>
                )}
              </div>

              {/* Bank Name */}
              <div>
                <label className="block text-sm font-semibold text-white/90 mb-2.5">Bank Name *</label>
                <input
                  type="text"
                  name="bankName"
                  value={formData.bankName}
                  onChange={handleChange}
                  placeholder="Enter bank name"
                  className={`w-full px-4 py-3 bg-white/10 border ${errors.bankName ? 'border-red-500/50' : 'border-white/20'} rounded-lg text-white placeholder-white/50 focus:ring-2 ${errors.bankName ? 'focus:ring-red-400/50 focus:border-red-400/50' : 'focus:ring-yellow-400/50 focus:border-yellow-400/50'} outline-none transition-all hover:bg-white/15 hover:border-white/30`}
                />
                {errors.bankName && (
                  <div className="flex items-center gap-2 mt-2 text-red-400 text-sm">
                    <AlertCircle className="w-4 h-4" />
                    {errors.bankName}
                  </div>
                )}
              </div>

              {/* Account Number */}
              <div>
                <label className="block text-sm font-semibold text-white/90 mb-2.5">Account Number * (Numbers only)</label>
                <input
                  type="text"
                  name="accountNumber"
                  value={formData.accountNumber}
                  onChange={handleChange}
                  placeholder="Enter account number (digits only)"
                  maxLength="20"
                  className={`w-full px-4 py-3 bg-white/10 border ${errors.accountNumber ? 'border-red-500/50' : 'border-white/20'} rounded-lg text-white placeholder-white/50 focus:ring-2 ${errors.accountNumber ? 'focus:ring-red-400/50 focus:border-red-400/50' : 'focus:ring-yellow-400/50 focus:border-yellow-400/50'} outline-none transition-all hover:bg-white/15 hover:border-white/30`}
                />
                {errors.accountNumber && (
                  <div className="flex items-center gap-2 mt-2 text-red-400 text-sm">
                    <AlertCircle className="w-4 h-4" />
                    {errors.accountNumber}
                  </div>
                )}
              </div>

              {/* IFSC Code */}
              <div>
                <label className="block text-sm font-semibold text-white/90 mb-2.5">IFSC Code * (Format: ABCD0123456)</label>
                <input
                  type="text"
                  name="ifscCode"
                  value={formData.ifscCode.toUpperCase()}
                  onChange={(e) => {
                    const val = e.target.value.toUpperCase();
                    setFormData(prev => ({ ...prev, ifscCode: val }));
                    if (errors.ifscCode) {
                      setErrors(prev => ({ ...prev, ifscCode: '' }));
                    }
                  }}
                  placeholder="e.g., NBANK0001"
                  maxLength="11"
                  className={`w-full px-4 py-3 bg-white/10 border ${errors.ifscCode ? 'border-red-500/50' : 'border-white/20'} rounded-lg text-white placeholder-white/50 focus:ring-2 ${errors.ifscCode ? 'focus:ring-red-400/50 focus:border-red-400/50' : 'focus:ring-yellow-400/50 focus:border-yellow-400/50'} outline-none transition-all hover:bg-white/15 hover:border-white/30 uppercase`}
                />
                {errors.ifscCode && (
                  <div className="flex items-center gap-2 mt-2 text-red-400 text-sm">
                    <AlertCircle className="w-4 h-4" />
                    {errors.ifscCode}
                  </div>
                )}
              </div>

              {/* Account Type */}
              <div>
                <label className="block text-sm font-semibold text-white/90 mb-2.5">Account Type</label>
                <select
                  name="accountType"
                  value={formData.accountType}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:ring-2 focus:ring-yellow-400/50 focus:border-yellow-400/50 outline-none transition-all hover:bg-white/15 hover:border-white/30 appearance-none cursor-pointer"
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%23ffffff' d='M6 9L1 4h10z'/%3E%3C/svg%3E")`,
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'right 12px center',
                    paddingRight: '36px'
                  }}
                >
                  <option value="" style={{ backgroundColor: '#1a1a2e', color: '#ffffff' }}>Select account type</option>
                  <option value="Business Savings" style={{ backgroundColor: '#1a1a2e', color: '#ffffff' }}>Business Savings</option>
                  <option value="Business Current" style={{ backgroundColor: '#1a1a2e', color: '#ffffff' }}>Business Current</option>
                  <option value="Personal Savings" style={{ backgroundColor: '#1a1a2e', color: '#ffffff' }}>Personal Savings</option>
                  <option value="Personal Current" style={{ backgroundColor: '#1a1a2e', color: '#ffffff' }}>Personal Current</option>
                </select>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setShowModal(false)}
                className="flex-1 py-3 rounded-lg border border-white/20 bg-white/10 text-white hover:bg-white/15 hover:border-white/30 font-semibold transition-all active:scale-95"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="flex-1 py-3 rounded-lg bg-gradient-to-r from-[#f5d97c] via-[#d4af37] to-[#a87b12] text-[#231806] font-semibold hover:brightness-110 active:scale-95 transition-all flex items-center justify-center gap-2 shadow-lg"
              >
                <Check className="w-5 h-5" />
                {editingId ? 'Update' : 'Add'}
              </button>
            </div>
          </div>
        </div>
      )}

      <style>{`
        select::-webkit-outer-spin-button,
        select::-webkit-inner-spin-button {
          -webkit-appearance: none;
          margin: 0;
        }
        select option {
          background-color: #1a1a2e;
          color: #ffffff;
          padding: 8px;
        }
        select option:hover {
          background: linear-gradient(#667eea, #764ba2);
          background-color: #667eea;
        }
      `}</style>
    </div>
  );
};

const DetailItem = ({ label, value, mask = false }) => (
  <div className="rounded-lg border border-white/10 bg-white/5 p-3.5 hover:bg-white/8 hover:border-white/20 transition-all">
    <p className="text-white/60 text-xs font-semibold uppercase tracking-wider mb-1.5">{label}</p>
    <p className="text-white font-semibold text-sm">
      {mask ? value.replace(/\d(?=\d{4})/g, '*') : value}
    </p>
  </div>
);

export default KaligardBankInfo;
