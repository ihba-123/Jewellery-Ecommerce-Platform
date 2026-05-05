import { AlertCircle, Check, X } from "lucide-react";

const BankInfoForm = ({
  editingId,
  formData,
  errors,
  onChange,
  onSave,
  onCancel,
}) => (
  <div className="relative z-10 mt-6 rounded-2xl border border-white/20 bg-white/10 p-4 shadow-[0_24px_50px_-28px_rgba(0,0,0,0.65)] backdrop-blur-md sm:rounded-3xl sm:p-6 lg:mt-8 lg:p-8">
    <div className="flex flex-col gap-2 border-b border-white/15 pb-4 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <h2 className="text-2xl font-bold sm:text-3xl">
          {editingId ? "Update Bank Detail" : "Add New Bank Detail"}
        </h2>
        <p className="mt-1 text-sm text-white/65 sm:text-base">
          Keep each payout account cleanly separated and easy to switch.
        </p>
      </div>
      <p className="text-xs font-semibold uppercase tracking-[0.24em] text-white/55">
        {editingId ? "Editing Existing Bank" : "Creating Another Bank"}
      </p>
    </div>

    <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
      <Field
        label="Account Holder Name"
        name="accountHolderName"
        value={formData.accountHolderName}
        onChange={onChange}
        placeholder="Enter account holder name"
        error={errors.accountHolderName}
      />
      <Field
        label="Bank Name"
        name="bankName"
        value={formData.bankName}
        onChange={onChange}
        placeholder="Enter bank name"
        error={errors.bankName}
      />
      <Field
        label="Account Number"
        name="accountNumber"
        value={formData.accountNumber}
        onChange={onChange}
        placeholder="Enter account number"
        error={errors.accountNumber}
        maxLength={20}
      />
      <Field
        label="IFSC / SWIFT Code"
        name="ifscCode"
        value={formData.ifscCode}
        onChange={onChange}
        placeholder="Enter IFSC / SWIFT code"
        error={errors.ifscCode}
        maxLength={15}
      />
      <div className="sm:col-span-2">
        <Field
          label="PAN Number"
          name="panNumber"
          value={formData.panNumber}
          onChange={onChange}
          placeholder="Enter PAN number"
          error={errors.panNumber}
          maxLength={12}
        />
      </div>
    </div>

    <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
      <button
        type="button"
        onClick={onCancel}
        className="inline-flex items-center justify-center gap-2 rounded-2xl border border-white/20 bg-white/10 px-5 py-3 text-sm font-semibold text-white transition-all hover:bg-white/20"
      >
        <X className="h-4 w-4" />
        Cancel
      </button>
      <button
        type="button"
        onClick={onSave}
        className="inline-flex items-center justify-center gap-2 rounded-2xl border border-[#f6deb0]/70 bg-linear-to-r from-[#f3ddb0] to-[#d3a857] px-5 py-3 text-sm font-bold text-[#3d2510] transition-all hover:brightness-105"
      >
        <Check className="h-4 w-4" />
        {editingId ? "Update Info" : "Save Bank Detail"}
      </button>
    </div>
  </div>
);

const Field = ({
  label,
  name,
  value,
  onChange,
  placeholder,
  error,
  maxLength,
}) => (
  <div>
    <label
      htmlFor={name}
      className="mb-2 block text-sm font-medium text-white/85"
    >
      {label}
    </label>
    <input
      id={name}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      maxLength={maxLength}
      className={`w-full rounded-2xl border bg-white/10 px-4 py-3 text-white placeholder:text-white/45 outline-none transition-all focus:bg-white/15 ${
        error
          ? "border-red-400/60 focus:border-red-400"
          : "border-white/25 focus:border-white/55"
      }`}
    />

    {error ? (
      <p className="mt-1 inline-flex items-center gap-1 text-xs text-red-200">
        <AlertCircle className="h-3.5 w-3.5" />
        {error}
      </p>
    ) : null}
  </div>
);

export default BankInfoForm;
