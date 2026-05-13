import { NavLink } from "react-router-dom";
import {
  User,
  Truck,
  Home,
  LogOut,
  X,
  MapPin,
  Briefcase,
} from "lucide-react";
import { useAuth } from "../../../auth/hooks/useAuth";

const RiderSidebar = ({ isOpen, setIsOpen }) => {
  const { logout } = useAuth();

  const menuItems = [
    {
      name: "My Profile",
      path: "/rider-dashboard/profile",
      icon: <User className="h-6 w-6 shrink-0" />,
    },
    {
      name: "Active Deliveries",
      path: "/rider-dashboard/deliveries",
      icon: <Truck className="h-6 w-6 shrink-0" />,
    },
    {
      name: "Live Map",
      path: "/rider-dashboard/map",
      icon: <MapPin className="h-6 w-6 shrink-0" />,
    },
    {
      name: "Delivery History",
      path: "/rider-dashboard/history",
      icon: <Briefcase className="h-6 w-6 shrink-0" />,
    },
  ];

  const handleLinkClick = () => {
    if (setIsOpen) setIsOpen(false);
  };

  const navCls = ({ isActive }) =>
    `group flex min-h-9 items-center gap-2.5 rounded-xl px-3 py-2 text-md transition-all duration-200 ${
      isActive
        ? "bg-white/20 text-white shadow-[0_4px_16px_rgba(255,255,255,0.1)] ring-1 ring-white/20"
        : "text-white/80 hover:bg-white/10 hover:text-white"
    }`;

  return (
    <>
      <aside
        className={`fixed left-0 top-0 z-50 flex h-dvh w-[min(15rem,84vw)] flex-col overflow-y-auto border-r border-white/15 text-white shadow-2xl transition-transform duration-300 md:translate-x-0 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
        style={{
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        }}
      >
        {/* Header */}
        <div className="relative border-b border-white/15 px-4 py-3">
          <button
            className="absolute right-0 top-3 rounded-lg p-1 text-white/70 hover:bg-white/10 hover:text-white md:hidden"
            onClick={() => setIsOpen(false)}
            aria-label="Close sidebar"
            style={{
              minHeight: "unset",
              minWidth: "unset",
              border: "none",
              background: "none",
              cursor: "pointer",
            }}
          >
            <X className="h-8 w-8" />
          </button>

          <h2 className="mt-2 text-center text-base font-semibold leading-snug tracking-tight text-white sm:text-[1.05rem]">
            Rider Dashboard
          </h2>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto px-2 py-3">
          <div className="space-y-3.5">
            {menuItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.exact}
                onClick={handleLinkClick}
                className={navCls}
              >
                <span className="flex h-5 w-5 items-center justify-center opacity-90 group-hover:opacity-100 shrink-0">
                  {item.icon}
                </span>
                <span className="truncate">{item.name}</span>
              </NavLink>
            ))}
          </div>
        </nav>

        {/* Footer */}
        <div className="mt-auto shrink-0 space-y-0.5 border-t border-white/15 px-2 py-3">
          <NavLink
            to="/"
            onClick={handleLinkClick}
            className="flex min-h-9 items-center gap-2.5 rounded-xl px-3 py-2 text-sm text-white/80 transition-all duration-200 hover:bg-white/10 hover:text-white"
          >
            <span className="flex h-5 w-5 items-center justify-center shrink-0">
              <Home className="h-5 w-5" />
            </span>
            <span className="truncate">Home</span>
          </NavLink>

          <button
            onClick={() => {
              logout();
              handleLinkClick();
            }}
            className="flex w-full min-h-9 items-center gap-2.5 rounded-xl bg-white/10 px-3 py-2 text-sm text-white/80 transition-all duration-200 hover:bg-white/15 hover:text-white"
            style={{ border: "none", cursor: "pointer" }}
          >
            <span className="flex h-5 w-5 items-center justify-center shrink-0">
              <LogOut className="h-5 w-5" />
            </span>
            <span className="truncate">Logout</span>
          </button>
        </div>
      </aside>
    </>
  );
};

export default RiderSidebar;
