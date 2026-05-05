import { useMemo, useState } from 'react';
import BankDetailsPanel from '../components/bank-info/BankDetailsPanel';
import BankInfoForm from '../components/bank-info/BankInfoForm';
import BankInfoHeader from '../components/bank-info/BankInfoHeader';
import BankPreviewCard from '../components/bank-info/BankPreviewCard';
import { EMPTY_BANK_INFO, INITIAL_BANK_ACCOUNTS } from '../components/bank-info/constants';

const KaligardBankInfo = () => {
  const [bankAccounts, setBankAccounts] = useState(INITIAL_BANK_ACCOUNTS);
  const [activeBankId, setActiveBankId] = useState(INITIAL_BANK_ACCOUNTS[0].id);
  const [formData, setFormData] = useState(EMPTY_BANK_INFO);
  const [editingId, setEditingId] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [errors, setErrors] = useState({});

  const activeBank = useMemo(
    () => bankAccounts.find((account) => account.id === activeBankId) || bankAccounts[0],
    [activeBankId, bankAccounts],
  );

  const formatCardNumber = (number) => number.replace(/\D/g, '').replace(/(.{4})/g, '$1 ').trim();

  const startEdit = (account = activeBank) => {
    if (account) {
      setFormData(account);
      setEditingId(account.id);
      setActiveBankId(account.id);
    } else {
      setFormData(EMPTY_BANK_INFO);
      setEditingId(null);
    }

    setErrors({});
    setIsEditing(true);
  };

  const startAddNew = () => {
    setFormData(EMPTY_BANK_INFO);
    setEditingId(null);
    setErrors({});
    setIsEditing(true);
  };

  const cancelEdit = () => {
    setFormData(EMPTY_BANK_INFO);
    setEditingId(null);
    setErrors({});
    setIsEditing(false);
  };

  const validateForm = () => {
    const nextErrors = {};

    if (!formData.accountHolderName.trim() || formData.accountHolderName.trim().length < 3) {
      nextErrors.accountHolderName = 'Account holder name must be at least 3 characters';
    }

    if (!formData.bankName.trim() || formData.bankName.trim().length < 2) {
      nextErrors.bankName = 'Bank name must be at least 2 characters';
    }

    if (!/^\d{9,20}$/.test(formData.accountNumber)) {
      nextErrors.accountNumber = 'Account number must be 9 to 20 digits';
    }

    if (!/^[A-Z0-9]{6,15}$/.test(formData.ifscCode.trim())) {
      nextErrors.ifscCode = 'IFSC / SWIFT code must be 6 to 15 alpha-numeric characters';
    }

    if (!/^[A-Z0-9]{6,12}$/.test(formData.panNumber.trim())) {
      nextErrors.panNumber = 'PAN number must be 6 to 12 alpha-numeric characters';
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    let nextValue = value;

    if (name === 'accountNumber') {
      nextValue = value.replace(/[^\d]/g, '');
    }

    if (name === 'ifscCode' || name === 'panNumber') {
      nextValue = value.toUpperCase().replace(/[^A-Z0-9]/g, '');
    }

    setFormData((prev) => ({
      ...prev,
      [name]: nextValue,
    }));

    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: '',
      }));
    }
  };

  const handleSave = () => {
    if (!validateForm()) return;

    if (editingId) {
      setBankAccounts((prev) => prev.map((account) => (account.id === editingId ? { ...formData, id: editingId } : account)));
      setActiveBankId(editingId);
    } else {
      const newId = Date.now();
      setBankAccounts((prev) => [...prev, { ...formData, id: newId }]);
      setActiveBankId(newId);
    }

    setIsEditing(false);
    setEditingId(null);
    setFormData(EMPTY_BANK_INFO);
  };

  return (
    <section className="mx-auto w-full max-w-7xl text-white">
      <div className="relative overflow-hidden rounded-3xl border border-white/20 bg-linear-to-br from-[#6a7fe9] via-[#6158c8] to-[#6e3ca5] p-4 shadow-[0_30px_80px_-30px_rgba(86,27,130,0.7)] sm:p-5 lg:p-8">
        <div className="pointer-events-none absolute -left-24 top-8 h-56 w-56 rounded-full bg-white/15 blur-3xl" />
        <div className="pointer-events-none absolute -right-16 bottom-8 h-52 w-52 rounded-full bg-[#4d1578]/35 blur-3xl" />

        <BankInfoHeader isEditing={isEditing} onEditActiveBank={() => startEdit(activeBank)} onAddBank={startAddNew} />
        <BankPreviewCard bank={activeBank} formatCardNumber={formatCardNumber} />

        {isEditing ? (
          <BankInfoForm editingId={editingId} formData={formData} errors={errors} onChange={handleChange} onSave={handleSave} onCancel={cancelEdit} />
        ) : (
          <BankDetailsPanel bank={activeBank} />
        )}

        {!isEditing ? (
          <div className="relative z-10 mt-6 grid grid-cols-1 gap-4 lg:grid-cols-2">
            {bankAccounts.map((account) => (
              <button
                key={account.id}
                type="button"
                onClick={() => setActiveBankId(account.id)}
                className={`rounded-2xl border p-4 text-left transition-all sm:p-5 ${
                  activeBankId === account.id ? 'border-emerald-200/60 bg-white/15' : 'border-white/15 bg-white/8 hover:bg-white/12'
                }`}
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/55">Bank Account</p>
                    <p className="mt-2 text-xl font-bold text-white">{account.bankName}</p>
                    <p className="mt-1 text-sm text-white/75">{account.accountHolderName}</p>
                  </div>
                  {activeBankId === account.id ? <span className="rounded-full bg-white/15 px-3 py-1 text-xs font-semibold text-white">Active</span> : null}
                </div>
                <p className="mt-4 text-sm text-white/65">{formatCardNumber(account.accountNumber)}</p>
              </button>
            ))}
          </div>
        ) : null}
      </div>
    </section>
  );
};

export default KaligardBankInfo;