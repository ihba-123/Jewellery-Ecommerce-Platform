import { useContext, useState } from 'react';
import { RiderOrderContext } from '../../context/RiderOrderContext';
import { MapPin, Calendar, DollarSign, Package, Phone, User } from 'lucide-react';

const DeliveryOrders = () => {
  const { orders, updateOrderStatus } = useContext(RiderOrderContext);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [filterStatus, setFilterStatus] = useState('all');

  const filteredOrders = filterStatus === 'all'
    ? orders
    : orders.filter(order => order.status === filterStatus);

  const getStatusColor = (status) => {
    const colors = {
      pending: 'bg-yellow-500/20 text-yellow-200 border-yellow-500/30',
      in_transit: 'bg-blue-500/20 text-blue-200 border-blue-500/30',
      delivered: 'bg-emerald-500/20 text-emerald-200 border-emerald-500/30',
    };
    return colors[status] || colors.pending;
  };

  const getStatusLabel = (status) => {
    const labels = {
      pending: 'Pending',
      in_transit: 'In Transit',
      delivered: 'Delivered',
    };
    return labels[status] || status;
  };

  const handleStatusChange = (orderId, newStatus) => {
    updateOrderStatus(orderId, newStatus);
  };

  return (
    <div className="w-full">
      {/* Filter Tabs */}
      <div className="mb-6 flex gap-2 flex-wrap">
        {['all', 'pending', 'in_transit', 'delivered'].map((status) => (
          <button
            key={status}
            onClick={() => setFilterStatus(status)}
            className={`px-4 py-2 rounded-lg font-medium text-sm transition-all ${
              filterStatus === status
                ? 'bg-gradient-to-r from-[#f5d97c] via-[#d4af37] to-[#a87b12] text-[#231806]'
                : 'bg-white/10 text-white/70 border border-white/20 hover:bg-white/15'
            }`}
            style={{ border: filterStatus === status ? 'none' : '1px solid rgba(255,255,255,0.2)', cursor: 'pointer' }}
          >
            {status === 'all' ? 'All Orders' : getStatusLabel(status)}
            {' '}
            ({orders.filter(o => filterStatus === 'all' || o.status === filterStatus).length})
          </button>
        ))}
      </div>

      {/* Orders Grid */}
      <div className="grid gap-4">
        {filteredOrders.length === 0 ? (
          <div className="rounded-2xl border border-white/15 bg-white/10 backdrop-blur-md p-12 text-center">
            <Package className="h-12 w-12 text-white/40 mx-auto mb-4" />
            <p className="text-white/60">No orders found</p>
          </div>
        ) : (
          filteredOrders.map((order) => (
            <div
              key={order.id}
              className="rounded-2xl border border-white/15 bg-white/10 backdrop-blur-md p-5 sm:p-6 hover:bg-white/15 transition-all cursor-pointer"
              onClick={() => setSelectedOrder(order)}
            >
              <div className="flex items-start justify-between mb-4 flex-wrap gap-3">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 flex-wrap">
                    <h3 className="text-lg font-bold text-white">{order.id}</h3>
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getStatusColor(order.status)}`}>
                      {getStatusLabel(order.status)}
                    </span>
                  </div>
                  <p className="text-sm text-white/60 mt-1">
                    <User className="inline h-4 w-4 mr-1" />
                    {order.customerName}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold text-[#f5d97c]">₹{order.amount}</p>
                  <p className="text-xs text-white/60">{order.itemDescription}</p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                <div className="flex gap-2 text-sm">
                  <MapPin className="h-4 w-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                  <div className="min-w-0">
                    <p className="text-white/60">Pickup</p>
                    <p className="text-white truncate">{order.pickupAddress}</p>
                  </div>
                </div>
                <div className="flex gap-2 text-sm">
                  <MapPin className="h-4 w-4 text-red-400 flex-shrink-0 mt-0.5" />
                  <div className="min-w-0">
                    <p className="text-white/60">Delivery</p>
                    <p className="text-white truncate">{order.deliveryAddress}</p>
                  </div>
                </div>
              </div>

              <div className="flex gap-4 text-xs text-white/60">
                <div className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  {new Date(order.orderDate).toLocaleDateString()}
                </div>
                <div className="flex items-center gap-1">
                  <Package className="h-4 w-4" />
                  Est. {new Date(order.estimatedDelivery).toLocaleDateString()}
                </div>
              </div>

              {/* Quick Status Update */}
              {order.status !== 'delivered' && (
                <div className="mt-4 flex gap-2">
                  {order.status === 'pending' && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleStatusChange(order.id, 'in_transit');
                      }}
                      className="flex-1 h-8 px-3 rounded-lg bg-blue-500/20 text-blue-200 border border-blue-500/30 text-xs font-semibold hover:bg-blue-500/30 transition-all"
                      style={{ border: '1px solid rgba(59, 130, 246, 0.3)', cursor: 'pointer' }}
                    >
                      Start Delivery
                    </button>
                  )}
                  {order.status === 'in_transit' && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleStatusChange(order.id, 'delivered');
                      }}
                      className="flex-1 h-8 px-3 rounded-lg bg-emerald-500/20 text-emerald-200 border border-emerald-500/30 text-xs font-semibold hover:bg-emerald-500/30 transition-all"
                      style={{ border: '1px solid rgba(16, 185, 129, 0.3)', cursor: 'pointer' }}
                    >
                      Mark Delivered
                    </button>
                  )}
                </div>
              )}
            </div>
          ))
        )}
      </div>

      {/* Detail Modal */}
      {selectedOrder && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
          onClick={() => setSelectedOrder(null)}
        >
          <div
            className="rounded-2xl border border-white/15 bg-white/10 backdrop-blur-md p-6 max-w-md w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-white">Order Details</h3>
              <button
                onClick={() => setSelectedOrder(null)}
                className="text-white/60 hover:text-white"
                style={{ border: 'none', background: 'none', cursor: 'pointer' }}
              >
                ✕
              </button>
            </div>

            <div className="space-y-4 text-sm text-white/80">
              <div>
                <p className="text-white/60 text-xs mb-1">Order ID</p>
                <p className="font-semibold text-white">{selectedOrder.id}</p>
              </div>

              <div>
                <p className="text-white/60 text-xs mb-1">Customer</p>
                <p className="font-semibold text-white">{selectedOrder.customerName}</p>
              </div>

              <div>
                <p className="text-white/60 text-xs mb-1">Item</p>
                <p className="font-semibold text-white">{selectedOrder.itemDescription}</p>
              </div>

              <div>
                <p className="text-white/60 text-xs mb-1">Amount</p>
                <p className="font-bold text-[#f5d97c]">₹{selectedOrder.amount}</p>
              </div>

              <div className="border-t border-white/10 pt-4">
                <p className="text-white/60 text-xs mb-2">Pickup Address</p>
                <p className="text-white">{selectedOrder.pickupAddress}</p>
              </div>

              <div>
                <p className="text-white/60 text-xs mb-2">Delivery Address</p>
                <p className="text-white">{selectedOrder.deliveryAddress}</p>
              </div>

              <div>
                <p className="text-white/60 text-xs mb-1">Status</p>
                <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold border ${getStatusColor(selectedOrder.status)}`}>
                  {getStatusLabel(selectedOrder.status)}
                </span>
              </div>
            </div>

            <button
              onClick={() => setSelectedOrder(null)}
              className="w-full mt-6 h-10 rounded-lg bg-gradient-to-r from-[#f5d97c] via-[#d4af37] to-[#a87b12] text-sm font-semibold text-[#231806] hover:brightness-110 transition-all"
              style={{ border: 'none', cursor: 'pointer' }}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DeliveryOrders;
