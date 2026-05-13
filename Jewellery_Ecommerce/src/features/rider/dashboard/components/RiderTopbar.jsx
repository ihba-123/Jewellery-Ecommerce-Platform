import { Menu, Bell, User as UserIcon } from "lucide-react";

const RiderTopbar = ({ onMenuClick }) => {
  return (
    <div className="sticky top-0 z-30 flex items-center justify-between border-b border-white/15 bg-white/10 backdrop-blur-md px-3 py-3 sm:px-md lg:px-lg xl:px-xl h-[var(--dashboard-topbar-height)]">
      <div className="flex items-center gap-3">
        <button
          onClick={onMenuClick}
          className="rounded-lg p-2 text-white/70 hover:bg-white/10 hover:text-white md:hidden"
          style={{ border: "none", cursor: "pointer", minHeight: "unset", minWidth: "unset" }}
        >
          <Menu className="h-6 w-6" />
        </button>
        <h1 className="text-lg font-semibold text-white">Delivery Partner</h1>
      </div>

      <div className="flex items-center gap-3">
        <button
          className="rounded-lg p-2 text-white/70 hover:bg-white/10 hover:text-white"
          style={{ border: "none", cursor: "pointer", minHeight: "unset", minWidth: "unset" }}
        >
          <Bell className="h-5 w-5" />
        </button>
        <div className="w-10 h-10 rounded-full bg-gradient-to-r from-[#f5d97c] to-[#d4af37] flex items-center justify-center">
          <UserIcon className="h-5 w-5 text-[#231806]" />
        </div>
      </div>
    </div>
  );
};

export default RiderTopbar;
