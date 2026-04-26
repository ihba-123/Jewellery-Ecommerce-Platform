import React, { useState } from 'react';
import AddressCard from '../components/address/AddressCard';
import AddressForm from '../components/address/AddressForm';

const AddressBook = () => {
  const [addresses, setAddresses] = useState([
    {
      id: 1,
      fullName: 'Nita Dangol',
      address: 'Ganeshthanmarga, Balaju',
      postcode: 'Bagmati Province - Kathmandu Metro 16 - NayaBazar Area - Balaju Chowk',
      phoneNumber: '9808372408',
      isBilling: true,
      isShipping: true
    }
  ]);
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const handleAddSubmit = (newAddress) => {
    setAddresses([...addresses, { ...newAddress, id: Date.now() }]);
    setIsAdding(false);
  };

  const handleEditSubmit = (updatedAddress) => {
    setAddresses(addresses.map(addr => addr.id === updatedAddress.id ? updatedAddress : addr));
    setEditingId(null);
  };

  const handleSetDefaultAddress = (type) => {
    if (addresses.length === 0) {
      return;
    }

    const targetId = addresses[0].id;
    setAddresses((prev) =>
      prev.map((addr) => {
        if (type === 'shipping') {
          return { ...addr, isShipping: addr.id === targetId };
        }

        return { ...addr, isBilling: addr.id === targetId };
      })
    );
  };

  const editingAddress = addresses.find(addr => addr.id === editingId);

  return (
    <section className="w-full rounded-xl border border-zinc-200 bg-white p-4 sm:p-6 lg:p-8 shadow-sm">
      <div className="mb-6 flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        <h2 className="text-xl font-semibold text-zinc-800 sm:text-2xl">Address Book</h2>
        <div className="flex flex-wrap items-center gap-2 text-sm font-medium text-cyan-600 sm:gap-3">
          <button
            onClick={() => handleSetDefaultAddress('shipping')}
            className="hover:text-cyan-700"
          >
            Make default shipping address
          </button>
          <span className="hidden text-zinc-400 sm:inline">|</span>
          <button
            onClick={() => handleSetDefaultAddress('billing')}
            className="hover:text-cyan-700"
          >
            Make default billing address
          </button>
        </div>
      </div>

      {isAdding && (
        <div className="mb-4">
          <AddressForm
            onSubmit={handleAddSubmit}
            onCancel={() => setIsAdding(false)}
          />
        </div>
      )}

      {editingId && editingAddress && (
        <div className="mb-4">
          <AddressForm
            initialData={editingAddress}
            onSubmit={handleEditSubmit}
            onCancel={() => setEditingId(null)}
          />
        </div>
      )}

      {!isAdding && !editingId && (
        <div className="rounded-xl border border-zinc-200 bg-zinc-50 p-3 sm:p-4 md:p-5">
          {addresses.length === 0 ? (
            <div className="text-center py-12 text-zinc-500 border border-dashed border-zinc-300 rounded-sm">
              <svg className="w-12 h-12 mx-auto mb-3 text-zinc-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              <p>No addresses found. Add a new address to get started.</p>
            </div>
          ) : (
            <>
              <div className="hidden md:grid md:grid-cols-[1.2fr_2.5fr_1.8fr_1.3fr_1.8fr_auto] gap-4 border-b border-zinc-200 px-4 py-3 text-xs font-semibold uppercase tracking-wide text-zinc-500">
                <p>Full Name</p>
                <p>Address</p>
                <p>Postcode</p>
                <p>Phone Number</p>
                <p>{''}</p>
                <p>{''}</p>
              </div>

              {addresses.map((address) => (
                <AddressCard
                  key={address.id}
                  address={address}
                  onEdit={(addr) => setEditingId(addr.id)}
                />
              ))}

              <div className="mt-5 flex justify-stretch sm:justify-end">
                <button
                  onClick={() => setIsAdding(true)}
                  className="w-full rounded-md bg-cyan-600 px-5 py-2.5 text-sm font-semibold uppercase tracking-wide text-white transition-colors hover:bg-cyan-700 sm:w-auto"
                >
                  + Add New Address
                </button>
              </div>
            </>
          )}
        </div>
      )}
    </section>
  );
};

export default AddressBook;
