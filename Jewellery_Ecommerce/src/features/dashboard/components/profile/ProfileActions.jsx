import { Edit, Lock } from 'lucide-react';

const ProfileActions = ({ onEditClick, onPasswordClick }) => {
  return (
    <div className="flex w-full flex-col items-center justify-center gap-3 pt-4 animate-in fade-in duration-300 sm:flex-row">
      <button
        type="button"
        onClick={onEditClick}
        className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#f5d97c] via-[#d4af37] to-[#a87b12] px-5 py-3 font-semibold text-[#231806] shadow-lg transition-all hover:brightness-110 active:scale-95 focus:outline-none sm:w-auto"
      >
        <Edit className="w-5 h-5" />
        Edit Profile
      </button>

      <button
        type="button"
        onClick={onPasswordClick}
        className="inline-flex w-full items-center justify-center gap-2 rounded-xl border-2 border-white/30 bg-white/10 px-5 py-3 font-semibold text-white shadow-sm transition-all hover:bg-white/20 active:scale-95 focus:outline-none sm:w-auto"
      >
        <Lock className="w-5 h-5" />
        Change Password
      </button>
    </div>
  );
};

export default ProfileActions;
