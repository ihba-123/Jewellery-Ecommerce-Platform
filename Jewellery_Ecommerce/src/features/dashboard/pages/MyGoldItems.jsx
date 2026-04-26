const MyGoldItems = () => {
    return (
    <div className="mx-auto w-full max-w-4xl rounded-2xl border border-zinc-100 bg-white p-md shadow-sm sm:p-lg lg:p-xl">
    <div className="mb-6 flex items-center justify-between gap-3 border-b pb-4">
      <h2 className="text-h3 font-semibold text-zinc-800">My Pledged Gold Items</h2>
        </div>
        
    <div className="grid grid-cols-1 gap-md md:grid-cols-2 lg:grid-cols-3">
            <div className="flex min-h-48 cursor-pointer flex-col items-center justify-center rounded-2xl border border-dashed border-zinc-300 bg-zinc-50/50 p-lg text-center text-zinc-400 transition-colors hover:border-zinc-400 hover:bg-zinc-50">
                <span className="block mb-2">No gold items found.</span>
                <span className="text-sm">Items pledged in your loan requests will appear here.</span>
            </div>
        </div>
      </div>
    );
  };
  
export default MyGoldItems;