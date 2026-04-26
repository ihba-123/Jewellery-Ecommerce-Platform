const formatDateTime = (isoDate) =>
  new Date(isoDate).toLocaleString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });

const CancellationsList = ({ cancellations }) => {
  if (cancellations.length === 0) {
    return (
      <div className="rounded-md border border-dashed border-zinc-300 bg-white p-8 text-center text-zinc-500">
        No cancellation records found.
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {cancellations.map((entry) => (
        <article
          key={`${entry.orderId}-${entry.itemName}`}
          className="rounded-xl border border-rose-100 bg-white p-5 shadow-sm"
        >
          <div className="flex flex-wrap items-start justify-between gap-3 border-b border-zinc-200 pb-3">
            <div>
              <p className="text-sm font-medium text-zinc-500">Order # {entry.orderId}</p>
              <h3 className="mt-1 text-lg font-semibold text-zinc-800">{entry.itemName}</h3>
            </div>
            <span className="rounded-full bg-rose-50 px-3 py-1 text-xs font-semibold text-rose-700">
              Cancelled
            </span>
          </div>

          <p className="mt-3 text-sm text-zinc-600">{entry.description}</p>

          <div className="mt-4 grid grid-cols-1 gap-3 text-sm sm:grid-cols-3">
            <div className="rounded-lg bg-zinc-50 p-3">
              <p className="text-zinc-500">Price</p>
              <p className="mt-1 font-semibold text-zinc-800">Rs. {entry.price}</p>
            </div>
            <div className="rounded-lg bg-zinc-50 p-3">
              <p className="text-zinc-500">Cancelled On</p>
              <p className="mt-1 font-semibold text-zinc-800">{formatDateTime(entry.cancelledOn)}</p>
            </div>
            <div className="rounded-lg bg-zinc-50 p-3">
              <p className="text-zinc-500">Refund Status</p>
              <p className="mt-1 font-semibold text-zinc-800">{entry.refundStatus}</p>
            </div>
          </div>

          <p className="mt-4 text-sm text-zinc-700">
            <span className="font-medium">Reason:</span> {entry.cancellationReason}
          </p>
        </article>
      ))}
    </div>
  );
};

export default CancellationsList;
