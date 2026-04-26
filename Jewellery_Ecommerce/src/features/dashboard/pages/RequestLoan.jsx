import { useState } from 'react';

const RequestLoan = () => {
  const [formData, setFormData] = useState({
    principalAmount: '',
    maturityTime: '12',
  });

  const [goldItems, setGoldItems] = useState([
    { id: 1, type: 'Necklace', netWeight: '', stoneWeight: '', quantity: 1 }
  ]);

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const addGoldItem = () => {
    setGoldItems([
      ...goldItems,
      { id: Date.now(), type: 'Ring', netWeight: '', stoneWeight: '', quantity: 1 }
    ]);
  };

  const removeGoldItem = (id) => {
    setGoldItems(goldItems.filter(item => item.id !== id));
  };

  const updateGoldItem = (id, field, value) => {
    setGoldItems(
      goldItems.map(item => item.id === id ? { ...item, [field]: value } : item)
    );
  };

  const incrementQuantity = (id) => {
    setGoldItems(
      goldItems.map(item => item.id === id ? { ...item, quantity: item.quantity + 1 } : item)
    );
  };

  const decrementQuantity = (id) => {
    setGoldItems(
      goldItems.map(item => item.id === id && item.quantity > 1 ? { ...item, quantity: item.quantity - 1 } : item)
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submission:', { formData, goldItems });
    // TODO: Connect to backend
    alert('Loan request submitted successfully!');
  };

  return (
    <div className="mx-auto w-full max-w-4xl space-y-6">
      <div className="rounded-2xl border border-zinc-100 bg-white p-4 shadow-sm sm:p-6">
        <h2 className="mb-5 border-b pb-4 text-h3 font-semibold text-zinc-800">Loan Details</h2>
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          <div className="space-y-2">
            <label htmlFor="principalAmount" className="text-sm font-medium text-zinc-700">Principal Amount (NPR)</label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500 font-medium">रु</span>
              <input
                type="number"
                id="principalAmount"
                name="principalAmount"
                className="w-full pl-8 pr-4 py-2 bg-zinc-50 border border-zinc-200 rounded-xl focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-all outline-none"
                placeholder="0.00"
                value={formData.principalAmount}
                onChange={handleFormChange}
                required
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <label htmlFor="maturityTime" className="text-sm font-medium text-zinc-700">Maturity Time (Months)</label>
            <div className="relative">
              <select
                id="maturityTime"
                name="maturityTime"
                className="w-full pl-4 pr-10 py-2 bg-zinc-50 border border-zinc-200 rounded-xl focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-all outline-none appearance-none"
                value={formData.maturityTime}
                onChange={handleFormChange}
              >
                <option value="6">6 Months</option>
                <option value="12">12 Months (1 Year)</option>
                <option value="24">24 Months (2 Years)</option>
                <option value="36">36 Months (3 Years)</option>
              </select>
              <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none text-zinc-400">
                 <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-6 flex gap-3 rounded-xl border border-blue-100/50 bg-blue-50/50 p-4 text-blue-800">
          <svg className="w-5 h-5 shrink-0 text-blue-500 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
          <p className="text-sm">Rate will be determined by admin upon approval on a per-annum (% p.a.) basis.</p>
        </div>
      </div>

      <div className="overflow-hidden rounded-2xl border border-zinc-100 bg-white shadow-sm">
        <div className="flex items-center justify-between gap-3 border-b border-zinc-100 bg-zinc-50/30 p-4 sm:p-6">
          <h2 className="text-h3 font-semibold text-zinc-800">Gold Items to Pledge</h2>
          <button
            onClick={addGoldItem}
            type="button"
            className="flex items-center space-x-2 bg-zinc-900 text-white px-4 py-2 rounded-xl text-sm font-medium hover:bg-zinc-800 transition-colors shadow-sm"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path></svg>
            <span>Add Item</span>
          </button>
        </div>
        
        <div className="space-y-5 p-4 sm:p-6">
          {goldItems.map((item, index) => (
            <div key={item.id} className="group relative rounded-2xl border border-zinc-200/60 bg-zinc-50/50 p-4 transition-all hover:border-amber-500/30 hover:shadow-sm sm:p-5">
               {goldItems.length > 1 && (
                 <button
                   onClick={() => removeGoldItem(item.id)}
                   className="absolute -right-3 -top-3 z-10 flex h-8 w-8 items-center justify-center rounded-full border border-red-100 bg-white text-red-500 opacity-0 shadow-sm transition-all hover:bg-red-50 group-hover:opacity-100"
                   title="Remove Item"
                 >
                   <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                 </button>
               )}
               
               <div className="mb-4 border-b border-zinc-200/50 pb-2 text-xs font-bold uppercase tracking-wider text-zinc-400">Item #{index + 1}</div>
               
               <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
                 <div className="space-y-1.5">
                   <label className="text-xs font-medium text-zinc-600">Item Type</label>
                   <select
                     className="w-full px-3 py-2 bg-white border border-zinc-200 rounded-lg focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 outline-none text-sm appearance-none"
                     value={item.type}
                     onChange={(e) => updateGoldItem(item.id, 'type', e.target.value)}
                   >
                     <option value="Necklace">Necklace</option>
                     <option value="Ring">Ring</option>
                     <option value="Earrings">Earrings</option>
                     <option value="Bracelet">Bracelet</option>
                     <option value="Bangle">Bangle</option>
                     <option value="Pendant">Pendant</option>
                     <option value="Chain">Chain</option>
                     <option value="Other">Other</option>
                   </select>
                 </div>
                 
                 <div className="space-y-1.5">
                   <label className="text-xs font-medium text-zinc-600">Net Weight (g)</label>
                   <input
                     type="number"
                     placeholder="e.g. 15.5"
                     className="w-full px-3 py-2 bg-white border border-zinc-200 rounded-lg focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 outline-none text-sm"
                     value={item.netWeight}
                     onChange={(e) => updateGoldItem(item.id, 'netWeight', e.target.value)}
                   />
                 </div>
                 
                 <div className="space-y-1.5">
                   <label className="text-xs font-medium text-zinc-600">Stone Weight (g)</label>
                   <input
                     type="number"
                     placeholder="optional"
                     className="w-full px-3 py-2 bg-white border border-zinc-200 rounded-lg focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 outline-none text-sm"
                     value={item.stoneWeight}
                     onChange={(e) => updateGoldItem(item.id, 'stoneWeight', e.target.value)}
                   />
                 </div>
                 
                 <div className="space-y-1.5">
                   <label className="text-xs font-medium text-zinc-600">Quantity</label>
                   <div className="flex items-center h-[38px] bg-white border border-zinc-200 rounded-lg overflow-hidden">
                     <button
                       type="button"
                       onClick={() => decrementQuantity(item.id)}
                       className="px-3 h-full bg-zinc-50 hover:bg-zinc-100 text-zinc-500 border-r border-zinc-200 outline-none"
                     >
                       -
                     </button>
                     <div className="flex-1 text-center text-sm font-medium">{item.quantity}</div>
                     <button
                       type="button"
                       onClick={() => incrementQuantity(item.id)}
                       className="px-3 h-full bg-zinc-50 hover:bg-zinc-100 text-zinc-500 border-l border-zinc-200 outline-none"
                     >
                       +
                     </button>
                   </div>
                 </div>
               </div>
               
               {/* Auto calculated total weight preview */}
               <div className="mt-4 flex justify-end">
                 <div className="inline-flex items-center space-x-1.5 rounded-lg bg-zinc-100 px-3 py-1.5 text-xs font-medium text-zinc-600">
                   <span>Est. Total Weight:</span>
                   <span className="text-zinc-900 font-bold">
                     {item.netWeight ? ((parseFloat(item.netWeight) + (parseFloat(item.stoneWeight) || 0)) * item.quantity).toFixed(2) : '0.00'} g
                   </span>
                 </div>
               </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-end pt-4">
        <button
          onClick={handleSubmit}
          className="rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 px-6 py-3 font-semibold text-white shadow-lg shadow-amber-500/20 transition-all hover:from-amber-600 hover:to-amber-700 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2"
        >
          Submit Loan Request
        </button>
      </div>

    </div>
  );
};

export default RequestLoan;
