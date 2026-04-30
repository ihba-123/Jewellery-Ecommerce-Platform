const ProfileActions = ({ onEditClick, onPasswordClick }) => {
  return (
    <div className="flex w-full flex-col items-center justify-center gap-3 pt-4 animate-in fade-in duration-300 sm:flex-row">
      <button
        type="button"
        onClick={onEditClick}
        className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#f5d97c] via-[#d4af37] to-[#a87b12] px-5 py-3 font-semibold text-[#231806] shadow-lg transition-all hover:brightness-110 active:scale-95 focus:outline-none sm:w-auto"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125"></path></svg>
        Edit Profile
      </button>

      <button
        type="button"
        onClick={onPasswordClick}
        className="inline-flex w-full items-center justify-center gap-2 rounded-xl border-2 border-white/30 bg-white/10 px-5 py-3 font-semibold text-white shadow-sm transition-all hover:bg-white/20 active:scale-95 focus:outline-none sm:w-auto"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z"></path></svg>
        Change Password
      </button>
    </div>
  );
};

export default ProfileActions;
