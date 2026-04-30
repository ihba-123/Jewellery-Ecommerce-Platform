import { useState } from 'react';

const KaligardBankInfo = () => {
  const [bankInfo, setBankInfo] = useState({
    accountHolderName: "Golden Designs Manufacturing",
    bankName: "National Bank",
    accountNumber: "1234567890",
    ifscCode: "NBANK0001",
    accountType: "Business Savings"
  });

  const [isEditing, setIsEditing] = useState(false);

  return (
    <div className="mx-auto w-full max-w-4xl">
      <div className="rounded-2xl border border-white/15 bg-white/10 backdrop-blur-md p-6 shadow-lg space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-white">Bank Account Information</h1>
          <button
            onClick={() => setIsEditing(!isEditing)}
            className="px-4 py-2 rounded-lg bg-gradient-to-r from-[#f5d97c] via-[#d4af37] to-[#a87b12] text-sm font-semibold text-[#231806] hover:brightness-110 active:scale-95 transition-all"
          >
            {isEditing ? 'Save' : 'Edit'}
          </button>
        </div>

        <div className="space-y-4">
          <DetailItem label="Account Holder Name" value={bankInfo.accountHolderName} editable={isEditing} />
          <DetailItem label="Bank Name" value={bankInfo.bankName} editable={isEditing} />
          <DetailItem label="Account Number" value={bankInfo.accountNumber} editable={isEditing} mask />
          <DetailItem label="IFSC Code" value={bankInfo.ifscCode} editable={isEditing} />
          <DetailItem label="Account Type" value={bankInfo.accountType} editable={isEditing} />
        </div>

        {isEditing && (
          <button
            onClick={() => setIsEditing(false)}
            className="w-full px-4 py-3 rounded-lg border border-white/30 bg-white/10 text-white font-semibold hover:bg-white/20 active:scale-95 transition-all"
          >
            Cancel
          </button>
        )}
      </div>
    </div>
  );
};

const DetailItem = ({ label, value, editable = false, mask = false }) => (
  <div className="rounded-lg border border-white/15 bg-white/8 p-4">
    <p className="text-white/60 text-sm font-medium">{label}</p>
    {!editable ? (
      <p className="text-white mt-1 font-medium">
        {mask ? value.replace(/\d(?=\d{4})/g, '*') : value}
      </p>
    ) : (
      <input
        type={mask ? "password" : "text"}
        defaultValue={value}
        className="w-full h-10 mt-2 rounded-lg border border-white/20 bg-white/8 px-3 text-white placeholder:text-white/40 outline-none transition-all focus:border-white/40 focus:bg-white/12"
      />
    )}
  </div>
);

export default KaligardBankInfo;
