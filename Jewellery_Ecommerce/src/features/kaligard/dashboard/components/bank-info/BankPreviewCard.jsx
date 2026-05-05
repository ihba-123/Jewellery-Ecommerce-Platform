import { Globe2, Smartphone } from "lucide-react";

const BankPreviewCard = ({ bank, formatCardNumber }) => (
  <div className="relative z-10 rounded-[1.75rem] border border-emerald-200/20 bg-linear-to-r from-[#0f2e1f] via-[#184a31] to-[#0f3b2a] p-4 shadow-[0_30px_70px_-40px_rgba(0,0,0,0.9)] sm:p-8">
    <div className="mb-10 flex h-10 w-16 rounded-xl bg-linear-to-r from-[#f7c21b] to-[#e28c00]" />

    <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
      <div>
        <p className="text-sm font-medium uppercase tracking-[0.2em] text-white/55 sm:text-base">
          Account Number
        </p>
        <p className="mt-2 break-all text-2xl font-semibold tracking-[0.2em] text-white sm:text-4xl">
          {formatCardNumber(bank?.accountNumber || "")}
        </p>
        <p className="mt-5 text-sm font-medium uppercase tracking-[0.2em] text-white/55">
          Account Holder
        </p>
        <p className="mt-2 text-2xl font-bold uppercase text-white sm:text-4xl">
          {bank?.accountHolderName || "Not Provided"}
        </p>
      </div>

      <div className="relative pr-2 text-left lg:text-right">
        <Globe2 className="pointer-events-none absolute -right-1 -top-28 h-36 w-36 text-white/25 sm:h-44 sm:w-44" />
        <Smartphone className="pointer-events-none absolute -right-1 -top-31 h-7 w-7 text-white/35" />
        <p className="relative z-10 text-sm font-medium uppercase tracking-[0.2em] text-white/55">
          Bank Name
        </p>
        <p className="relative z-10 mt-2 text-2xl font-bold uppercase text-white sm:text-4xl">
          {bank?.bankName || "Nabil Bank"}
        </p>
      </div>
    </div>
  </div>
);

export default BankPreviewCard;
