import { Link } from 'react-router-dom';

const KaligardDashboardHome = () => {
  return (
    <div className="mx-auto w-full max-w-6xl space-y-6">
      {/* Welcome Section */}
      <div className="rounded-2xl border border-yellow-300/30 bg-gradient-to-r from-yellow-500/20 via-orange-500/20 to-red-500/20 backdrop-blur-md p-6 sm:p-8">
        <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2">Welcome to Kaligard Dashboard</h1>
        <p className="text-white/80 text-lg">Manage your manufacturing operations and designs</p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard title="Active Designs" value="12" icon="🎨" color="blue" />
        <StatCard title="Inventory Items" value="26" icon="📦" color="green" />
        <StatCard title="Documents" value="4" icon="📄" color="yellow" />
        <StatCard title="Account Status" value="Active" icon="✅" color="emerald" />
      </div>

      {/* Quick Actions */}
      <div className="rounded-2xl border border-white/15 bg-white/10 backdrop-blur-md p-6">
        <h2 className="text-xl font-bold text-white mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <QuickActionButton
            title="View Profile"
            icon="👤"
            description="Manage factory details"
            path="/kaligard-dashboard/profile"
          />
          <QuickActionButton
            title="Inventory"
            icon="📦"
            description="Check stock levels"
            path="/kaligard-dashboard/inventory"
          />
          <QuickActionButton
            title="Documents"
            icon="📄"
            description="Upload & manage files"
            path="/kaligard-dashboard/documents"
          />
          <QuickActionButton
            title="Edit Profile"
            icon="✏️"
            description="Update information"
            path="/kaligard-dashboard/profile"
          />
        </div>
      </div>

      {/* Recent Activity */}
      <div className="rounded-2xl border border-white/15 bg-white/10 backdrop-blur-md p-6">
        <h2 className="text-xl font-bold text-white mb-4">Recent Activity</h2>
        <div className="space-y-3">
          <ActivityItem
            action="Uploaded"
            item="GST Certificate"
            time="2 hours ago"
            status="✅ Verified"
          />
          <ActivityItem
            action="Updated"
            item="Factory Profile"
            time="1 day ago"
            status="✅ Saved"
          />
          <ActivityItem
            action="Added"
            item="New Design Template"
            time="3 days ago"
            status="✅ In Stock"
          />
          <ActivityItem
            action="Document"
            item="Factory License Expiry Notice"
            time="5 days ago"
            status="⚠️ Pending"
          />
        </div>
      </div>

      {/* Upcoming Tasks */}
      <div className="rounded-2xl border border-white/15 bg-white/10 backdrop-blur-md p-6">
        <h2 className="text-xl font-bold text-white mb-4">Upcoming Tasks</h2>
        <div className="space-y-3">
          <TaskItem
            title="Factory License Renewal"
            dueDate="15 Feb 2024"
            priority="high"
          />
          <TaskItem
            title="Quarterly Inventory Audit"
            dueDate="28 Feb 2024"
            priority="medium"
          />
          <TaskItem
            title="GST Return Filing"
            dueDate="20 Mar 2024"
            priority="medium"
          />
        </div>
      </div>
    </div>
  );
};

const StatCard = ({ title, value, icon, color }) => (
  <div className="rounded-xl border border-white/15 bg-white/10 backdrop-blur-sm p-4 hover:bg-white/15 transition-all">
    <div className="text-3xl mb-2">{icon}</div>
    <p className="text-white/60 text-sm font-medium">{title}</p>
    <p className="text-2xl font-bold text-white mt-1">{value}</p>
  </div>
);

const QuickActionButton = ({ title, icon, description, path }) => (
  <Link
    to={path}
    className="rounded-lg border border-white/15 bg-white/8 hover:bg-white/15 p-4 transition-all hover:scale-105 group"
  >
    <div className="text-3xl mb-2 group-hover:scale-125 transition-transform">{icon}</div>
    <h3 className="font-semibold text-white text-sm">{title}</h3>
    <p className="text-white/60 text-xs mt-1">{description}</p>
  </Link>
);

const ActivityItem = ({ action, item, time, status }) => (
  <div className="flex items-center justify-between rounded-lg border border-white/10 bg-white/5 p-3 hover:bg-white/8 transition-all">
    <div>
      <p className="text-white font-medium"><span className="text-yellow-300">{action}</span> {item}</p>
      <p className="text-white/60 text-xs mt-1">{time}</p>
    </div>
    <span className="text-white/80 text-sm font-medium">{status}</span>
  </div>
);

const TaskItem = ({ title, dueDate, priority }) => {
  const priorityColor = priority === 'high'
    ? 'bg-red-500/20 text-red-200'
    : 'bg-yellow-500/20 text-yellow-200';

  return (
    <div className="flex items-center justify-between rounded-lg border border-white/10 bg-white/5 p-3 hover:bg-white/8 transition-all">
      <div className="flex items-center gap-3">
        <input type="checkbox" className="w-4 h-4 accent-yellow-400 cursor-pointer" />
        <div>
          <p className="text-white font-medium">{title}</p>
          <p className="text-white/60 text-xs mt-1">Due: {dueDate}</p>
        </div>
      </div>
      <span className={`text-xs font-semibold px-3 py-1 rounded-full ${priorityColor}`}>
        {priority.toUpperCase()}
      </span>
    </div>
  );
};

export default KaligardDashboardHome;
