const MyLoans = () => {
    return (
      <div className="bg-white rounded-2xl p-8 shadow-sm border border-zinc-100 max-w-4xl mx-auto">
        <h2 className="text-xl font-semibold mb-6 text-zinc-800 border-b pb-4">Loan History</h2>
        
        <div className="overflow-x-auto text-zinc-800">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-zinc-50 border-b border-zinc-200">
                <th className="p-4 font-semibold text-sm">Loan ID</th>
                <th className="p-4 font-semibold text-sm">Principal (NPR)</th>
                <th className="p-4 font-semibold text-sm">Maturity</th>
                <th className="p-4 font-semibold text-sm">Status</th>
                <th className="p-4 font-semibold text-sm">Action</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td colSpan="5" className="p-8 text-center text-zinc-400 border-b border-zinc-100">
                  No active or past loans found.
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    );
  };
  
export default MyLoans;