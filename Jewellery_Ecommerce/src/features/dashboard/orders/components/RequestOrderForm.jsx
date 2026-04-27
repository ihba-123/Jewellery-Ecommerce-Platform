import { useState, useMemo } from 'react';
import { AlertCircle, CheckCircle, Trash2 } from 'lucide-react';

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
  const [touched, setTouched] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const errors = useMemo(() => {
    const e = {};

    // Validate order completion date
    if (!orderCompletionDate) {
      e.orderCompletionDate = 'Order completion date is required';
    } else {
      const selectedDate = new Date(orderCompletionDate);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      if (selectedDate < today) {
        e.orderCompletionDate = 'Date must be in the future';
      }
    }

    // Validate gold items
    goldItems.forEach((item, index) => {
      const itemKey = `item_${item.id}`;

      if (!item.netWeight) {
        e[`${itemKey}_netWeight`] = 'Net weight is required';
      } else if (isNaN(parseFloat(item.netWeight)) || parseFloat(item.netWeight) <= 0) {
        e[`${itemKey}_netWeight`] = 'Net weight must be a positive number';
      }

      if (item.stoneWeight && (isNaN(parseFloat(item.stoneWeight)) || parseFloat(item.stoneWeight) < 0)) {
        e[`${itemKey}_stoneWeight`] = 'Stone weight must be a positive number';
      }

      if (!item.estimatedValue) {
        e[`${itemKey}_estimatedValue`] = 'Estimated value is required';
      } else if (isNaN(parseFloat(item.estimatedValue)) || parseFloat(item.estimatedValue) <= 0) {
        e[`${itemKey}_estimatedValue`] = 'Estimated value must be a positive number';
      }
    });

    return e;
  }, [orderCompletionDate, goldItems]);

  const addGoldItem = () => {
    setGoldItems((prev) => [
      ...prev,
      {
        id: Date.now(),
        itemType: 'Necklace',
        netWeight: '',
        stoneWeight: '',
        purity: '22K (91.6%)',
        estimatedValue: '',
        serialNumber: '',
        description: ''
      }
    ]);
  };

  const removeGoldItem = (id) => {
    if (goldItems.length > 1) {
      setGoldItems((prev) => prev.filter((item) => item.id !== id));
    }
  };

  const updateGoldItem = (id, field, value) => {
    setGoldItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, [field]: value } : item))
    );
  };

  const handleFieldBlur = (fieldName) => {
    setTouched(prev => ({ ...prev, [fieldName]: true }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // Mark date as touched
    const allTouched = { orderCompletionDate: true };
    goldItems.forEach((item) => {
      allTouched[`item_${item.id}_netWeight`] = true;
      allTouched[`item_${item.id}_estimatedValue`] = true;
      if (item.stoneWeight) allTouched[`item_${item.id}_stoneWeight`] = true;
    });
    setTouched(allTouched);

    if (Object.keys(errors).length > 0) {
      return;
    }

    setIsLoading(true);
    try {
      onSubmit({ orderCompletionDate, goldItems });
      setOrderCompletionDate('');
      setGoldItems([INITIAL_ITEM]);
      setTouched({});
    } finally {
      setIsLoading(false);
    }
  };

  const getInputClass = (fieldName) => {
    const baseClass = 'w-full rounded-lg border px-3 py-2.5 outline-none focus:ring-2 transition';

    if (touched[fieldName] && errors[fieldName]) {
      return `${baseClass} border-red-300 focus:border-red-500 focus:ring-red-200`;
    }
    if (touched[fieldName] && !errors[fieldName]) {
      return `${baseClass} border-green-300 focus:border-green-500 focus:ring-green-200`;
    }
    return `${baseClass} border-zinc-300 focus:border-indigo-500 focus:ring-indigo-200`;
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="rounded-xl border border-zinc-200 bg-white shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-zinc-200 px-5 py-4 sm:px-6">
          <h2 className="text-2xl font-semibold text-zinc-800">Gold Items for Order</h2>
          <button
            type="button"
            onClick={addGoldItem}
            disabled={isLoading}
            className="rounded-xl bg-indigo-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            + Add Gold Item
          </button>
        </div>

        <div className="space-y-5 p-4 sm:p-6">
          {/* Order Completion Date */}
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
              <label className="mb-1 block text-sm font-medium text-zinc-700">Order Completion Date *</label>
              <input
                type="date"
                value={orderCompletionDate}
                onChange={(event) => setOrderCompletionDate(event.target.value)}
                onBlur={() => handleFieldBlur('orderCompletionDate')}
                className={getInputClass('orderCompletionDate')}
                disabled={isLoading}
              />
              {touched.orderCompletionDate && errors.orderCompletionDate && (
                <div className="mt-1 flex items-center gap-2 text-xs text-red-600">
                  <AlertCircle size={14} />
                  {errors.orderCompletionDate}
                </div>
              )}
              {touched.orderCompletionDate && !errors.orderCompletionDate && orderCompletionDate && (
                <div className="mt-1 flex items-center gap-2 text-xs text-green-600">
                  <CheckCircle size={14} />
                  Valid date
                </div>
              )}
            </div>
          </div>

          {/* Gold Items */}
          {goldItems.map((item, index) => (
            <section key={item.id} className="rounded-xl border border-zinc-200 bg-zinc-50 p-4 sm:p-5">
              <div className="mb-4 flex items-center justify-between">
                <h3 className="text-xl font-semibold text-zinc-800">Gold Item #{index + 1}</h3>
                {goldItems.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeGoldItem(item.id)}
                    disabled={isLoading}
                    className="text-red-600 hover:text-red-700 transition-colors disabled:opacity-50"
                  >
                    <Trash2 size={18} />
                  </button>
                )}
              </div>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                {/* Item Type */}
                <div>
                  <label className="mb-1 block text-sm font-medium text-zinc-700">Item Type</label>
                  <select
                    value={item.itemType}
                    onChange={(event) => updateGoldItem(item.id, 'itemType', event.target.value)}
                    className="w-full rounded-lg border border-zinc-300 px-3 py-2.5 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
                    disabled={isLoading}
                  >
                    <option>Necklace</option>
                    <option>Ring</option>
                    <option>Earrings</option>
                    <option>Bracelet</option>
                    <option>Pendant</option>
                  </select>
                </div>

                {/* Net Weight */}
                <div>
                  <label className="mb-1 block text-sm font-medium text-zinc-700">Net Weight (g) *</label>
                  <input
                    type="number"
                    step="0.01"
                    value={item.netWeight}
                    onChange={(event) => updateGoldItem(item.id, 'netWeight', event.target.value)}
                    onBlur={() => handleFieldBlur(`item_${item.id}_netWeight`)}
                    className={getInputClass(`item_${item.id}_netWeight`)}
                    placeholder="Net Weight (g)"
                    disabled={isLoading}
                  />
                  {touched[`item_${item.id}_netWeight`] && errors[`item_${item.id}_netWeight`] && (
                    <div className="mt-1 flex items-center gap-2 text-xs text-red-600">
                      <AlertCircle size={14} />
                      {errors[`item_${item.id}_netWeight`]}
                    </div>
                  )}
                  {touched[`item_${item.id}_netWeight`] && !errors[`item_${item.id}_netWeight`] && item.netWeight && (
                    <div className="mt-1 flex items-center gap-2 text-xs text-green-600">
                      <CheckCircle size={14} />
                      Valid
                    </div>
                  )}
                </div>

                {/* Stone Weight */}
                <div>
                  <label className="mb-1 block text-sm font-medium text-zinc-700">Stone Weight (g)</label>
                  <input
                    type="number"
                    step="0.01"
                    value={item.stoneWeight}
                    onChange={(event) => updateGoldItem(item.id, 'stoneWeight', event.target.value)}
                    onBlur={() => handleFieldBlur(`item_${item.id}_stoneWeight`)}
                    className={getInputClass(`item_${item.id}_stoneWeight`)}
                    placeholder="Stone Weight (g)"
                    disabled={isLoading}
                  />
                  {touched[`item_${item.id}_stoneWeight`] && errors[`item_${item.id}_stoneWeight`] && (
                    <div className="mt-1 flex items-center gap-2 text-xs text-red-600">
                      <AlertCircle size={14} />
                      {errors[`item_${item.id}_stoneWeight`]}
                    </div>
                  )}
                </div>

                {/* Purity */}
                <div>
                  <label className="mb-1 block text-sm font-medium text-zinc-700">Purity</label>
                  <select
                    value={item.purity}
                    onChange={(event) => updateGoldItem(item.id, 'purity', event.target.value)}
                    className="w-full rounded-lg border border-zinc-300 px-3 py-2.5 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
                    disabled={isLoading}
                  >
                    <option>22K (91.6%)</option>
                    <option>21K (87.5%)</option>
                    <option>18K (75.0%)</option>
                  </select>
                </div>

                {/* Estimated Value */}
                <div>
                  <label className="mb-1 block text-sm font-medium text-zinc-700">Estimated Value (NPR) *</label>
                  <input
                    type="number"
                    step="0.01"
                    value={item.estimatedValue}
                    onChange={(event) => updateGoldItem(item.id, 'estimatedValue', event.target.value)}
                    onBlur={() => handleFieldBlur(`item_${item.id}_estimatedValue`)}
                    className={getInputClass(`item_${item.id}_estimatedValue`)}
                    placeholder="Estimated Value (NPR)"
                    disabled={isLoading}
                  />
                  {touched[`item_${item.id}_estimatedValue`] && errors[`item_${item.id}_estimatedValue`] && (
                    <div className="mt-1 flex items-center gap-2 text-xs text-red-600">
                      <AlertCircle size={14} />
                      {errors[`item_${item.id}_estimatedValue`]}
                    </div>
                  )}
                  {touched[`item_${item.id}_estimatedValue`] && !errors[`item_${item.id}_estimatedValue`] && item.estimatedValue && (
                    <div className="mt-1 flex items-center gap-2 text-xs text-green-600">
                      <CheckCircle size={14} />
                      Valid value
                    </div>
                  )}
                </div>

                {/* Serial Number */}
                <div>
                  <label className="mb-1 block text-sm font-medium text-zinc-700">Serial Number (Optional)</label>
                  <input
                    type="text"
                    value={item.serialNumber}
                    onChange={(event) => updateGoldItem(item.id, 'serialNumber', event.target.value)}
                    className="w-full rounded-lg border border-zinc-300 px-3 py-2.5 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
                    placeholder="Serial Number (Optional)"
                    disabled={isLoading}
                  />
                </div>

                {/* Description */}
                <div className="md:col-span-2">
                  <label className="mb-1 block text-sm font-medium text-zinc-700">Description (Optional)</label>
                  <textarea
                    rows="3"
                    value={item.description}
                    onChange={(event) => updateGoldItem(item.id, 'description', event.target.value)}
                    className="w-full rounded-lg border border-zinc-300 px-3 py-2.5 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
                    placeholder="Description (Optional)"
                    disabled={isLoading}
                  />
                </div>
              </div>
            </section>
          ))}

          <div className="flex justify-end border-t border-zinc-200 pt-4">
            <button
              type="submit"
              disabled={isLoading}
              className="rounded-lg bg-indigo-600 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Submitting...' : 'Submit Order'}
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default RequestOrderForm;
