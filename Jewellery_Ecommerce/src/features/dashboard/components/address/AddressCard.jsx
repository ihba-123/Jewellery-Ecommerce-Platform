import React from 'react';

const AddressCard = ({ address, onEdit }) => {
  return (
    <div className="border-t border-white/15 px-3 py-4 sm:px-4">
      <div className="grid grid-cols-1 items-start gap-3 text-sm text-white md:grid-cols-[1.2fr_2.5fr_1.8fr_1.3fr_1.8fr_auto] md:gap-4">
        <div>
          <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-white/60 md:hidden">Full Name</p>
          <p className="font-medium text-white">{address.fullName}</p>
        </div>

        <div>
          <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-white/60 md:hidden">Address</p>
          <div className="flex items-start gap-2">
            <span className="mt-0.5 rounded-full bg-yellow-500/30 px-2 py-0.5 text-[10px] font-semibold leading-none text-yellow-200 border border-yellow-400/30">HOME</span>
            <p className="leading-relaxed text-white/80">{address.address}</p>
          </div>
        </div>

        <div>
          <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-white/60 md:hidden">Postcode</p>
          <p className="leading-relaxed text-white/80">{address.postcode}</p>
        </div>

        <div>
          <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-white/60 md:hidden">Phone Number</p>
          <p className="text-white/80">{address.phoneNumber}</p>
        </div>

        <div className="space-y-1 text-xs font-medium leading-relaxed text-yellow-300 sm:text-sm">
          {address.isShipping && <p>Default Shipping Address</p>}
          {address.isBilling && <p>Default Billing Address</p>}
        </div>

        <div className="pt-0.5 md:text-right">
          <button
            onClick={() => onEdit(address)}
            className="text-sm font-semibold uppercase tracking-wide text-yellow-300 hover:text-yellow-200 transition-colors"
          >
            Edit
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddressCard;
