import { useState, useMemo } from 'react';
import { AlertCircle, CheckCircle, Eye, EyeOff, Lock } from 'lucide-react';

const ChangePasswordForm = ({ onCancel, onSave }) => {
  const [passwords, setPasswords] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [touched, setTouched] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState({
    current: false,
    new: false,
    confirm: false,
  });

  const errors = useMemo(() => {
    const e = {};

    if (!passwords.currentPassword) {
      e.currentPassword = 'Current password is required';
    } else if (passwords.currentPassword.length < 6) {
      e.currentPassword = 'Password must be at least 6 characters';
    }

    if (!passwords.newPassword) {
      e.newPassword = 'New password is required';
    } else if (passwords.newPassword.length < 6) {
      e.newPassword = 'Password must be at least 6 characters';
    }

    if (!passwords.confirmPassword) {
      e.confirmPassword = 'Confirm password is required';
    } else if (passwords.newPassword !== passwords.confirmPassword) {
      e.confirmPassword = 'Passwords do not match';
    }

    if (passwords.currentPassword && passwords.newPassword && passwords.currentPassword === passwords.newPassword) {
      e.newPassword = 'New password must be different from current password';
    }

    return e;
  }, [passwords]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPasswords(prev => ({ ...prev, [name]: value }));
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched(prev => ({ ...prev, [name]: true }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Mark all fields as touched
    const allTouched = Object.keys(passwords).reduce((acc, key) => ({ ...acc, [key]: true }), {});
    setTouched(allTouched);

    if (Object.keys(errors).length > 0) {
      return;
    }

    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      if (onSave) onSave();
    } finally {
      setIsLoading(false);
    }
  };

  const getInputClass = (fieldName) => {
    const baseClass = 'w-full px-4 py-3 bg-white/10 border rounded-xl focus:ring-2 focus:border-amber-500 outline-none transition-all text-white placeholder-white/40';

    if (touched[fieldName] && errors[fieldName]) {
      return `${baseClass} border-red-400/50 focus:ring-red-500/30`;
    }
    if (touched[fieldName] && !errors[fieldName]) {
      return `${baseClass} border-green-400/50 focus:ring-green-500/30`;
    }
    return `${baseClass} border-white/20 focus:ring-amber-500/30`;
  };

  return (
    <form onSubmit={handleSubmit} className="mx-auto mt-6 w-full max-w-lg space-y-5 animate-in fade-in slide-in-from-bottom-2 duration-300">
      <div className="mb-6 text-center">
        <div className="mx-auto mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-amber-100/50 text-amber-600 sm:h-12 sm:w-12">
          <Lock className="w-6 h-6" />
        </div>
        <h3 className="text-h4 font-bold text-white">Change Password</h3>
        <p className="text-white/60 text-sm mt-1">Ensure your account is using a long, random password to stay secure.</p>
      </div>

      <div className="space-y-4">
        {/* Current Password */}
        <div className="space-y-1.5">
          <label className="text-sm font-medium text-white/80">Current Password *</label>
          <div className="relative">
            <input
              type={showPassword.current ? 'text' : 'password'}
              name="currentPassword"
              value={passwords.currentPassword}
              onChange={handleChange}
              onBlur={handleBlur}
              className={getInputClass('currentPassword')}
              placeholder="Enter your current password"
              disabled={isLoading}
            />
            <button
              type="button"
              onClick={() => setShowPassword(prev => ({ ...prev, current: !prev.current }))}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-white/60 hover:text-white"
            >
              {showPassword.current ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
          {touched.currentPassword && errors.currentPassword && (
            <div className="flex items-center gap-2 text-xs text-red-600">
              <AlertCircle size={14} />
              {errors.currentPassword}
            </div>
          )}
          {touched.currentPassword && !errors.currentPassword && passwords.currentPassword && (
            <div className="flex items-center gap-2 text-xs text-green-600">
              <CheckCircle size={14} />
              Verified
            </div>
          )}
        </div>

        <div className="w-full h-px bg-white/10 my-4"></div>

        {/* New Password */}
        <div className="space-y-1.5">
          <label className="text-sm font-medium text-zinc-700">New Password *</label>
          <div className="relative">
            <input
              type={showPassword.new ? 'text' : 'password'}
              name="newPassword"
              value={passwords.newPassword}
              onChange={handleChange}
              onBlur={handleBlur}
              className={getInputClass('newPassword')}
              placeholder="Enter new password"
              disabled={isLoading}
            />
            <button
              type="button"
              onClick={() => setShowPassword(prev => ({ ...prev, new: !prev.new }))}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-white/60 hover:text-white"
            >
              {showPassword.new ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
          {touched.newPassword && errors.newPassword && (
            <div className="flex items-center gap-2 text-xs text-red-600">
              <AlertCircle size={14} />
              {errors.newPassword}
            </div>
          )}
          {touched.newPassword && !errors.newPassword && passwords.newPassword && (
            <div className="flex items-center gap-2 text-xs text-green-600">
              <CheckCircle size={14} />
              Strong password
            </div>
          )}
        </div>

        {/* Confirm Password */}
        <div className="space-y-1.5">
          <label className="text-sm font-medium text-zinc-700">Confirm New Password *</label>
          <div className="relative">
            <input
              type={showPassword.confirm ? 'text' : 'password'}
              name="confirmPassword"
              value={passwords.confirmPassword}
              onChange={handleChange}
              onBlur={handleBlur}
              className={getInputClass('confirmPassword')}
              placeholder="Confirm new password"
              disabled={isLoading}
            />
            <button
              type="button"
              onClick={() => setShowPassword(prev => ({ ...prev, confirm: !prev.confirm }))}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-white/60 hover:text-white"
            >
              {showPassword.confirm ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
          {touched.confirmPassword && errors.confirmPassword && (
            <div className="flex items-center gap-2 text-xs text-red-600">
              <AlertCircle size={14} />
              {errors.confirmPassword}
            </div>
          )}
          {touched.confirmPassword && !errors.confirmPassword && passwords.confirmPassword && (
            <div className="flex items-center gap-2 text-xs text-green-600">
              <CheckCircle size={14} />
              Passwords match
            </div>
          )}
        </div>
      </div>

      {/* Password Requirements */}
      <div className="p-3 rounded-lg bg-white/5 border border-white/15">
        <p className="text-xs font-semibold text-white/80 mb-2">Password Requirements:</p>
        <ul className="text-xs text-white/60 space-y-1">
          <li className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-yellow-400"></span>
            At least 6 characters
          </li>
          <li className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-yellow-400"></span>
            Different from current password
          </li>
          <li className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-yellow-400"></span>
            Passwords must match
          </li>
        </ul>
      </div>

      <div className="flex flex-col justify-center gap-3 pt-6 sm:flex-row">
        <button
          type="button"
          onClick={onCancel}
          disabled={isLoading}
          className="w-full rounded-xl border border-white/20 bg-white/10 px-6 py-3 font-medium text-white transition-all hover:bg-white/15 disabled:opacity-50 disabled:cursor-not-allowed sm:w-auto"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={isLoading}
          className="w-full rounded-xl bg-gradient-to-r from-[#f5d97c] via-[#d4af37] to-[#a87b12] px-6 py-3 font-semibold text-[#231806] shadow-sm transition-all hover:brightness-110 disabled:opacity-50 disabled:cursor-not-allowed sm:w-auto"
        >
          {isLoading ? 'Updating...' : 'Update Password'}
        </button>
      </div>
    </form>
  );
};

export default ChangePasswordForm;
