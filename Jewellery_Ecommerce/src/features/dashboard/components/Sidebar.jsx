import { NavLink } from 'react-router-dom';
import { useAuth } from '../../auth/hooks/useAuth';

const Sidebar = ({ isOpen, setIsOpen }) => {
  const { logout } = useAuth();

  /* ── Icons ─────────────────────────────────────────── */
  const IconDashboard = () => (
    <svg className="h-6 w-6 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 13a9 9 0 1118 0" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 13l3-5" />
      <circle cx="12" cy="13" r="1.25" fill="currentColor" stroke="none" />
    </svg>
  );

  const IconProfile = () => (
    <svg className="h-6 w-6 shrink-0" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 12a4 4 0 100-8 4 4 0 000 8z" />
      <path d="M4 20a8 8 0 1116 0v1H4v-1z" />
    </svg>
  );

  const IconAddress = () => (
    <svg className="h-6 w-6 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 21s7-5.2 7-11a7 7 0 10-14 0c0 5.8 7 11 7 11z" />
      <circle cx="12" cy="10" r="2.3" />
    </svg>
  );

  const IconOrders = () => (
    <svg className="h-6 w-6 shrink-0" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M3 8.5C3 6.6 4.6 5 6.5 5h11C19.4 5 21 6.6 21 8.5v7c0 1.9-1.6 3.5-3.5 3.5h-11C4.6 19 3 17.4 3 15.5v-7z" opacity="0.45" />
      <circle cx="8" cy="12" r="1.5" />
      <path d="M16 10.5h3M16 13.5h2.2" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" fill="none" />
    </svg>
  );

  const IconPlus = () => (
    <svg className="h-6 w-6 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.8" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 5v14M5 12h14" />
    </svg>
  );

  const IconClipboard = () => (
    <svg className="h-6 w-6 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <rect x="6" y="4" width="12" height="16" rx="2" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 4.5h6M9 10h6M9 14h4" />
    </svg>
  );

  const IconGold = () => (
    <svg className="h-6 w-6 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 14c0-2.8 2.8-5 7-5s7 2.2 7 5" />
      <ellipse cx="12" cy="14" rx="7" ry="3.5" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 14v2.2c0 1.9 3.1 3.5 7 3.5s7-1.6 7-3.5V14" />
    </svg>
  );

  const IconHome = () => (
    <svg className="h-6 w-6 shrink-0" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 4l8 7v9h-6v-6H10v6H4v-9l8-7z" />
    </svg>
  );

  const IconLogout = () => (
    <svg className="h-6 w-6 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M14 7l5 5-5 5" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M19 12H9" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v10a2 2 0 002 2h5" />
    </svg>
  );

  const IconDiamond = () => (
    <svg className="h-20 w-20 text-yellow-400" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M7.2 3h9.6l4 6.2L12 21 3.2 9.2 7.2 3zm.9 1.8L5.5 8.8h4.9l2.2-4H8.1zm7.8 0h-4.5l2.2 4h4.9l-2.6-4h0zM12 18l6.1-7.4h-3.8L12 18zm0 0l-2.3-7.4H5.9L12 18z" />
    </svg>
  );

  const IconBell = () => (
    <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 3a6 6 0 00-6 6v3.4c0 .7-.3 1.4-.8 1.9L3.7 16a1 1 0 00.7 1.7h15.2a1 1 0 00.7-1.7l-1.5-1.7a2.8 2.8 0 01-.8-1.9V9a6 6 0 00-6-6z" />
      <path d="M9.5 19a2.5 2.5 0 005 0h-5z" />
    </svg>
  );

  const IconClose = () => (
    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
    </svg>
  );


  const menuItems = [
    { name: 'Dashboard',    path: '/dashboard',              exact: true,  icon: <IconDashboard /> },
    { name: 'My Profile',   path: '/dashboard/profile',                    icon: <IconProfile /> },
    { name: 'Address Book', path: '/dashboard/address-book', isSubItem: true, icon: <IconAddress /> },
    {
      name: 'My Orders',
      path: '/dashboard/orders',
      icon: <IconOrders />,
      children: [
        { name: 'My Returns',       path: '/dashboard/orders/returns' },
        { name: 'My Cancellations', path: '/dashboard/orders/cancellations' },
      ],
    },
    { name: 'My Gold Items',   path: '/dashboard/gold-items',    icon: <IconGold /> },
    { name: 'Request Order',   path: '/dashboard/request-order', icon: <IconClipboard /> },
  ];

  const handleLinkClick = () => {
    if (setIsOpen) setIsOpen(false);
  };

  /* ── Shared nav-link class helper ───────────────────── */
  const navCls = ({ isActive }) =>
    `group flex min-h-9 items-center gap-2.5 rounded-xl px-3 py-2 text-md transition-all duration-200 ${
      isActive
        ? 'bg-slate-500/35 text-white shadow-[0_4px_16px_rgba(59,130,246,0.18)] ring-1 ring-white/10'
        : 'text-slate-300 hover:bg-white/5 hover:text-white'
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
        className={`fixed left-0 top-0 z-50 flex h-[100dvh] w-[min(15rem,84vw)] flex-col overflow-y-auto border-r border-white/10 bg-gradient-to-b from-slate-700 via-slate-800 to-indigo-950 text-slate-200 shadow-2xl transition-transform duration-300 md:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* ── Header ────────────────────────────────────── */}
        <div className="relative border-b border-white/10 px-4 py-4">
          {/* Close button – mobile only */}
          <button
            className="absolute right-3 top-3 rounded-lg p-1 text-slate-400 hover:bg-white/10 hover:text-white md:hidden"
            onClick={() => setIsOpen(false)}
            aria-label="Close sidebar"
          >
            <IconClose />
          </button>

          {/* Logo row */}
          <div className="flex items-center justify-center gap-2.5">
            <IconDiamond />
            {/* Bell */}
            <div className="relative mt-1.5">
              <IconBell />
              <span className="absolute -right-1.5 -top-1.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-rose-500 px-0.5 text-[10px] font-bold leading-none text-white">
                3
              </span>
            </div>
          </div>

          <h2 className="mt-2 text-center text-base font-semibold leading-snug tracking-tight text-slate-100 sm:text-[1.05rem]">
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
                  <span className="flex h-5 w-5 items-center justify-center opacity-80 group-hover:opacity-100 shrink-0">
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
                          `block rounded-lg px-2.5 py-1.5 text-smtransition-colors duration-200 ${
                            isActive ? 'text-white' : 'text-slate-400 hover:text-white'
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

          {/* Request Loan – sits below main list */}
          <div className="mt-1">
            <NavLink
              to="/dashboard/request-loan"
              onClick={handleLinkClick}
              className={navCls}
            >
              <span className="flex h-5 w-5 items-center justify-center opacity-80 group-hover:opacity-100 shrink-0">
                <IconPlus />
              </span>
              <span className="truncate">Request Loan</span>
            </NavLink>
          </div>
        </nav>

        {/* ── Footer ────────────────────────────────────── */}
        <div className="mt-auto shrink-0 space-y-0.5 border-t border-white/10 px-2 py-3">
          <NavLink
            to="/"
            onClick={handleLinkClick}
            className="flex min-h-9 items-center gap-2.5 rounded-xl px-3 py-2 text-sm text-slate-300 transition-all duration-200 hover:bg-white/5 hover:text-white"
          >
            <span className="flex h-5 w-5 items-center justify-center shrink-0">
              <IconHome />
            </span>
            <span className="truncate">Home / Store</span>
          </NavLink>

          <button
            onClick={() => { logout(); handleLinkClick(); }}
            className="flex w-full min-h-9 items-center gap-2.5 rounded-xl bg-white/5 px-3 py-2 text-sm text-slate-300 transition-all duration-200 hover:bg-white/10 hover:text-white"
          >
            <span className="flex h-5 w-5 items-center justify-center shrink-0">
              <IconLogout />
            </span>
            <span className="truncate">Logout</span>
          </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;