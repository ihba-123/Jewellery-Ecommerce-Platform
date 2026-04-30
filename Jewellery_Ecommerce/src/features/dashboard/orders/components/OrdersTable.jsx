import { Link } from 'react-router-dom';

const formatDate = (isoDate) => {
  const date = new Date(isoDate);
  return date.toLocaleDateString('en-GB');
};

const OrdersTable = ({ orders }) => {
  if (orders.length === 0) {
    return (
      <div className="rounded-md border border-dashed border-white/30 bg-white/5 p-8 text-center text-white/60">
        No orders found.
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border-collapse text-left text-sm text-white">
        <thead>
          <tr className="border-b font-bold text-[17px] leading-5 border-white/15 text-white/80">
            <th className="px-6 py-4 font-medium">Order #</th>
            <th className="px-6 py-4 font-medium">Placed On</th>
            <th className="px-6 py-4 font-medium">Items</th>
            <th className="px-6 py-4 font-medium">Status</th>
            <th className="px-6 py-4 font-medium">Total</th>
            <th className="px-6 py-4 font-medium text-right">Action</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.id} className="border-b border-white/10 align-middle">
              <td className="px-6 py-5 text-base text-white">{order.id}</td>
              <td className="px-6 py-5 text-base text-white">{formatDate(order.placedAt)}</td>
              <td className="px-6 py-5">
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-md border border-white/20 bg-white/10">
                    <svg className="h-6 w-6 text-yellow-300" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                      <path d="M7.2 3h9.6l4 6.2L12 21 3.2 9.2 7.2 3zm.9 1.8L5.5 8.8h4.9l2.2-4H8.1zm7.8 0h-4.5l2.2 4h4.9l-2.6-4h0zM12 18l6.1-7.4h-3.8L12 18zm0 0l-2.3-7.4H5.9L12 18z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-white">{order.items[0].name}</p>
                    <p className="text-xs text-white/60">{order.items.length} item</p>
                  </div>
                </div>
              </td>
              <td className="px-6 py-5">
                <span className="rounded-full bg-yellow-500/20 px-2.5 py-1 text-xs font-semibold text-yellow-200 border border-yellow-400/30">
                  {order.status}
                </span>
              </td>
              <td className="px-6 py-5 text-base">Rs. {order.total}</td>
              <td className="px-6 py-5 text-right">
                <Link
                  to={`/dashboard/orders/${order.id}/manage`}
                  className="text-base font-medium text-cyan-600 transition-colors hover:text-cyan-700"
                >
                  MANAGE
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OrdersTable;
