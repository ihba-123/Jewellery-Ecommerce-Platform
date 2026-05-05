import { CreditCard, Wallet2 } from 'lucide-react';

const BankDetailsPanel = ({ bank }) => (
  <div className="relative z-10 mt-6 rounded-2xl border border-white/20 bg-white/10 p-4 shadow-[0_24px_50px_-28px_rgba(0,0,0,0.65)] backdrop-blur-md sm:rounded-3xl sm:p-6 lg:mt-8 lg:p-8">
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-10">
      <div className="space-y-7">
        <SectionHeading icon={Wallet2} title="Primary Account" />
        <InfoField label="Account Holder Name" value={bank?.accountHolderName} />
        <InfoField label="Account Number" value={bank?.accountNumber} />
      </div>

      <div className="space-y-7">
        <SectionHeading icon={CreditCard} title="Banking Details" />
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <InfoField label="IFSC / SWIFT Code" value={bank?.ifscCode} />
          <InfoField label="PAN Number" value={bank?.panNumber} />
        </div>
        <InfoField label="Bank Name" value={bank?.bankName} />
      </div>
    </div>
  </div>
);

const SectionHeading = ({ icon: Icon, title }) => (
  <div className="flex items-center gap-2 text-lg font-semibold sm:text-2xl">
    <Icon className="h-6 w-6 text-white/85" />
    {title}
  </div>
);

const InfoField = ({ label, value }) => (
  <div>
    <p className="text-sm font-semibold uppercase tracking-[0.08em] text-white/55 sm:text-lg">{label}</p>
    <p className="mt-2 wrap-break-word text-xl text-white/90 sm:text-3xl">{value || 'Not Provided'}</p>
  </div>
);

export default BankDetailsPanel;