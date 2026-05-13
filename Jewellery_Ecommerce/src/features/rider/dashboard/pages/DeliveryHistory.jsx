import { useContext } from 'react';
import { RiderOrderContext } from '../../context/RiderOrderContext';
import { Calendar, DollarSign, Package, CheckCircle } from 'lucide-react';

const DeliveryHistory = () => {
  const { orders } = useContext(RiderOrderContext);
  const deliveredOrders = orders.filter(order => order.status === 'delivered');

  const totalEarnings = deliveredOrders.reduce((sum, order) => sum + order.amount, 0);
  const averagePerDelivery = deliveredOrders.length > 0 ? (totalEarnings / deliveredOrders.length).toFixed(0) : 0;

  return (
    <div className="w-full">
      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <div className="rounded-2xl border border-white/15 bg-gradient-to-br from-white/12 to-white/8 backdrop-blur-md p-6 shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-white/70 text-sm font-semibold">Total Delivered</p>
              <p className="text-4xl font-bold text-white mt-2">{deliveredOrders.length}</p>
            </div>
            <CheckCircle className="h-10 w-10 text-emerald-400 opacity-80" />
          </div>
        </div>

        <div className="rounded-2xl border border-white/15 bg-gradient-to-br from-white/12 to-white/8 backdrop-blur-md p-6 shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-white/70 text-sm font-semibold">Total Earnings</p>
              <p className="text-3xl font-bold text-[#f5d97c] mt-2">₹{totalEarnings.toLocaleString()}</p>
            </div>
            <DollarSign className="h-10 w-10 text-[#f5d97c] opacity-80" />
          </div>
        </div>

        <div className="rounded-2xl border border-white/15 bg-gradient-to-br from-white/12 to-white/8 backdrop-blur-md p-6 shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-white/70 text-sm font-semibold">Avg per Delivery</p>
              <p className="text-3xl font-bold text-green-400 mt-2">₹{averagePerDelivery}</p>
            </div>
            <Package className="h-10 w-10 text-green-400 opacity-80" />
          </div>
        </div>
      </div>

      {/* History Table */}
      <div className="rounded-2xl border border-white/15 bg-gradient-to-br from-white/12 to-white/8 backdrop-blur-md overflow-hidden shadow-lg">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="border-b border-white/15 bg-white/8">
              <tr>
                <th className="px-6 py-4 text-left font-bold text-white">Order ID</th>
                <th className="px-6 py-4 text-left font-bold text-white">Customer</th>
                <th className="px-6 py-4 text-left font-bold text-white">Item</th>
                <th className="px-6 py-4 text-left font-bold text-white">Date</th>
                <th className="px-6 py-4 text-right font-bold text-white">Amount</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10">
              {deliveredOrders.length === 0 ? (
                <tr>
                  <td colSpan="5" className="px-6 py-12 text-center text-white/60">
                    <Package className="h-12 w-12 text-white/30 mx-auto mb-3" />
                    <p>No delivery history yet</p>
                  </td>
                </tr>
              ) : (
                deliveredOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-white/8 transition-colors">
                    <td className="px-6 py-4 font-bold text-white">{order.id}</td>
                    <td className="px-6 py-4 text-white">{order.customerName}</td>
                    <td className="px-6 py-4 text-white">{order.itemDescription}</td>
                    <td className="px-6 py-4 flex items-center gap-2 text-white">
                      <Calendar className="h-4 w-4 text-white/50" />
                      {new Date(order.orderDate).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 text-right font-bold text-[#f5d97c]">₹{order.amount}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DeliveryHistory;
