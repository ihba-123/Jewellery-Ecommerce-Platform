import React from 'react';

const AddressCard = ({ address, onEdit }) => {
  return (
    <div className="border-t border-zinc-200 px-3 py-4 sm:px-4">
      <div className="grid grid-cols-1 items-start gap-3 text-sm text-zinc-800 md:grid-cols-[1.2fr_2.5fr_1.8fr_1.3fr_1.8fr_auto] md:gap-4">
        <div>
          <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-zinc-500 md:hidden">Full Name</p>
          <p className="font-medium text-zinc-900">{address.fullName}</p>
        </div>

        <div>
          <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-zinc-500 md:hidden">Address</p>
          <div className="flex items-start gap-2">
            <span className="mt-0.5 rounded-full bg-orange-500 px-2 py-0.5 text-[10px] font-semibold leading-none text-white">HOME</span>
            <p className="leading-relaxed text-zinc-700">{address.address}</p>
          </div>
        </div>

        <div>
          <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-zinc-500 md:hidden">Postcode</p>
          <p className="leading-relaxed text-zinc-700">{address.postcode}</p>
        </div>

        <div>
          <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-zinc-500 md:hidden">Phone Number</p>
          <p className="text-zinc-700">{address.phoneNumber}</p>
        </div>

        <div className="space-y-1 text-xs font-medium leading-relaxed text-cyan-700 sm:text-sm">
          {address.isShipping && <p>Default Shipping Address</p>}
          {address.isBilling && <p>Default Billing Address</p>}
        </div>

        <div className="pt-0.5 md:text-right">
          <button
            onClick={() => onEdit(address)}
            className="text-sm font-semibold uppercase tracking-wide text-cyan-600 hover:text-cyan-700"
          >
            Edit
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddressCard;
