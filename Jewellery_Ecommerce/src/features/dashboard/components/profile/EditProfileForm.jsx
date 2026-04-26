import { useState } from 'react';

const EditProfileForm = ({ user, onCancel, onSave }) => {
  const [formData, setFormData] = useState({
    fullName: user.fullName || '',
    address: user.address || '',
    occupation: user.occupation || '',
    annualIncome: user.annualIncome || '',
    idProof: user.idProof || '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSave) onSave(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="w-full mt-6 space-y-5 animate-in fade-in slide-in-from-bottom-2 duration-300">
      <div className="mb-5 text-center">
        <h3 className="text-h4 font-bold text-zinc-900">Edit Profile</h3>
        <p className="text-zinc-500 text-sm mt-1">Update your personal information</p>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:gap-5">
        <div className="space-y-1.5">
          <label className="text-sm font-medium text-zinc-700">Full Name</label>
          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            className="w-full px-4 py-2.5 bg-zinc-50 border border-zinc-200 rounded-xl focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 outline-none transition-all"
            required
          />
        </div>
        <div className="space-y-1.5">
          <label className="text-sm font-medium text-zinc-700">Address</label>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            className="w-full px-4 py-2.5 bg-zinc-50 border border-zinc-200 rounded-xl focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 outline-none transition-all"
            required
          />
        </div>
        <div className="space-y-1.5">
          <label className="text-sm font-medium text-zinc-700">Occupation</label>
          <input
            type="text"
            name="occupation"
            value={formData.occupation}
            onChange={handleChange}
            className="w-full px-4 py-2.5 bg-zinc-50 border border-zinc-200 rounded-xl focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 outline-none transition-all"
          />
        </div>
        <div className="space-y-1.5">
          <label className="text-sm font-medium text-zinc-700">Annual Income</label>
          <input
            type="text"
            name="annualIncome"
            value={formData.annualIncome}
            onChange={handleChange}
            className="w-full px-4 py-2.5 bg-zinc-50 border border-zinc-200 rounded-xl focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 outline-none transition-all"
          />
        </div>
        <div className="space-y-1.5 md:col-span-2">
          <label className="text-sm font-medium text-zinc-700">ID Proof</label>
          <input
            type="text"
            name="idProof"
            value={formData.idProof}
            onChange={handleChange}
            className="w-full px-4 py-2.5 bg-zinc-50 border border-zinc-200 rounded-xl focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 outline-none transition-all"
            placeholder="e.g. Citizenship or Passport Number"
          />
        </div>
      </div>

      <div className="flex flex-col items-center justify-end gap-3 border-t border-zinc-100 pt-5 sm:flex-row">
        <button
          type="button"
          onClick={onCancel}
          className="w-full rounded-xl border border-zinc-200 bg-white px-5 py-2.5 font-medium text-zinc-700 transition-all hover:bg-zinc-50 sm:w-auto"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="w-full rounded-xl bg-amber-500 px-5 py-2.5 font-semibold text-zinc-950 shadow-sm transition-all hover:bg-amber-600 sm:w-auto"
        >
          Save Changes
        </button>
      </div>
    </form>
  );
};

export default EditProfileForm;
