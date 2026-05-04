import { useState, useMemo } from 'react';
import { ShoppingCart, Trash2 } from 'lucide-react';
import { useVendorOrders } from '../../context/VendorOrderContext';

const KaligardOrders = () => {
  const { vendorOrders, addVendorOrder, cancelOrder } = useVendorOrders();

  const [allListedProducts] = useState([
    { id: 101, vendorName: "Golden Designs", name: "Premium Gold Sheet", price: "₹5,000", category: "Materials", quantity: 50, imageUrl: null },
    { id: 102, vendorName: "Diamond Corp", name: "Diamond Dust", price: "₹8,000", category: "Materials", quantity: 20, imageUrl: null },
    { id: 103, vendorName: "Silver Touch", name: "Silver Ingot", price: "₹3,000", category: "Materials", quantity: 100, imageUrl: null }
  ]);

  const [selectedProduct, setSelectedProduct] = useState(null);
  const [orderQuantity, setOrderQuantity] = useState(1);
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [specialNotes, setSpecialNotes] = useState('');
  const [showOrderForm, setShowOrderForm] = useState(false);

  const stats = useMemo(() => {
    return {
      totalOrders: vendorOrders.length,
      pending: vendorOrders.filter(o => o.status === 'Pending').length,
      confirmed: vendorOrders.filter(o => o.status === 'Confirmed').length,
      shipped: vendorOrders.filter(o => o.status === 'Shipped').length
    };
  }, [vendorOrders]);

  const getStatusColor = (status) => {
    switch (status) {
      case 'Pending': return 'bg-yellow-500/20 text-yellow-200';
      case 'Confirmed': return 'bg-blue-500/20 text-blue-200';
      case 'Shipped': return 'bg-green-500/20 text-green-200';
      case 'Delivered': return 'bg-green-500/20 text-green-200';
      default: return 'bg-gray-500/20 text-gray-200';
    }
  };

  const handlePlaceOrder = (e) => {
    e.preventDefault();
    if (!selectedProduct || orderQuantity <= 0 || !deliveryAddress.trim()) {
      alert('Please fill all required fields');
      return;
    }

    const totalPrice = parseInt(selectedProduct.price.replace(/[^0-9]/g, '')) * orderQuantity;

    addVendorOrder({
      vendorName: selectedProduct.vendorName,
      productName: selectedProduct.name,
      quantity: orderQuantity,
      price: selectedProduct.price,
      totalPrice: `₹${totalPrice.toLocaleString('en-IN')}`,
      status: 'Pending'
    });

    setShowOrderForm(false);
    setSelectedProduct(null);
    setOrderQuantity(1);
    setDeliveryAddress('');
    setSpecialNotes('');
  };

  const handleCancelOrder = (orderId) => {
    if (window.confirm('Are you sure you want to cancel this order?')) {
      cancelOrder(orderId);
    }
  };

  return (
    <div className="mx-auto w-full max-w-6xl space-y-6">
      {/* Page Header */}
      <div className="rounded-2xl border border-blue-300/30 bg-gradient-to-r from-blue-500/20 via-cyan-500/20 to-blue-500/20 backdrop-blur-md p-6 sm:p-8">
        <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2">Vendor Orders</h1>
        <p className="text-white/80 text-lg">Order materials from other vendors</p>
      </div>

      {/* Order Stats */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard title="Total Orders" value={stats.totalOrders} icon="📦" />
        <StatCard title="Pending" value={stats.pending} icon="⏳" />
        <StatCard title="Confirmed" value={stats.confirmed} icon="✅" />
        <StatCard title="Shipped" value={stats.shipped} icon="🚚" />
      </div>

      {/* Place Order Button */}
      <button
        onClick={() => setShowOrderForm(!showOrderForm)}
        className="w-full px-4 py-3 rounded-lg bg-gradient-to-r from-[#f5d97c] via-[#d4af37] to-[#a87b12] text-[#231806] font-semibold hover:brightness-110 active:scale-95 transition-all flex items-center justify-center gap-2"
      >
        <ShoppingCart className="h-5 w-5" />
        Place New Order
      </button>

      {/* Order Form */}
      {showOrderForm && (
        <div className="rounded-2xl border border-white/15 bg-white/10 backdrop-blur-md p-6 space-y-4">
          <h2 className="text-xl font-bold text-white mb-4">Place Order</h2>

          {/* Select Product */}
          <div>
            <label className="block text-sm font-medium text-white/80 mb-2">Select Product *</label>
            <select
              value={selectedProduct?.id || ''}
              onChange={(e) => {
                const product = allListedProducts.find(p => p.id === parseInt(e.target.value));
                setSelectedProduct(product);
              }}
              className="w-full px-3 py-2 rounded-lg border border-white/20 bg-white/10 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-yellow-500/30 focus:border-yellow-300 transition-all appearance-none cursor-pointer"
            >
              <option value="" style={{ backgroundColor: '#1f2937', color: '#fff' }}>Choose a product...</option>
              {allListedProducts.map(product => (
                <option key={product.id} value={product.id} style={{ backgroundColor: '#1f2937', color: '#fff' }}>
                  {product.name} ({product.vendorName}) - {product.price}
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Quantity */}
            <div>
              <label className="block text-sm font-medium text-white/80 mb-2">Quantity *</label>
              <input
                type="number"
                value={orderQuantity}
                onChange={(e) => setOrderQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                min="1"
                className="w-full px-3 py-2 rounded-lg border border-white/20 bg-white/10 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-yellow-500/30 focus:border-yellow-300 transition-all"
              />
            </div>

            {/* Delivery Address */}
            <div>
              <label className="block text-sm font-medium text-white/80 mb-2">Delivery Address *</label>
              <input
                type="text"
                value={deliveryAddress}
                onChange={(e) => setDeliveryAddress(e.target.value)}
                placeholder="Enter delivery address"
                className="w-full px-3 py-2 rounded-lg border border-white/20 bg-white/10 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-yellow-500/30 focus:border-yellow-300 transition-all"
              />
            </div>
          </div>

          {/* Special Notes */}
          <div>
            <label className="block text-sm font-medium text-white/80 mb-2">Special Notes</label>
            <textarea
              value={specialNotes}
              onChange={(e) => setSpecialNotes(e.target.value)}
              placeholder="Add any special instructions..."
              rows="3"
              className="w-full px-3 py-2 rounded-lg border border-white/20 bg-white/10 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-yellow-500/30 focus:border-yellow-300 transition-all resize-none"
            />
          </div>

          {/* Order Summary */}
          {selectedProduct && (
            <div className="rounded-lg border border-white/15 bg-white/5 p-4">
              <div className="flex justify-between mb-2">
                <span className="text-white/80">Product:</span>
                <span className="text-white font-medium">{selectedProduct.name}</span>
              </div>
              <div className="flex justify-between mb-2">
                <span className="text-white/80">Unit Price:</span>
                <span className="text-white font-medium">{selectedProduct.price}</span>
              </div>
              <div className="flex justify-between mb-2 pb-2 border-b border-white/10">
                <span className="text-white/80">Quantity:</span>
                <span className="text-white font-medium">{orderQuantity}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-white font-semibold">Total Price:</span>
                <span className="text-yellow-300 font-bold text-lg">
                  ₹{(parseInt(selectedProduct.price.replace(/[^0-9]/g, '')) * orderQuantity).toLocaleString('en-IN')}
                </span>
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="flex flex-col-reverse sm:flex-row gap-3 pt-4 border-t border-white/15">
            <button
              onClick={() => {
                setShowOrderForm(false);
                setSelectedProduct(null);
                setOrderQuantity(1);
                setDeliveryAddress('');
                setSpecialNotes('');
              }}
              className="px-6 py-2.5 rounded-lg border border-white/30 bg-white/10 text-sm font-semibold text-white hover:bg-white/20 active:scale-95 transition-all"
            >
              Cancel
            </button>
            <button
              onClick={handlePlaceOrder}
              className="px-6 py-2.5 rounded-lg bg-gradient-to-r from-[#f5d97c] via-[#d4af37] to-[#a87b12] text-sm font-semibold text-[#231806] hover:brightness-110 active:scale-95 transition-all"
            >
              Place Order
            </button>
          </div>
        </div>
      )}

      {/* Orders History */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-white">Order History</h2>
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
                        <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(order.status)}`}>
                          {order.status}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-center text-white/60 text-sm">{order.orderDate}</td>
                      <td className="px-4 py-3 text-center">
                        {order.status === 'Pending' && (
                          <button
                            onClick={() => handleCancelOrder(order.id)}
                            className="p-2 rounded text-red-300 hover:text-red-200 hover:bg-red-500/20 transition-all"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <div className="rounded-2xl border border-white/15 bg-white/10 backdrop-blur-md p-12 text-center">
            <div className="text-5xl mb-4">📋</div>
            <h3 className="text-xl font-semibold text-white mb-2">No Orders Yet</h3>
            <p className="text-white/60">Click "Place New Order" to start ordering materials from vendors.</p>
          </div>
        )}
      </div>
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

export default KaligardOrders;
