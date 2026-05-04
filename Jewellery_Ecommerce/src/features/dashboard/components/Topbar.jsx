import { useLocation } from 'react-router-dom';
import { Menu } from 'lucide-react';

const getPageTitle = (pathname) => {
  if (pathname.includes('/dashboard/orders/') && pathname.endsWith('/tracking')) {
    return 'Tracking Details';
  }

  if (pathname.includes('/dashboard/orders/') && pathname.endsWith('/manage')) {
    return 'Manage Order';                                              
  }

  if (pathname.includes('/dashboard/orders')) {
    if (pathname.includes('/dashboard/orders/returns')) {
      return 'My Returns';
    }

    if (pathname.includes('/dashboard/orders/cancellations')) {
      return 'My Cancellations';
    }

    return 'My Orders';
  }

  const path = pathname.split('/').pop() || 'dashboard';
  switch (path) {
    case 'dashboard': return 'Dashboard';
    case 'profile': return 'My Profile';
    case 'address-book': return 'Address Book';
    case 'request-order': return 'Request Order';
    case 'request-loan': return 'Request a New Loan';
    case 'gold-items': return 'My Gold Items';
    default: return 'Dashboard';
  }
};

const Topbar = ({ onMenuClick }) => {
  const location = useLocation();
  const title = getPageTitle(location.pathname);

  return (
    <header
      className="fixed left-0  right-0 top-0 z-10 flex items-center justify-between  bg-white/10 px-md py-sm shadow-[0_1px_3px_0_rgba(0,0,0,0.05)] backdrop-blur-md md:pl-[var(--dashboard-sidebar-width)]"
      style={{ minHeight: 'var(--dashboard-topbar-height)' }}
    >
      <div className="flex min-w-0 items-center gap-3 sm:gap-4">
        <button
          onClick={onMenuClick}
          className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-lg text-zinc-500 hover:bg-zinc-100 hover:text-zinc-800 focus:outline-none md:hidden"
        >
          <Menu className="w-7 h-7" />
        </button>
        <h1 className="min-w-0 truncate text-white text-h4 font-semibold ">{title}</h1>
      </div>
      
      <div className="flex items-center gap-4">
        {/* Placeholder for User Avatar/Notifications */}
        <div className="h-9 w-9 rounded-full border border-amber-300 bg-linear-to-r from-amber-200 to-yellow-500 shadow-sm"></div>
      </div>
    </header>
  );
};

export default Topbar;
