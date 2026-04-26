const Dashboard = () => {
  return (
    <div className="mx-auto w-full max-w-4xl rounded-2xl border border-zinc-100 bg-white p-4 shadow-sm sm:p-6 lg:p-8">
      <h2 className="mb-4 text-h2 font-bold text-zinc-800">Welcome back!</h2>
      <p className="max-w-[65ch] text-body text-zinc-500">Here is an overview of your recent activity and current loan status.</p>
      
      <div className="mt-lg grid grid-cols-1 gap-md md:grid-cols-3">
        <div className="relative overflow-hidden rounded-2xl border border-amber-100/50 p-4 sm:p-5" style={{ backgroundImage: 'linear-gradient(135deg, #fffbeb, #fff7ed)' }}>
          <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-amber-500/10 blur-2xl"></div>
          <h3 className="mb-2 text-sm font-medium text-amber-800">Active Loans</h3>
          <p className="text-2xl font-bold text-amber-600 sm:text-3xl">0</p>
        </div>
        
        <div className="relative overflow-hidden rounded-2xl border border-blue-100/50 p-4 sm:p-5" style={{ backgroundImage: 'linear-gradient(135deg, #eff6ff, #eef2ff)' }}>
          <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-blue-500/10 blur-2xl"></div>
          <h3 className="mb-2 text-sm font-medium text-blue-800">Pending Requests</h3>
          <p className="text-2xl font-bold text-blue-600 sm:text-3xl">0</p>
        </div>
        
        <div className="relative overflow-hidden rounded-2xl border border-emerald-100/50 p-4 sm:p-5" style={{ backgroundImage: 'linear-gradient(135deg, #ecfdf5, #f0fdfa)' }}>
          <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-emerald-500/10 blur-2xl"></div>
          <h3 className="mb-2 text-sm font-medium text-emerald-800">Gold Items</h3>
          <p className="text-2xl font-bold text-emerald-600 sm:text-3xl">0</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
