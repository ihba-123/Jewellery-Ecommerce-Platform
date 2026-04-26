import { useState } from 'react';

const ChangePasswordForm = ({ onCancel, onSave }) => {
  const [passwords, setPasswords] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPasswords(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (passwords.newPassword !== passwords.confirmPassword) {
      setError("New passwords don't match!");
      return;
    }
    // Simulate successful save
    if (onSave) onSave();
  };

  return (
    <form onSubmit={handleSubmit} className="mx-auto mt-6 w-full max-w-lg space-y-5 animate-in fade-in slide-in-from-bottom-2 duration-300">
      <div className="mb-6 text-center">
        <div className="mx-auto mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-amber-100/50 text-amber-600 sm:h-12 sm:w-12">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z"></path></svg>
        </div>
        <h3 className="text-h4 font-bold text-zinc-900">Change Password</h3>
        <p className="text-zinc-500 text-sm mt-1">Ensure your account is using a long, random password to stay secure.</p>
      </div>

      {error && (
        <div className="bg-red-50 text-red-600 p-3 rounded-xl text-sm font-medium border border-red-100 flex items-center gap-2">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path></svg>
          {error}
        </div>
      )}

      <div className="space-y-4">
        <div className="space-y-1.5">
          <label className="text-sm font-medium text-zinc-700">Current Password</label>
          <input
            type="password"
            name="currentPassword"
            value={passwords.currentPassword}
            onChange={handleChange}
            className="w-full px-4 py-3 bg-zinc-50 border border-zinc-200 rounded-xl focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 outline-none transition-all"
            required
          />
        </div>
        
        <div className="w-full h-px bg-zinc-100 my-4"></div>

        <div className="space-y-1.5">
          <label className="text-sm font-medium text-zinc-700">New Password</label>
          <input
            type="password"
            name="newPassword"
            value={passwords.newPassword}
            onChange={handleChange}
            className="w-full px-4 py-3 bg-zinc-50 border border-zinc-200 rounded-xl focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 outline-none transition-all"
            required
            minLength={6}
          />
        </div>

        <div className="space-y-1.5">
          <label className="text-sm font-medium text-zinc-700">Confirm New Password</label>
          <input
            type="password"
            name="confirmPassword"
            value={passwords.confirmPassword}
            onChange={handleChange}
            className="w-full px-4 py-3 bg-zinc-50 border border-zinc-200 rounded-xl focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 outline-none transition-all"
            required
          />
        </div>
      </div>

      <div className="flex flex-col justify-center gap-3 pt-6 sm:flex-row">
        <button
          type="button"
          onClick={onCancel}
          className="w-full rounded-xl border border-zinc-200 bg-white px-6 py-3 font-medium text-zinc-700 transition-all hover:bg-zinc-50 sm:w-auto"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="w-full rounded-xl bg-amber-500 px-6 py-3 font-semibold text-zinc-950 shadow-sm transition-all hover:bg-amber-600 sm:w-auto"
        >
          Update Password
        </button>
      </div>
    </form>
  );
};

export default ChangePasswordForm;
