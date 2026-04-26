const formatDate = (isoDate) => new Date(isoDate).toLocaleDateString('en-GB');

const ReturnsTable = ({ returns }) => {
  if (returns.length === 0) {
    return (
      <div className="rounded-md border border-dashed border-zinc-300 bg-zinc-50 p-8 text-center text-zinc-500">
        No returned goods found.
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border-collapse text-left text-sm text-zinc-800">
        <thead>
          <tr className="border-b border-zinc-200 text-zinc-600">
            <th className="px-5 py-3 font-medium">Order #</th>
            <th className="px-5 py-3 font-medium">Name</th>
            <th className="px-5 py-3 font-medium">Order Description</th>
            <th className="px-5 py-3 font-medium">Price</th>
            <th className="px-5 py-3 font-medium">Requested On</th>
            <th className="px-5 py-3 font-medium">Status</th>
          </tr>
        </thead>
        <tbody>
          {returns.map((row) => (
            <tr key={`${row.orderId}-${row.itemName}`} className="border-b border-zinc-200/80 align-top">
              <td className="px-5 py-4 text-base">{row.orderId}</td>
              <td className="px-5 py-4 text-base font-medium">{row.itemName}</td>
              <td className="px-5 py-4 text-zinc-600">{row.description}</td>
              <td className="px-5 py-4 text-base">Rs. {row.price}</td>
              <td className="px-5 py-4">{formatDate(row.requestedOn)}</td>
              <td className="px-5 py-4">
                <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-700">
                  {row.returnStatus}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ReturnsTable;
