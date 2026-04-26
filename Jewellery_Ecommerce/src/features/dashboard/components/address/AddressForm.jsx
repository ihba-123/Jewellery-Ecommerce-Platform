import React, { useState, useEffect } from 'react';

const AddressForm = ({ initialData, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    address: '',
    postcode: '',
    phoneNumber: '',
    isBilling: false,
    isShipping: false
  });

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="rounded-xl border border-zinc-200 bg-white p-4 shadow-sm sm:p-6">
      <h3 className="mb-4 flex items-center gap-2 text-lg font-semibold text-zinc-800 sm:text-xl">
        {initialData ? (
           <>
            <svg className="w-5 h-5 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg>
            Edit Address
           </>
        ) : (
          <>
            <svg className="w-5 h-5 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" /></svg>
            Add New Address
          </>
        )}
      </h3>

      <form onSubmit={handleSubmit} className="space-y-4 text-sm text-zinc-700 sm:text-base">
        <div>
          <label className="mb-1 block font-medium text-zinc-700">Full Name</label>
          <input
            type="text"
            name="fullName"
            required
            value={formData.fullName}
            onChange={handleChange}
            className="w-full rounded-md border border-zinc-300 px-3 py-2.5 text-sm text-zinc-800 outline-none transition focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200"
            placeholder="John Doe"
          />
        </div>

        <div>
          <label className="mb-1 block font-medium text-zinc-700">Address</label>
          <input
            type="text"
            name="address"
            required
            value={formData.address}
            onChange={handleChange}
            className="w-full rounded-md border border-zinc-300 px-3 py-2.5 text-sm text-zinc-800 outline-none transition focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200"
            placeholder="123 Main St, Apartment 4B"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="mb-1 block font-medium text-zinc-700">Postcode</label>
            <input
              type="text"
              name="postcode"
              required
              value={formData.postcode}
              onChange={handleChange}
              className="w-full rounded-md border border-zinc-300 px-3 py-2.5 text-sm text-zinc-800 outline-none transition focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200"
              placeholder="12345"
            />
          </div>
          <div>
            <label className="mb-1 block font-medium text-zinc-700">Phone Number</label>
            <input
              type="tel"
              name="phoneNumber"
              required
              value={formData.phoneNumber}
              onChange={handleChange}
              className="w-full rounded-md border border-zinc-300 px-3 py-2.5 text-sm text-zinc-800 outline-none transition focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200"
              placeholder="+1 (555) 000-0000"
            />
          </div>
        </div>

        <div className="flex flex-col gap-3 pt-1 sm:flex-row sm:items-center sm:gap-6">
          <label className="flex items-center space-x-2 cursor-pointer">
            <input
              type="checkbox"
              name="isBilling"
              checked={formData.isBilling}
              onChange={handleChange}
              className="w-4 h-4 text-cyan-600 border-zinc-300 rounded focus:ring-cyan-500"
            />
            <span className="text-sm text-zinc-700">Set as Billing Address</span>
          </label>
          <label className="flex items-center space-x-2 cursor-pointer">
            <input
              type="checkbox"
              name="isShipping"
              checked={formData.isShipping}
              onChange={handleChange}
              className="w-4 h-4 text-cyan-600 border-zinc-300 rounded focus:ring-cyan-500"
            />
            <span className="text-sm text-zinc-700">Set as Shipping Address</span>
          </label>
        </div>

        <div className="flex flex-col-reverse gap-2 pt-2 sm:flex-row sm:items-center sm:gap-3">
          <button
            type="submit"
            className="rounded-md bg-cyan-600 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-cyan-700"
          >
            {initialData ? 'Save Changes' : 'Save Address'}
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="rounded-md bg-zinc-200 px-5 py-2.5 text-sm font-semibold text-zinc-800 transition-colors hover:bg-zinc-300"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddressForm;
