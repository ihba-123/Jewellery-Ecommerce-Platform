import { useState, useMemo } from 'react';
import { AlertCircle, CheckCircle } from 'lucide-react';

const EditProfileForm = ({ user, onCancel, onSave }) => {
  const [formData, setFormData] = useState({
    fullName: user.fullName || '',
    address: user.address || '',
    occupation: user.occupation || '',
    annualIncome: user.annualIncome || '',
    idProof: user.idProof || '',
  });
  const [touched, setTouched] = useState({});
  const [isLoading, setIsLoading] = useState(false);

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

    if (formData.occupation && formData.occupation.trim().length > 0 && formData.occupation.trim().length < 2) {
      e.occupation = 'Occupation must be at least 2 characters if provided';
    }

    if (formData.annualIncome && formData.annualIncome.trim().length > 0 && !/^\d+/.test(formData.annualIncome)) {
      e.annualIncome = 'Annual income should be a valid number';
    }

    return e;
  }, [formData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched(prev => ({ ...prev, [name]: true }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Mark all fields as touched
    const allTouched = Object.keys(formData).reduce((acc, key) => ({ ...acc, [key]: true }), {});
    setTouched(allTouched);

    if (Object.keys(errors).length > 0) {
      return;
    }

    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      if (onSave) onSave(formData);
    } finally {
      setIsLoading(false);
    }
  };

  const getInputClass = (fieldName) => {
    const baseClass = 'w-full px-4 py-2.5 bg-white/10 border rounded-xl focus:ring-2 focus:border-amber-500 outline-none transition-all text-white placeholder-white/40';

    if (touched[fieldName] && errors[fieldName]) {
      return `${baseClass} border-red-400/50 focus:ring-red-500/30`;
    }
    if (touched[fieldName] && !errors[fieldName]) {
      return `${baseClass} border-green-400/50 focus:ring-green-500/30`;
    }
    return `${baseClass} border-white/20 focus:ring-amber-500/30`;
  };

  return (
    <form onSubmit={handleSubmit} className="w-full mt-6 space-y-5 animate-in fade-in slide-in-from-bottom-2 duration-300">
      <div className="mb-5 text-center">
        <h3 className="text-h4 font-bold text-white">Edit Profile</h3>
        <p className="text-white/60 text-sm mt-1">Update your personal information</p>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:gap-5">
        {/* Full Name */}
        <div className="space-y-1.5">
          <label className="text-sm font-medium text-white/80">Full Name *</label>
          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            onBlur={handleBlur}
            className={getInputClass('fullName')}
            placeholder="Enter your full name"
            disabled={isLoading}
          />
          {touched.fullName && errors.fullName && (
            <div className="flex items-center gap-2 text-xs text-red-600">
              <AlertCircle size={14} />
              {errors.fullName}
            </div>
          )}
          {touched.fullName && !errors.fullName && formData.fullName && (
            <div className="flex items-center gap-2 text-xs text-green-600">
              <CheckCircle size={14} />
              Looks good
            </div>
          )}
        </div>

        {/* Address */}
        <div className="space-y-1.5">
          <label className="text-sm font-medium text-white/80">Address *</label>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            onBlur={handleBlur}
            className={getInputClass('address')}
            placeholder="Enter your address"
            disabled={isLoading}
          />
          {touched.address && errors.address && (
            <div className="flex items-center gap-2 text-xs text-red-600">
              <AlertCircle size={14} />
              {errors.address}
            </div>
          )}
          {touched.address && !errors.address && formData.address && (
            <div className="flex items-center gap-2 text-xs text-green-600">
              <CheckCircle size={14} />
              Looks good
            </div>
          )}
        </div>

        {/* Occupation */}
        <div className="space-y-1.5">
          <label className="text-sm font-medium text-zinc-700">Occupation</label>
          <input
            type="text"
            name="occupation"
            value={formData.occupation}
            onChange={handleChange}
            onBlur={handleBlur}
            className={getInputClass('occupation')}
            placeholder="Your occupation (optional)"
            disabled={isLoading}
          />
          {touched.occupation && errors.occupation && (
            <div className="flex items-center gap-2 text-xs text-red-600">
              <AlertCircle size={14} />
              {errors.occupation}
            </div>
          )}
        </div>

        {/* Annual Income */}
        <div className="space-y-1.5">
          <label className="text-sm font-medium text-zinc-700">Annual Income</label>
          <input
            type="text"
            name="annualIncome"
            value={formData.annualIncome}
            onChange={handleChange}
            onBlur={handleBlur}
            className={getInputClass('annualIncome')}
            placeholder="e.g. 1,200,000 (optional)"
            disabled={isLoading}
          />
          {touched.annualIncome && errors.annualIncome && (
            <div className="flex items-center gap-2 text-xs text-red-600">
              <AlertCircle size={14} />
              {errors.annualIncome}
            </div>
          )}
        </div>

        {/* ID Proof */}
        <div className="space-y-1.5 md:col-span-2">
          <label className="text-sm font-medium text-zinc-700">ID Proof</label>
          <input
            type="text"
            name="idProof"
            value={formData.idProof}
            onChange={handleChange}
            onBlur={handleBlur}
            className={getInputClass('idProof')}
            placeholder="e.g. Citizenship or Passport Number (optional)"
            disabled={isLoading}
          />
        </div>
      </div>

      <div className="flex flex-col items-center justify-end gap-3 border-t border-white/10 pt-5 sm:flex-row">
        <button
          type="button"
          onClick={onCancel}
          disabled={isLoading}
          className="w-full rounded-xl border border-white/20 bg-white/10 px-5 py-2.5 font-medium text-white transition-all hover:bg-white/15 disabled:opacity-50 disabled:cursor-not-allowed sm:w-auto"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={isLoading}
          className="w-full rounded-xl bg-gradient-to-r from-[#f5d97c] via-[#d4af37] to-[#a87b12] px-5 py-2.5 font-semibold text-[#231806] shadow-sm transition-all hover:brightness-110 disabled:opacity-50 disabled:cursor-not-allowed sm:w-auto"
        >
          {isLoading ? 'Saving...' : 'Save Changes'}
        </button>
      </div>
    </form>
  );
};

export default EditProfileForm;
