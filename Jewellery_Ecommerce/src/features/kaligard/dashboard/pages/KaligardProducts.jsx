import { useState } from 'react';

const KaligardProducts = () => {
  const [products] = useState([
    { id: 1, name: "Gold Necklace Design A", category: "Designs", price: "₹15,000", quantity: 15, status: "Active", image: "🔗" },
    { id: 2, name: "Diamond Ring Setting", category: "Designs", price: "₹8,500", quantity: 8, status: "Active", image: "💍" },
    { id: 3, name: "Bracelet Template B", category: "Templates", price: "₹12,000", quantity: 3, status: "Low Stock", image: "⌚" },
    { id: 4, name: "Earring Design C", category: "Designs", price: "₹5,500", quantity: 0, status: "Out of Stock", image: "✨" }
  ]);

  const getStatusColor = (status) => {
    switch (status) {
      case 'Active': return 'bg-green-500/20 text-green-200';
      case 'Low Stock': return 'bg-yellow-500/20 text-yellow-200';
      case 'Out of Stock': return 'bg-red-500/20 text-red-200';
      default: return 'bg-gray-500/20 text-gray-200';
    }
  };

  return (
    <div className="mx-auto w-full max-w-6xl space-y-6">
      {/* Products Stats */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-4">
        <StatCard title="Total Products" value={products.length} icon="📦" />
        <StatCard title="Active" value="3" icon="✅" />
        <StatCard title="Low Stock" value="1" icon="⚠️" />
        <StatCard title="Out of Stock" value="0" icon="❌" />
      </div>

      {/* Products Table */}
      <div className="rounded-2xl border border-white/15 bg-white/10 backdrop-blur-md overflow-hidden shadow-lg">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/15 bg-white/8">
                <th className="px-4 py-3 text-left text-sm font-semibold text-white">Product Name</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-white">Category</th>
                <th className="px-4 py-3 text-center text-sm font-semibold text-white">Price</th>
                <th className="px-4 py-3 text-center text-sm font-semibold text-white">Quantity</th>
                <th className="px-4 py-3 text-center text-sm font-semibold text-white">Status</th>
                <th className="px-4 py-3 text-center text-sm font-semibold text-white">Action</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.id} className="border-b border-white/10 hover:bg-white/8 transition-all">
                  <td className="px-4 py-3 text-white font-medium">
                    <div className="flex items-center gap-2">
                      <span className="text-2xl">{product.image}</span>
                      {product.name}
                    </div>
                  </td>
                  <td className="px-4 py-3 text-white/70">{product.category}</td>
                  <td className="px-4 py-3 text-center text-white font-medium">{product.price}</td>
                  <td className="px-4 py-3 text-center text-white">{product.quantity}</td>
                  <td className="px-4 py-3 text-center">
                    <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(product.status)}`}>
                      {product.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-center space-x-2">
                    <button className="text-blue-300 hover:text-blue-200 transition-all text-sm font-medium">
                      Edit
                    </button>
                    <button className="text-red-300 hover:text-red-200 transition-all text-sm font-medium">
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Product Button */}
      <button className="w-full px-4 py-3 rounded-lg bg-gradient-to-r from-[#f5d97c] via-[#d4af37] to-[#a87b12] text-[#231806] font-semibold hover:brightness-110 active:scale-95 transition-all">
        + Add New Product
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

export default KaligardProducts;
