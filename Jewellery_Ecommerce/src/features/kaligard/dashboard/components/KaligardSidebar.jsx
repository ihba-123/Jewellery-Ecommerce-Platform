import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../../../auth/hooks/useAuth';
const KaligardSidebar = ({ isOpen, setIsOpen }) => {
  const { logout } = useAuth();
  const [expandedMenus, setExpandedMenus] = useState({});

  const IconProfile = () => (
    <svg className="h-6 w-6 shrink-0" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 12a4 4 0 100-8 4 4 0 000 8z" />
      <path d="M4 20a8 8 0 1116 0v1H4v-1z" />
    </svg>
  );
  const IconDocuments = () => (
    <svg className="h-6 w-6 shrink-0" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z" />
    </svg>
  );
  const IconInventory = () => (
    <svg className="h-6 w-6 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 3v4m0 0h4M5 7a4 4 0 110 8m4 0h4m-4-8v4m-4 0H9" />
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
  const IconFactory = () => (
    <svg className="h-20 w-20 text-yellow-300" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M13 2h-2v3h2V2zM17 5h-2v3h2V5zM9 5H7v3h2V5zM19 8h-1v8h1V8zM6 8H5v8h1V8zM18 17H6v2h12v-2z" opacity="0.8" />
      <path d="M12 8v8M8 10v6m8 0v-6" stroke="currentColor" strokeWidth="0.5" />
    </svg>
  );
  const IconClose = () => (
    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
    </svg>
  );

  const menuItems = [
    {
      name: 'Factory Profile',
      path: '/kaligard-dashboard/profile',
      icon: <IconProfile />,
      children: [
        { name: 'Documents', path: '/kaligard-dashboard/documents' },
        { name: 'Bank Information', path: '/kaligard-dashboard/bank-info' }
      ]
    },
    {
      name: 'My Products',
      path: '/kaligard-dashboard/products',
      icon: <IconInventory />,
      children: []
    }
  ];

  const toggleMenu = (index) => {
    setExpandedMenus(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  const hasChildren = (item) => item.children && item.children.length > 0;

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
            <IconClose />
          </button>

          <div className="flex items-center justify-center gap-3">
            <IconFactory />
          </div>

          <h2 className="mt-2 text-center text-base font-semibold leading-snug tracking-tight text-white sm:text-[1.05rem]">
            Kaligard Dashboard
          </h2>
          <p className="mt-1 text-center text-xs text-white/60">Manufacturing & Design</p>
        </div>

        {/* ── Nav ───────────────────────────────────────── */}
        <nav className="flex-1 overflow-y-auto px-2 py-3">
          <div className="space-y-3.5">
            {menuItems.map((item, index) => (
              <div key={item.path}>
                {hasChildren(item) ? (
                  <button
                    onClick={() => toggleMenu(index)}
                    className={`w-full group flex min-h-9 items-center gap-2.5 rounded-xl px-3 py-2 text-md transition-all duration-200 ${
                      expandedMenus[index]
                        ? 'bg-white/20 text-white shadow-[0_4px_16px_rgba(255,255,255,0.1)] ring-1 ring-white/20'
                        : 'text-white/80 hover:bg-white/10 hover:text-white'
                    }`}
                  >
                    <span className="flex h-5 w-5 items-center justify-center opacity-90 group-hover:opacity-100 shrink-0">
                      {item.icon}
                    </span>
                    <span className="truncate flex-1 text-left">{item.name}</span>
                    <span className={`transition-transform duration-300 ${expandedMenus[index] ? 'rotate-180' : ''}`}>
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                      </svg>
                    </span>
                  </button>
                ) : (
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
                )}

                {hasChildren(item) && (
                  <div
                    className={`overflow-hidden transition-all duration-300 ease-out ${
                      expandedMenus[index] ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                    }`}
                  >
                    <div className="mt-0.5 mb-0.5 space-y-0.5 pl-9">
                      {item.children.map((child) => (
                        <NavLink
                          key={child.path}
                          to={child.path}
                          onClick={handleLinkClick}
                          className={({ isActive }) =>
                            `block rounded-lg px-2.5 py-1.5 text-sm transition-all duration-200 ${
                              isActive
                                ? 'text-white bg-white/15 border-l-2 border-yellow-300'
                                : 'text-white/60 hover:text-white hover:bg-white/8'
                            }`
                          }
                        >
                          {child.name}
                        </NavLink>
                      ))}
                    </div>
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
              <IconHome />
            </span>
            <span className="truncate">Home / Store</span>
          </NavLink>

          <button
            onClick={() => { logout(); handleLinkClick(); }}
            className="flex w-full min-h-9 items-center gap-2.5 rounded-xl bg-white/10 px-3 py-2 text-sm text-white/80 transition-all duration-200 hover:bg-white/15 hover:text-white"
            style={{ border: 'none', cursor: 'pointer' }}
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

export default KaligardSidebar;
