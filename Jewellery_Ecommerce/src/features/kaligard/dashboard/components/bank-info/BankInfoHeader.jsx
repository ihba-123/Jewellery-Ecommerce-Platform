import { PencilLine, Plus } from "lucide-react";

const BankInfoHeader = ({ isEditing, onEditActiveBank, onAddBank }) => (
  <div className="relative z-10 mb-6 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
    <div className="min-w-0">
      <p className="text-xs  font-bold uppercase tracking-[0.3em] text-white  sm:text-sm">
        <span className="text-2xl">Kaligard Financial Profile</span>
      </p>
      <h1 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
        Financial Details
      </h1>
      <p className="mt-2 max-w-3xl text-sm text-white/75 sm:text-base lg:text-lg">
        Manage your payout accounts and keep multiple bank details organized in
        one place.
      </p>
    </div>

    {!isEditing ? (
      <div className="flex flex-col gap-3 sm:flex-row">
        <button
          type="button"
          onClick={onEditActiveBank}
          className="inline-flex items-center justify-center gap-2 rounded-2xl border border-white/35 bg-white/15 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-black/15 transition-all hover:bg-white/25 lg:text-base"
        >
          <PencilLine className="h-5 w-5" />
          Update Active Bank
        </button>
        <button
          type="button"
          onClick={onAddBank}
          className="inline-flex items-center justify-center gap-2 rounded-2xl border border-white/30 bg-white/10 px-5 py-3 text-sm font-semibold text-white transition-all hover:bg-white/20 lg:text-base"
        >
          <Plus className="h-5 w-5" />
          Add New Bank
        </button>
      </div>
    ) : null}
  </div>
);

export default BankInfoHeader;
