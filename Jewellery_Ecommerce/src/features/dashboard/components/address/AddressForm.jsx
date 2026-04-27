import React, { useState, useEffect, useMemo } from 'react';
import { AlertCircle, CheckCircle } from 'lucide-react';

const AddressForm = ({ initialData, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    address: '',
    postcode: '',
    phoneNumber: '',
    isBilling: false,
    isShipping: false
  });
  const [touched, setTouched] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    }
  }, [initialData]);

  const errors = useMemo(() => {
    const e = {};

    if (!formData.fullName.trim()) {
      e.fullName = 'Full name is required';
    } else if (formData.fullName.trim().length < 2) {
      e.fullName = 'Full name must be at least 2 characters';
    }

    if (!formData.address.trim()) {
      e.address = 'Address is required';
    } else if (formData.address.trim().length < 5) {
      e.address = 'Address must be at least 5 characters';
    }

    if (!formData.postcode.trim()) {
      e.postcode = 'Postcode is required';
    } else if (formData.postcode.trim().length < 3) {
      e.postcode = 'Postcode must be valid';
    }

    if (!formData.phoneNumber.trim()) {
      e.phoneNumber = 'Phone number is required';
    } else if (!/^[\d\s\-\+\(\)]{7,}$/.test(formData.phoneNumber)) {
      e.phoneNumber = 'Phone number must be valid';
    }

    return e;
  }, [formData]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched(prev => ({ ...prev, [name]: true }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Mark all required fields as touched
    const requiredFields = ['fullName', 'address', 'postcode', 'phoneNumber'];
    const allTouched = requiredFields.reduce((acc, field) => ({ ...acc, [field]: true }), {});
    setTouched(allTouched);

    if (Object.keys(errors).length > 0) {
      return;
    }

    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      onSubmit(formData);
    } finally {
      setIsLoading(false);
    }
  };

  const getInputClass = (fieldName) => {
    const baseClass = 'w-full rounded-md border px-3 py-2.5 text-sm text-zinc-800 outline-none transition focus:ring-2';

    if (touched[fieldName] && errors[fieldName]) {
      return `${baseClass} border-red-300 focus:border-red-500 focus:ring-red-200`;
    }
    if (touched[fieldName] && !errors[fieldName]) {
      return `${baseClass} border-green-300 focus:border-green-500 focus:ring-green-200`;
    }
    return `${baseClass} border-zinc-300 focus:border-cyan-500 focus:ring-cyan-200`;
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
        {/* Full Name */}
        <div>
          <label className="mb-1 block font-medium text-zinc-700">Full Name *</label>
          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            onBlur={handleBlur}
            className={getInputClass('fullName')}
            placeholder="John Doe"
            disabled={isLoading}
          />
          {touched.fullName && errors.fullName && (
            <div className="mt-1 flex items-center gap-2 text-xs text-red-600">
              <AlertCircle size={14} />
              {errors.fullName}
            </div>
          )}
          {touched.fullName && !errors.fullName && formData.fullName && (
            <div className="mt-1 flex items-center gap-2 text-xs text-green-600">
              <CheckCircle size={14} />
              Looks good
            </div>
          )}
        </div>

        {/* Address */}
        <div>
          <label className="mb-1 block font-medium text-zinc-700">Address *</label>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            onBlur={handleBlur}
            className={getInputClass('address')}
            placeholder="123 Main St, Apartment 4B"
            disabled={isLoading}
          />
          {touched.address && errors.address && (
            <div className="mt-1 flex items-center gap-2 text-xs text-red-600">
              <AlertCircle size={14} />
              {errors.address}
            </div>
          )}
          {touched.address && !errors.address && formData.address && (
            <div className="mt-1 flex items-center gap-2 text-xs text-green-600">
              <CheckCircle size={14} />
              Looks good
            </div>
          )}
        </div>

        {/* Postcode & Phone */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="mb-1 block font-medium text-zinc-700">Postcode *</label>
            <input
              type="text"
              name="postcode"
              value={formData.postcode}
              onChange={handleChange}
              onBlur={handleBlur}
              className={getInputClass('postcode')}
              placeholder="12345"
              disabled={isLoading}
            />
            {touched.postcode && errors.postcode && (
              <div className="mt-1 flex items-center gap-2 text-xs text-red-600">
                <AlertCircle size={14} />
                {errors.postcode}
              </div>
            )}
            {touched.postcode && !errors.postcode && formData.postcode && (
              <div className="mt-1 flex items-center gap-2 text-xs text-green-600">
                <CheckCircle size={14} />
                Valid
              </div>
            )}
          </div>
          <div>
            <label className="mb-1 block font-medium text-zinc-700">Phone Number *</label>
            <input
              type="tel"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              onBlur={handleBlur}
              className={getInputClass('phoneNumber')}
              placeholder="+1 (555) 000-0000"
              disabled={isLoading}
            />
            {touched.phoneNumber && errors.phoneNumber && (
              <div className="mt-1 flex items-center gap-2 text-xs text-red-600">
                <AlertCircle size={14} />
                {errors.phoneNumber}
              </div>
            )}
            {touched.phoneNumber && !errors.phoneNumber && formData.phoneNumber && (
              <div className="mt-1 flex items-center gap-2 text-xs text-green-600">
                <CheckCircle size={14} />
                Valid number
              </div>
            )}
          </div>
        </div>

        {/* Checkboxes */}
        <div className="flex flex-col gap-3 pt-1 sm:flex-row sm:items-center sm:gap-6">
          <label className="flex items-center space-x-2 cursor-pointer">
            <input
              type="checkbox"
              name="isBilling"
              checked={formData.isBilling}
              onChange={handleChange}
              className="w-4 h-4 text-cyan-600 border-zinc-300 rounded focus:ring-cyan-500"
              disabled={isLoading}
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
              disabled={isLoading}
            />
            <span className="text-sm text-zinc-700">Set as Shipping Address</span>
          </label>
        </div>

        {/* Buttons */}
        <div className="flex flex-col-reverse gap-2 pt-2 sm:flex-row sm:items-center sm:gap-3">
          <button
            type="submit"
            disabled={isLoading}
            className="rounded-md bg-cyan-600 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-cyan-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? 'Saving...' : (initialData ? 'Save Changes' : 'Save Address')}
          </button>
          <button
            type="button"
            onClick={onCancel}
            disabled={isLoading}
            className="rounded-md bg-zinc-200 px-5 py-2.5 text-sm font-semibold text-zinc-800 transition-colors hover:bg-zinc-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddressForm;
