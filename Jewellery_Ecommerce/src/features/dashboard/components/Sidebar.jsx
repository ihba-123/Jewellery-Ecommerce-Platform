import { NavLink } from 'react-router-dom';
import { useAuth } from '../../auth/hooks/useAuth';
import {
  BarChart3, User, MapPin, ShoppingCart, Plus, Clipboard, Gem,
  Home, LogOut, Zap, Bell, X
} from 'lucide-react';

const Sidebar = ({ isOpen, setIsOpen }) => {
  const { logout } = useAuth();

  const menuItems = [
    { name: 'My Profile',    path: '/dashboard/profile',      isSubItem: true, icon: <User className="h-6 w-6 shrink-0" /> },
    { name: 'Address Book',  path: '/dashboard/address-book', isSubItem: true, icon: <MapPin className="h-6 w-6 shrink-0" /> },
    {
      name: 'My Orders',
      path: '/dashboard/orders',
      icon: <ShoppingCart className="h-6 w-6 shrink-0" />,
      children: [
        { name: 'My Returns',       path: '/dashboard/orders/returns' },
        { name: 'My Cancellations', path: '/dashboard/orders/cancellations' },
      ],
    },
    { name: 'Request Order', path: '/dashboard/request-order', icon: <Clipboard className="h-6 w-6 shrink-0" /> },
  ];

  const handleLinkClick = () => {
    if (setIsOpen) setIsOpen(false);
  };

  const navCls = ({ isActive }) =>
    `group flex min-h-9 items-center gap-2.5 rounded-xl px-3 py-2 text-md transition-all duration-200 ${
      isActive
        ? 'bg-white/20 text-white shadow-[0_4px_16px_rgba(255,255,255,0.1)] ring-1 ring-white/20'
        : 'text-white/80 hover:bg-white/10 hover:text-white'
    }`;

  const Overlay = () =>
    isOpen ? (
      <div
        className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm md:hidden"
        onClick={() => setIsOpen(false)}
        aria-hidden="true"
      />
    ) : null;

  return (
    <>
      <Overlay />

      <aside
        className={`fixed left-0 top-0 z-50 flex h-[100dvh] w-[min(15rem,84vw)] flex-col overflow-y-auto border-r border-white/15 text-white shadow-2xl transition-transform duration-300 md:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
        style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}
      >
        {/* ── Header ────────────────────────────────────── */}
        <div className="relative border-b border-white/15 px-4 py-4">
          <button
            className="absolute right-3 top-3 rounded-lg p-1 text-white/70 hover:bg-white/10 hover:text-white md:hidden"
            onClick={() => setIsOpen(false)}
            aria-label="Close sidebar"
            style={{ minHeight: 'unset', minWidth: 'unset', border: 'none', background: 'none', cursor: 'pointer' }}
          >
            <X className="h-5 w-5" />
          </button>

          <div className="flex items-center justify-center gap-3">
            <Gem className="h-20 w-20 text-yellow-400" />
            <button
              aria-label="Notifications"
              style={{ position: 'relative', background: 'rgba(255,255,255,0.12)', border: '1px solid rgba(255,255,255,0.2)', borderRadius: '0.6rem', padding: '0.35rem', cursor: 'pointer', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: 'unset', minWidth: 'unset' }}
            >
              <Bell className="w-5 h-5" />
              <span style={{
                position: 'absolute', top: '-0.35rem', right: '-0.35rem',
                background: '#f43f5e',
                color: '#fff',
                fontSize: '0.55rem',
                fontWeight: 700,
                lineHeight: 1,
                minWidth: '1rem',
                height: '1rem',
                borderRadius: '9999px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '0 3px',
                border: '1.5px solid rgba(102,126,234,0.6)',
              }}>0</span>
            </button>
          </div>

          <h2 className="mt-2 text-center text-base font-semibold leading-snug tracking-tight text-white sm:text-[1.05rem]">
            Customer Dashboard
          </h2>
        </div>

        {/* ── Nav ───────────────────────────────────────── */}
        <nav className="flex-1 overflow-y-auto px-2 py-3">
          <div className="space-y-3.5">
            {menuItems.map((item) => (
              <div key={item.path}>
                <NavLink
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

                {item.children && (
                  <div className="mt-0.5 mb-0.5 space-y-0.5 pl-9">
                    {item.children.map((sub) => (
                      <NavLink
                        key={sub.path}
                        to={sub.path}
                        onClick={handleLinkClick}
                        className={({ isActive }) =>
                          `block rounded-lg px-2.5 py-1.5 text-sm transition-colors duration-200 ${
                            isActive ? 'text-white bg-white/15' : 'text-white/60 hover:text-white hover:bg-white/8'
                          }`
                        }
                      >
                        {sub.name}
                      </NavLink>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </nav>

        {/* ── Footer ────────────────────────────────────── */}
        <div className="mt-auto shrink-0 space-y-0.5 border-t border-white/15 px-2 py-3">
          <NavLink
            to="/"
            onClick={handleLinkClick}
            className="flex min-h-9 items-center gap-2.5 rounded-xl px-3 py-2 text-sm text-white/80 transition-all duration-200 hover:bg-white/10 hover:text-white"
          >
            <span className="flex h-5 w-5 items-center justify-center shrink-0">
              <Home className="h-5 w-5" />
            </span>
            <span className="truncate">Home / Store</span>
          </NavLink>

          <button
            onClick={() => { logout(); handleLinkClick(); }}
            className="flex w-full min-h-9 items-center gap-2.5 rounded-xl bg-white/10 px-3 py-2 text-sm text-white/80 transition-all duration-200 hover:bg-white/15 hover:text-white"
            style={{ border: 'none', cursor: 'pointer' }}
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

export default Sidebar;