import { Check, X } from "lucide-react";

const Field = ({ label, name, value, onChange, placeholder }) => {
  return (
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
        className="w-full rounded-xl border border-white/25 bg-white/10 px-4 py-3 text-white placeholder:text-white/45 outline-none transition-all focus:border-white/55 focus:bg-white/15"
      />
    </div>
  );
};

const BusinessInfoEditor = ({ businessInfo, onChange, onCancel, onSave }) => {
  return (
    <div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Field
          name="businessName"
          label="Business Name"
          value={businessInfo.businessName}
          onChange={onChange}
          placeholder="Enter business name"
        />
        <Field
          name="registrationNumber"
          label="Registration Number"
          value={businessInfo.registrationNumber}
          onChange={onChange}
          placeholder="Enter registration number"
        />
        <Field
          name="businessType"
          label="Business Type"
          value={businessInfo.businessType}
          onChange={onChange}
          placeholder="Enter business type"
        />
        <Field
          name="websiteUrl"
          label="Website URL"
          value={businessInfo.websiteUrl}
          onChange={onChange}
          placeholder="https://example.com"
        />
      </div>

      <div className="mt-4">
        <label
          htmlFor="businessDescription"
          className="mb-2 block text-sm font-medium text-white/85"
        >
          Business Description
        </label>
        <textarea
          id="businessDescription"
          name="businessDescription"
          value={businessInfo.businessDescription}
          onChange={onChange}
          rows={4}
          placeholder="Write a short business description"
          className="w-full resize-none rounded-xl border border-white/25 bg-white/10 px-4 py-3 text-white placeholder:text-white/45 outline-none transition-all focus:border-white/55 focus:bg-white/15"
        />
      </div>

      <div className="mt-4">
        <label
          htmlFor="registrationNotes"
          className="mb-2 block text-sm font-medium text-white/85"
        >
          Registration Notes
        </label>
        <textarea
          id="registrationNotes"
          name="registrationNotes"
          value={businessInfo.registrationNotes}
          onChange={onChange}
          rows={3}
          placeholder="Add extra registration notes"
          className="w-full resize-none rounded-xl border border-white/25 bg-white/10 px-4 py-3 text-white placeholder:text-white/45 outline-none transition-all focus:border-white/55 focus:bg-white/15"
        />
      </div>

      <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:justify-end">
        <button
          type="button"
          onClick={onCancel}
          className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-white/30 bg-white/10 px-4 py-2 text-sm font-semibold text-white transition-all hover:bg-white/20 sm:w-auto"
        >
          <X className="h-4 w-4" />
          Cancel
        </button>
        <button
          type="button"
          onClick={onSave}
          className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-[#f6deb0]/70 bg-linear-to-r from-[#f3ddb0] to-[#d3a857] px-4 py-2 text-sm font-bold text-[#3d2510] transition-all hover:brightness-105 sm:w-auto"
        >
          <Check className="h-4 w-4" />
          Save Details
        </button>
      </div>
    </div>
  );
};

export default BusinessInfoEditor;
