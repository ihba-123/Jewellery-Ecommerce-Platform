import { useState } from 'react';

const INITIAL_ITEM = {
  id: 1,
  itemType: 'Necklace',
  netWeight: '',
  stoneWeight: '',
  purity: '22K (91.6%)',
  estimatedValue: '',
  serialNumber: '',
  description: ''
};

const RequestOrderForm = ({ onSubmit }) => {
  const [orderCompletionDate, setOrderCompletionDate] = useState('');
  const [goldItems, setGoldItems] = useState([INITIAL_ITEM]);

  const addGoldItem = () => {
    setGoldItems((prev) => [
      ...prev,
      {
        id: Date.now(),
        ...INITIAL_ITEM,
        id: Date.now()
      }
    ]);
  };

  const updateGoldItem = (id, field, value) => {
    setGoldItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, [field]: value } : item))
    );
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit({ orderCompletionDate, goldItems });
    setOrderCompletionDate('');
    setGoldItems([INITIAL_ITEM]);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="rounded-xl border border-zinc-200 bg-white shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-zinc-200 px-5 py-4 sm:px-6">
          <h2 className="text-2xl font-semibold text-zinc-800">Gold Items for Order</h2>
          <button
            type="button"
            onClick={addGoldItem}
            className="rounded-xl bg-indigo-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-indigo-700"
          >
            + Add Gold Item
          </button>
        </div>

        <div className="space-y-5 p-4 sm:p-6">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
              <label className="mb-1 block text-sm font-medium text-zinc-700">Order Completion Date</label>
              <input
                type="date"
                value={orderCompletionDate}
                onChange={(event) => setOrderCompletionDate(event.target.value)}
                className="w-full rounded-lg border border-zinc-300 px-3 py-2.5 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
                required
              />
            </div>
          </div>

          {goldItems.map((item, index) => (
            <section key={item.id} className="rounded-xl border border-zinc-200 bg-zinc-50 p-4 sm:p-5">
              <h3 className="mb-4 text-xl font-semibold text-zinc-800">Gold Item #{index + 1}</h3>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div>
                  <label className="mb-1 block text-sm font-medium text-zinc-700">Item Type</label>
                  <select
                    value={item.itemType}
                    onChange={(event) => updateGoldItem(item.id, 'itemType', event.target.value)}
                    className="w-full rounded-lg border border-zinc-300 px-3 py-2.5 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
                  >
                    <option>Necklace</option>
                    <option>Ring</option>
                    <option>Earrings</option>
                    <option>Bracelet</option>
                    <option>Pendant</option>
                  </select>
                </div>

                <div>
                  <label className="mb-1 block text-sm font-medium text-zinc-700">Net Weight (g)</label>
                  <input
                    type="number"
                    value={item.netWeight}
                    onChange={(event) => updateGoldItem(item.id, 'netWeight', event.target.value)}
                    placeholder="Net Weight (g)"
                    className="w-full rounded-lg border border-zinc-300 px-3 py-2.5 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
                    required
                  />
                </div>

                <div>
                  <label className="mb-1 block text-sm font-medium text-zinc-700">Stone Weight (g)</label>
                  <input
                    type="number"
                    value={item.stoneWeight}
                    onChange={(event) => updateGoldItem(item.id, 'stoneWeight', event.target.value)}
                    placeholder="Stone Weight (g)"
                    className="w-full rounded-lg border border-zinc-300 px-3 py-2.5 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
                  />
                </div>

                <div>
                  <label className="mb-1 block text-sm font-medium text-zinc-700">Purity</label>
                  <select
                    value={item.purity}
                    onChange={(event) => updateGoldItem(item.id, 'purity', event.target.value)}
                    className="w-full rounded-lg border border-zinc-300 px-3 py-2.5 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
                  >
                    <option>22K (91.6%)</option>
                    <option>21K (87.5%)</option>
                    <option>18K (75.0%)</option>
                  </select>
                </div>

                <div>
                  <label className="mb-1 block text-sm font-medium text-zinc-700">Estimated Value (NPR)</label>
                  <input
                    type="number"
                    value={item.estimatedValue}
                    onChange={(event) => updateGoldItem(item.id, 'estimatedValue', event.target.value)}
                    placeholder="Estimated Value (NPR)"
                    className="w-full rounded-lg border border-zinc-300 px-3 py-2.5 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
                    required
                  />
                </div>

                <div>
                  <label className="mb-1 block text-sm font-medium text-zinc-700">Serial Number (Optional)</label>
                  <input
                    type="text"
                    value={item.serialNumber}
                    onChange={(event) => updateGoldItem(item.id, 'serialNumber', event.target.value)}
                    placeholder="Serial Number (Optional)"
                    className="w-full rounded-lg border border-zinc-300 px-3 py-2.5 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="mb-1 block text-sm font-medium text-zinc-700">Description (Optional)</label>
                  <textarea
                    rows="3"
                    value={item.description}
                    onChange={(event) => updateGoldItem(item.id, 'description', event.target.value)}
                    placeholder="Description (Optional)"
                    className="w-full rounded-lg border border-zinc-300 px-3 py-2.5 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
                  />
                </div>
              </div>
            </section>
          ))}

          <div className="flex justify-end border-t border-zinc-200 pt-4">
            <button
              type="submit"
              className="rounded-lg bg-indigo-600 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-indigo-700"
            >
              Submit Order
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default RequestOrderForm;
