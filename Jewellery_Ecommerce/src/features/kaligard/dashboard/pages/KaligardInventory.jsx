const KaligardInventory = () => {
  const inventory = [
    { id: 1, name: "Gold Necklace Design A", quantity: 15, weight: "25.5g", status: "In Stock", category: "Designs" },
    { id: 2, name: "Diamond Ring Setting", quantity: 8, weight: "5.2g", status: "In Stock", category: "Designs" },
    { id: 3, name: "Bracelet Template B", quantity: 3, weight: "45.0g", status: "Low Stock", category: "Templates" },
    { id: 4, name: "Earring Mold C", quantity: 0, weight: "2.1g", status: "Out of Stock", category: "Molds" }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'In Stock': return 'bg-green-500/20 text-green-200';
      case 'Low Stock': return 'bg-yellow-500/20 text-yellow-200';
      case 'Out of Stock': return 'bg-red-500/20 text-red-200';
      default: return 'bg-gray-500/20 text-gray-200';
    }
  };

  return (
    <div className="mx-auto w-full max-w-6xl space-y-6">
      {/* Inventory Stats */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-4">
        <StatCard title="Total Items" value="26" icon="📦" />
        <StatCard title="In Stock" value="23" icon="✅" />
        <StatCard title="Low Stock" value="3" icon="⚠️" />
        <StatCard title="Out of Stock" value="0" icon="❌" />
      </div>

      {/* Inventory Table */}
      <div className="rounded-2xl border border-white/15 bg-white/10 backdrop-blur-md overflow-hidden shadow-lg">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/15 bg-white/8">
                <th className="px-4 py-3 text-left text-sm font-semibold text-white">Item Name</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-white">Category</th>
                <th className="px-4 py-3 text-center text-sm font-semibold text-white">Quantity</th>
                <th className="px-4 py-3 text-center text-sm font-semibold text-white">Weight</th>
                <th className="px-4 py-3 text-center text-sm font-semibold text-white">Status</th>
                <th className="px-4 py-3 text-center text-sm font-semibold text-white">Action</th>
              </tr>
            </thead>
            <tbody>
              {inventory.map((item) => (
                <tr key={item.id} className="border-b border-white/10 hover:bg-white/8 transition-all">
                  <td className="px-4 py-3 text-white font-medium">{item.name}</td>
                  <td className="px-4 py-3 text-white/70">{item.category}</td>
                  <td className="px-4 py-3 text-center text-white">{item.quantity}</td>
                  <td className="px-4 py-3 text-center text-white">{item.weight}</td>
                  <td className="px-4 py-3 text-center">
                    <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(item.status)}`}>
                      {item.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-center">
                    <button className="text-blue-300 hover:text-blue-200 transition-all text-sm font-medium">
                      Edit
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add New Item Button */}
      <button className="w-full px-4 py-3 rounded-lg bg-gradient-to-r from-[#f5d97c] via-[#d4af37] to-[#a87b12] text-[#231806] font-semibold hover:brightness-110 active:scale-95 transition-all">
        + Add New Item to Inventory
      </button>
    </div>
  );
};

const StatCard = ({ title, value, icon }) => (
  <div className="rounded-xl border border-white/15 bg-white/10 backdrop-blur-sm p-4 hover:bg-white/15 transition-all">
    <div className="text-3xl mb-2">{icon}</div>
    <p className="text-white/60 text-sm font-medium">{title}</p>
    <p className="text-2xl font-bold text-white mt-1">{value}</p>
  </div>
);

export default KaligardInventory;
