import { useLocation } from 'react-router-dom';

const getPageTitle = (pathname) => {
  const path = pathname.split('/').pop() || 'kaligard-dashboard';
  switch (path) {
    case 'kaligard-dashboard':
    case 'home': return 'Dashboard';
    case 'profile': return 'Factory Profile';
    case 'products': return 'My Products';
    case 'documents': return 'Documents';
    case 'bank-info': return 'Bank Information';
    default: return 'Kaligard Dashboard';
  }
};

const KaligardTopbar = ({ onMenuClick }) => {
  const location = useLocation();
  const title = getPageTitle(location.pathname);

  return (
    <header
      className="fixed left-0 right-0 top-0 z-10 flex items-center justify-between bg-white/10 px-md py-sm shadow-[0_1px_3px_0_rgba(0,0,0,0.05)] backdrop-blur-md md:pl-[var(--dashboard-sidebar-width)]"
      style={{ minHeight: 'var(--dashboard-topbar-height)' }}
    >
      <div className="flex min-w-0 items-center gap-3 sm:gap-4">
        <button
          onClick={onMenuClick}
          className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-lg text-white/70 hover:bg-white/10 hover:text-white focus:outline-none md:hidden"
        >
          <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path></svg>
        </button>
        <h1 className="min-w-0 truncate text-white text-h4 font-semibold">{title}</h1>
      </div>

      <div className="flex items-center gap-4">
        <div className="h-9 w-9 rounded-full border border-yellow-300 bg-gradient-to-r from-yellow-200 to-yellow-400 shadow-sm"></div>
      </div>
    </header>
  );
};

export default KaligardTopbar;
