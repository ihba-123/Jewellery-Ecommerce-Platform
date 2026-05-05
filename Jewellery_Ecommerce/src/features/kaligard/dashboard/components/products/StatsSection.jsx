const StatsSection = ({ stats }) => {
  const statsData = [
    { label: 'TOTAL PRODUCTS', value: stats.total, icon: '📦', gradient: 'from-purple-400 to-indigo-600' },
    { label: 'IN STOCK', value: stats.active, icon: '✅', gradient: 'from-emerald-400 to-teal-500' }
  ];

  return (
    <div className="grid grid-cols-1 gap-4 sm:gap-5 md:gap-6 sm:grid-cols-2">
      {statsData.map((stat, idx) => (
        <div key={idx} className="rounded-2xl border border-white/20 bg-white/10 backdrop-blur-md p-4 sm:p-6 hover:bg-white/12 transition-all">
          <div className="flex items-center gap-4">
            <div className={`w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-linear-to-br ${stat.gradient} flex items-center justify-center shrink-0 shadow-lg`}>
              <span className="text-xl sm:text-2xl">{stat.icon}</span>
            </div>
            <div className="min-w-0">
              <p className="text-white/70 text-xs sm:text-sm font-medium">{stat.label}</p>
              <p className="text-2xl sm:text-3xl font-bold text-white">{stat.value}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default StatsSection;
