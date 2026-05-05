import { useMemo, useState } from 'react';
import { Search, MoreHorizontal, CheckCircle2, Clock3, Truck, XCircle } from 'lucide-react';
import { useVendorOrders } from '../../context/VendorOrderContext';

const KaligardOrders = () => {
  const { vendorOrders } = useVendorOrders();
  const [query, setQuery] = useState('');

  const filteredOrders = useMemo(() => {
    const term = query.trim().toLowerCase();

    if (!term) return vendorOrders;

    return vendorOrders.filter((order) => {
      return [order.id, order.vendorName, order.productName, order.status, order.orderDate]
        .join(' ')
        .toLowerCase()
        .includes(term);
    });
  }, [query, vendorOrders]);

  const getStatusMeta = (status) => {
    switch (status) {
      case 'Pending':
        return { label: 'Pending', className: 'bg-amber-500/15 text-amber-100 ring-1 ring-amber-300/20', icon: Clock3 };
      case 'Confirmed':
        return { label: 'Confirmed', className: 'bg-sky-500/15 text-sky-100 ring-1 ring-sky-300/20', icon: CheckCircle2 };
      case 'Shipped':
        return { label: 'Shipped', className: 'bg-emerald-500/15 text-emerald-100 ring-1 ring-emerald-300/20', icon: Truck };
      case 'Delivered':
        return { label: 'Delivered', className: 'bg-emerald-500/15 text-emerald-100 ring-1 ring-emerald-300/20', icon: CheckCircle2 };
      default:
        return { label: status || 'Unknown', className: 'bg-white/10 text-white/80 ring-1 ring-white/10', icon: XCircle };
    }
  };

  return (
    <section className="mx-auto w-full max-w-350 text-white">
      <div className="overflow-hidden rounded-4xl border border-white/10 bg-linear-to-br from-[#6f6bdb] via-[#7b67ca] to-[#8a5eae] shadow-[0_30px_90px_-40px_rgba(22,9,58,0.75)]">
        <div className="border-b border-white/10 px-4 py-5 sm:px-6 lg:px-8 lg:py-7">
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-[2.75rem]">Order Requests</h1>
          <p className="mt-2 max-w-3xl text-sm text-white/75 sm:text-base lg:text-lg">
            Review and manage custom purchase requests from customers.
          </p>
        </div>

        <div className="px-3 py-4 sm:px-6 sm:py-5 lg:px-8">
          <div className="relative group">
            <div className="absolute inset-0 rounded-2xl bg-linear-to-r from-yellow-400/0 via-yellow-300/0 to-amber-400/0 opacity-0 blur-lg transition-opacity duration-300 group-focus-within:opacity-20 pointer-events-none" />
            <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-white/50 transition-colors duration-200 group-focus-within:text-white/70" />
            <input
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search by product name or Order ID..."
              className="relative h-14 w-full rounded-2xl border border-white/20 bg-white/8 pl-12 pr-4 text-base text-white placeholder:text-white/40 outline-none backdrop-blur-md shadow-[0_8px_32px_rgba(0,0,0,0.2)] transition-all duration-200 focus:border-white/40 focus:bg-white/12 focus:shadow-[0_12px_48px_rgba(139,92,246,0.15)] sm:h-16 sm:text-lg"
            />
          </div>
        </div>

        <div className="px-3 pb-3 sm:px-6 sm:pb-6 lg:px-8 lg:pb-8">
          <div className="overflow-hidden rounded-4xl border border-white/10 bg-white/10 backdrop-blur-md shadow-[0_18px_50px_-28px_rgba(0,0,0,0.45)]">
            <div className="overflow-x-auto">
              <table className="min-w-225 w-full border-collapse">
                <thead>
                  <tr className="border-b border-white/10 bg-white/5 text-left text-[0.75rem] font-semibold uppercase tracking-[0.24em] text-white/55">
                    <th className="px-5 py-4">Order ID</th>
                    <th className="px-5 py-4">Customer</th>
                    <th className="px-5 py-4">Product</th>
                    <th className="px-5 py-4 text-center">Status</th>
                    <th className="px-5 py-4 text-center">Actions</th>
                  </tr>
                </thead>

                <tbody>
                  {filteredOrders.length > 0 ? (
                    filteredOrders.map((order) => {
                      const statusMeta = getStatusMeta(order.status);
                      const StatusIcon = statusMeta.icon;

                      return (
                        <tr key={order.id} className="border-b border-white/5 last:border-b-0 hover:bg-white/5">
                          <td className="px-5 py-5 text-sm font-semibold text-white">#{order.id}</td>
                          <td className="px-5 py-5 text-sm text-white/80">{order.vendorName}</td>
                          <td className="px-5 py-5 text-sm text-white/90">{order.productName}</td>
                          <td className="px-5 py-5 text-center">
                            <span className={`inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-semibold ${statusMeta.className}`}>
                              <StatusIcon className="h-3.5 w-3.5" />
                              {statusMeta.label}
                            </span>
                          </td>
                          <td className="px-5 py-5 text-center">
                            <button
                              type="button"
                              className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/75 transition hover:bg-white/12 hover:text-white"
                              aria-label={`More actions for order ${order.id}`}
                            >
                              <MoreHorizontal className="h-5 w-5" />
                            </button>
                          </td>
                        </tr>
                      );
                    })
                  ) : (
                    <tr>
                      <td colSpan={5} className="px-6 py-24 text-center">
                        <p className="text-2xl font-semibold text-white/55">No order requests found.</p>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default KaligardOrders;