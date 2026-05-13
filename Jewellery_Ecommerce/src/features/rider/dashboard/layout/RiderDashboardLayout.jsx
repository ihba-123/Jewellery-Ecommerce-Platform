import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import RiderSidebar from '../components/RiderSidebar';
import RiderTopbar from '../components/RiderTopbar';
import { RiderOrderProvider } from '../../context/RiderOrderContext';

const RiderDashboardLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <RiderOrderProvider>
      <div
        className="flex min-h-dvh overflow-x-clip font-sans text-zinc-900"
        style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', backgroundAttachment: 'fixed' }}
      >
        {isSidebarOpen && (
          <div
            className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm transition-opacity md:hidden"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}

        <RiderSidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
        <div className="flex min-h-dvh min-w-0 flex-1 flex-col md:pl-(--dashboard-sidebar-width)">
          <RiderTopbar onMenuClick={() => setIsSidebarOpen(true)} />

          <main className="flex-1 overflow-y-auto overflow-x-hidden px-3 pb-lg pt-[calc(var(--dashboard-topbar-height)+var(--space-md))] sm:px-md lg:px-lg xl:px-xl">
            <div className="mx-auto w-full max-w-7xl min-w-0">
              <Outlet />
            </div>
          </main>
        </div>
      </div>
    </RiderOrderProvider>
  );
};

export default RiderDashboardLayout;
