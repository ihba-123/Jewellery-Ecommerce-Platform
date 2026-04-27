import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import Topbar from '../components/Topbar';

const DashboardLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div
      className="flex min-h-[100dvh] overflow-x-clip font-sans text-zinc-900 -ml-12"
      style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', backgroundAttachment: 'fixed' }}
    >
      {isSidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm transition-opacity md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}                                                              

      <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
      <div className="flex min-w-0 flex-1 flex-col min-h-[100dvh] md:pl-[var(--dashboard-sidebar-width)]">
        <Topbar onMenuClick={() => setIsSidebarOpen(true)} />

        <main className="flex-1 overflow-y-auto overflow-x-hidden px-md pb-lg pt-[calc(var(--dashboard-topbar-height)+var(--space-md))] sm:px-lg lg:px-xl">
          <div className="mx-auto w-full max-w-7xl min-w-0 mr-1">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;