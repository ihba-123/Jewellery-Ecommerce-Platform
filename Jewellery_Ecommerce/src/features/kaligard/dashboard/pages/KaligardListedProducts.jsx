import { useState, useMemo, useEffect } from 'react';
import { CheckCircle, Clock, Truck, Package } from 'lucide-react';
import { useVendorOrders } from '../../context/VendorOrderContext';

const KaligardListedProducts = () => {
  const { vendorOrders, updateOrderStatus } = useVendorOrders();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 300);
    return () => clearTimeout(timer);
  }, []);

  const stats = useMemo(() => {
    return {
      total: vendorOrders.length,
      pending: vendorOrders.filter(o => o.status === 'Pending').length,
      confirmed: vendorOrders.filter(o => o.status === 'Confirmed').length,
      shipped: vendorOrders.filter(o => o.status === 'Shipped').length
    };
  }, [vendorOrders]);

  const getStatusColor = (status) => {
    switch (status) {
      case 'Pending': return 'bg-yellow-500/20 text-yellow-200';
      case 'Confirmed': return 'bg-blue-500/20 text-blue-200';
      case 'Shipped': return 'bg-purple-500/20 text-purple-200';
      case 'Delivered': return 'bg-green-500/20 text-green-200';
      default: return 'bg-gray-500/20 text-gray-200';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Pending':
        return <Clock className="h-4 w-4" />;
      case 'Confirmed':
        return <CheckCircle className="h-4 w-4" />;
      case 'Shipped':
        return <Truck className="h-4 w-4" />;
      case 'Delivered':
        return <Package className="h-4 w-4" />;
      default:
        return null;
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-white/60 text-center">
          <div className="inline-block w-8 h-8 border-3 border-white/20 border-t-yellow-300 rounded-full animate-spin mb-4" />
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-6xl space-y-6">
      {/* Page Header */}
      <div className="rounded-2xl border border-blue-300/30 bg-gradient-to-r from-blue-500/20 via-cyan-500/20 to-blue-500/20 backdrop-blur-md p-6 sm:p-8">
        <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2">Orders Received</h1>
        <p className="text-white/80 text-lg">Orders placed by vendors for your products</p>
      </div>

      {/* Order Stats */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard title="Total Orders" value={stats.total} icon="📦" />
        <StatCard title="Pending" value={stats.pending} icon="⏳" />
        <StatCard title="Confirmed" value={stats.confirmed} icon="✅" />
        <StatCard title="Shipped" value={stats.shipped} icon="🚚" />
      </div>

      {/* Orders Table */}
      {vendorOrders.length > 0 ? (
        <div className="rounded-2xl border border-white/15 bg-white/10 backdrop-blur-md overflow-hidden shadow-lg">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/15 bg-white/8">
                  <th className="px-4 py-3 text-left text-sm font-semibold text-white">Order ID</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-white">Vendor</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-white">Product</th>
                  <th className="px-4 py-3 text-center text-sm font-semibold text-white">Qty</th>
                  <th className="px-4 py-3 text-center text-sm font-semibold text-white">Total</th>
                  <th className="px-4 py-3 text-center text-sm font-semibold text-white">Status</th>
                  <th className="px-4 py-3 text-center text-sm font-semibold text-white">Date</th>
                  <th className="px-4 py-3 text-center text-sm font-semibold text-white">Action</th>
                </tr>
              </thead>
              <tbody>
                {vendorOrders.map((order) => (
                  <tr key={order.id} className="border-b border-white/10 hover:bg-white/8 transition-all">
                    <td className="px-4 py-3 text-white font-medium">#{order.id}</td>
                    <td className="px-4 py-3 text-white/80">{order.vendorName}</td>
                    <td className="px-4 py-3 text-white">{order.productName}</td>
                    <td className="px-4 py-3 text-center text-white">{order.quantity}</td>
                    <td className="px-4 py-3 text-center text-white font-medium">{order.totalPrice}</td>
                    <td className="px-4 py-3 text-center">
                      <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(order.status)}`}>
                        {getStatusIcon(order.status)}
                        {order.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-center text-white/60 text-sm">{order.orderDate}</td>
                    <td className="px-4 py-3">
                      <div className="flex gap-2 justify-center">
                        {order.status === 'Pending' && (
                          <button
                            onClick={() => updateOrderStatus(order.id, 'Confirmed')}
                            className="px-2 py-1 rounded text-xs font-medium text-blue-300 hover:text-blue-200 hover:bg-blue-500/20 transition-all"
                          >
                            Confirm
                          </button>
                        )}
                        {order.status === 'Confirmed' && (
                          <button
                            onClick={() => updateOrderStatus(order.id, 'Shipped')}
                            className="px-2 py-1 rounded text-xs font-medium text-purple-300 hover:text-purple-200 hover:bg-purple-500/20 transition-all"
                          >
                            Ship
                          </button>
                        )}
                        {order.status === 'Shipped' && (
                          <button
                            onClick={() => updateOrderStatus(order.id, 'Delivered')}
                            className="px-2 py-1 rounded text-xs font-medium text-green-300 hover:text-green-200 hover:bg-green-500/20 transition-all"
                          >
                            Deliver
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="rounded-2xl border border-white/15 bg-white/10 backdrop-blur-md p-12 text-center">
          <div className="text-5xl mb-4">📭</div>
          <h3 className="text-xl font-semibold text-white mb-2">No Orders Yet</h3>
          <p className="text-white/60">Orders placed by vendors will appear here.</p>
        </div>
      )}
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

export default KaligardListedProducts;
