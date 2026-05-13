import { useContext } from 'react';
import { Menu, Bell, User as UserIcon } from "lucide-react";
import { RiderOrderContext } from '../../context/RiderOrderContext';

const RiderTopbar = ({ onMenuClick }) => {
  const { riderProfile } = useContext(RiderOrderContext);

  return (
    <div className="sticky top-0 z-30 flex items-center justify-between border-b border-white/15 bg-gradient-to-r from-[#667eea]/80 to-[#764ba2]/80 backdrop-blur-xl px-3 py-3 sm:px-md lg:px-lg xl:px-xl h-[var(--dashboard-topbar-height)] shadow-lg">
      <div className="flex items-center gap-3">
        <button
          onClick={onMenuClick}
          className="rounded-lg p-2 text-white/80 hover:bg-white/10 hover:text-white md:hidden transition-all"
          style={{ border: "none", cursor: "pointer", minHeight: "unset", minWidth: "unset" }}
        >
          <Menu className="h-6 w-6" />
        </button>
        <h1 className="text-lg font-bold text-white drop-shadow-sm">Delivery Partner Dashboard</h1>
      </div>

      <div className="flex items-center gap-4">
        <button
          className="rounded-lg p-2 text-white/80 hover:bg-white/10 hover:text-white transition-all"
          style={{ border: "none", cursor: "pointer", minHeight: "unset", minWidth: "unset" }}
        >
          <Bell className="h-5 w-5" />
        </button>

        {/* Profile Picture */}
        <div className="w-10 h-10 rounded-full bg-gradient-to-r from-[#f5d97c] to-[#d4af37] flex items-center justify-center border-2 border-white/30 shadow-lg overflow-hidden">
          {riderProfile.imageUrl ? (
            <img src={riderProfile.imageUrl} alt="Profile" className="w-full h-full object-cover" />
          ) : (
            <UserIcon className="h-5 w-5 text-[#231806] font-bold" />
          )}
        </div>
      </div>
    </div>
  );
};

export default RiderTopbar;
