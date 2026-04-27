import React, { useState } from 'react';
import AddressCard from '../components/address/AddressCard';
import AddressForm from '../components/address/AddressForm';

const AddressBook = () => {
  const [addresses, setAddresses] = useState([
    {
      id: 1,
      fullName: 'Ram Bahadur Thapa',
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
    if (addresses.length === 0) return;
    const targetId = addresses[0].id;
    setAddresses((prev) =>
      prev.map((addr) => {
        if (type === 'shipping') return { ...addr, isShipping: addr.id === targetId };
        return { ...addr, isBilling: addr.id === targetId };
      })
    );
  };

  const editingAddress = addresses.find(addr => addr.id === editingId);

  return (
    <section className="w-full rounded-xl border border-zinc-200 bg-white shadow-sm" style={{ padding: '1.25rem 1.25rem 1.5rem' }}>

      {/* ── Header ─────────────────────────────────── */}
      <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <h2 style={{ fontSize: '1rem', fontWeight: 700, color: '#18181b', margin: 0 }}>
          Address Book
        </h2>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
          <button
            onClick={() => handleSetDefaultAddress('shipping')}
            style={{
              fontSize: '0.72rem', fontWeight: 600, color: '#0891b2',
              background: 'none', border: 'none', cursor: 'pointer', padding: 0,
              minHeight: 'unset', minWidth: 'unset',
            }}
            className="hover:text-cyan-700"
          >
            Make default shipping
          </button>
          <span style={{ color: '#d4d4d8', fontSize: '0.75rem' }}>|</span>
          <button
            onClick={() => handleSetDefaultAddress('billing')}
            style={{
              fontSize: '0.72rem', fontWeight: 600, color: '#0891b2',
              background: 'none', border: 'none', cursor: 'pointer', padding: 0,
              minHeight: 'unset', minWidth: 'unset',
            }}
            className="hover:text-cyan-700"
          >
            Make default billing
          </button>
        </div>
      </div>

      {/* ── Forms ──────────────────────────────────── */}
      {isAdding && (
        <div className="mb-4">
          <AddressForm onSubmit={handleAddSubmit} onCancel={() => setIsAdding(false)} />
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

      {/* ── Table area ─────────────────────────────── */}
      {!isAdding && !editingId && (
        <div
          className="rounded-xl border border-zinc-200 bg-zinc-50"
          style={{ overflow: 'hidden' }}
        >
          {addresses.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '2.5rem 1rem', color: '#71717a' }}>
              <svg style={{ width: '2.5rem', height: '2.5rem', margin: '0 auto 0.75rem', color: '#d4d4d8' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              <p style={{ fontSize: '0.82rem' }}>No addresses found. Add a new address to get started.</p>
            </div>
          ) : (
            <>
              {/* Table header — desktop only */}
              <div
                className="hidden md:grid"
                style={{
                  gridTemplateColumns: '1fr 1.8fr 2fr 1fr 1.6fr 3rem',
                  gap: '0.75rem',
                  padding: '0.55rem 1rem',
                  borderBottom: '1px solid #e4e4e7',
                  background: '#fafafa',
                }}
              >
                {['Full Name', 'Address', 'Postcode', 'Phone', '', ''].map((col, i) => (
                  <span
                    key={i}
                    style={{
                      fontSize: '0.65rem',
                      fontWeight: 700,
                      textTransform: 'uppercase',
                      letterSpacing: '0.08em',
                      color: '#a1a1aa',
                    }}
                  >
                    {col}
                  </span>
                ))}
              </div>

              {/* Address rows */}
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                {addresses.map((address, idx) => (
                  <AddressCard
                    key={address.id}
                    address={address}
                    onEdit={(addr) => setEditingId(addr.id)}
                    isLast={idx === addresses.length - 1}
                  />
                ))}
              </div>

              {/* Add button */}
              <div
                style={{
                  padding: '0.75rem 1rem',
                  borderTop: '1px solid #e4e4e7',
                  display: 'flex',
                  justifyContent: 'flex-end',
                }}
              >
                <button
                  onClick={() => setIsAdding(true)}
                  style={{
                    background: '#0891b2',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '0.5rem',
                    padding: '0.45rem 1.1rem',
                    fontSize: '0.72rem',
                    fontWeight: 700,
                    letterSpacing: '0.07em',
                    textTransform: 'uppercase',
                    cursor: 'pointer',
                    minHeight: 'unset',
                    minWidth: 'unset',
                    transition: 'background 0.2s',
                  }}
                  className="hover:bg-cyan-700"
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