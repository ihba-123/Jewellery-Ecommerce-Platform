const formatDate = (isoDate) => new Date(isoDate).toLocaleDateString('en-GB');

const ReturnsTable = ({ returns }) => {
  if (returns.length === 0) {
    return (
      <div className="rounded-md border border-dashed border-white/30 bg-white/5 p-8 text-center text-white/60">
        No returned goods found.
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border-collapse text-left text-sm text-white">
        <thead>
          <tr className="border-b border-white/15 text-[17px] font-bold text-white/80">
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
            <tr key={`${row.orderId}-${row.itemName}`} className="border-b border-white/10 align-top">
              <td className="px-5 py-4 text-base text-white">{row.orderId}</td>
              <td className="px-5 py-4 text-base font-medium text-white">{row.itemName}</td>
              <td className="px-5 py-4 text-white/80">{row.description}</td>
              <td className="px-5 py-4 text-base text-white">Rs. {row.price}</td>
              <td className="px-5 py-4 text-white">{formatDate(row.requestedOn)}</td>
              <td className="px-5 py-4">
                <span className="rounded-full bg-green-500/20 px-2.5 py-1 text-xs font-semibold text-green-200 border border-green-400/30">
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
