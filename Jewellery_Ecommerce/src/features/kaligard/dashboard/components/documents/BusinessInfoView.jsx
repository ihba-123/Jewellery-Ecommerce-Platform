const InfoRow = ({ label, value }) => {
  return (
    <div>
      <p className="text-base font-semibold text-white/85 sm:text-xl">
        {label}
      </p>
      <p className="mt-2 wrap-break-word text-base text-white/75 sm:text-xl lg:text-2xl xl:text-3xl">
        {value || "Not provided"}
      </p>
    </div>
  );
};

const BusinessInfoView = ({ businessInfo }) => {
  return (
    <div className="grid grid-cols-1 gap-y-5 text-white/90 sm:grid-cols-2 sm:gap-x-6 sm:gap-y-6 lg:gap-x-8 lg:gap-y-7">
      <InfoRow label="Business Name" value={businessInfo.businessName} />
      <InfoRow
        label="Registration Number"
        value={businessInfo.registrationNumber}
      />
      <InfoRow label="Business Type" value={businessInfo.businessType} />
      <InfoRow label="Website URL" value={businessInfo.websiteUrl} />

      <div className="sm:col-span-2">
        <p className="text-base font-semibold text-white/85 sm:text-xl">
          Business Description
        </p>
        <p className="mt-2 wrap-break-word text-base text-white/75 sm:text-xl lg:text-2xl xl:text-3xl">
          {businessInfo.businessDescription || "Not provided"}
        </p>
      </div>

      <div className="sm:col-span-2">
        <p className="text-base font-semibold text-white/85 sm:text-xl">
          Registration Notes
        </p>
        <div className="mt-2 rounded-xl border border-white/20 bg-white/10 p-3 text-sm text-white/80 sm:p-4 sm:text-base">
          {businessInfo.registrationNotes || "Not provided"}
        </div>
      </div>
    </div>
  );
};

export default BusinessInfoView;
