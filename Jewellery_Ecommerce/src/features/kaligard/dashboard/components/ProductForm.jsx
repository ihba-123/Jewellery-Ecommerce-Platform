import { useState, useMemo } from 'react';
import { X } from 'lucide-react';

const ProductForm = ({ product = null, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    name: product?.name || '',
    category: product?.category || 'Designs',
    price: product?.price ? parseFloat(product.price.replace(/[^0-9.-]/g, '')) : '',
    quantity: product?.quantity || '',
    description: product?.description || '',
    imageFile: null,
    imagePreview: product?.imageUrl || null,
  });

  const [touched, setTouched] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const errors = useMemo(() => {
    const e = {};
    if (touched.name && !formData.name.trim()) {
      e.name = 'Product name is required';
    }
    if (touched.category && !formData.category) {
      e.category = 'Category is required';
    }
    if (touched.price && (!formData.price || formData.price <= 0)) {
      e.price = 'Price must be greater than 0';
    }
    if (touched.quantity && (!formData.quantity || formData.quantity < 0)) {
      e.quantity = 'Quantity cannot be negative';
    }
    return e;
  }, [formData, touched]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({
          ...prev,
          imageFile: file,
          imagePreview: reader.result
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched(prev => ({ ...prev, [name]: true }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setTouched({
      name: true,
      category: true,
      price: true,
      quantity: true
    });

    if (Object.keys(errors).length > 0) return;

    setIsSubmitting(true);

    await new Promise(resolve => setTimeout(resolve, 300));

    onSubmit({
      ...product,
      name: formData.name,
      category: formData.category,
      price: `₹${formData.price.toLocaleString('en-IN')}`,
      quantity: parseInt(formData.quantity),
      description: formData.description,
      imageUrl: formData.imagePreview,
      imageFile: formData.imageFile
    });

    setIsSubmitting(false);
  };

  const inputClass = (fieldName) => `
    w-full px-3 py-2 rounded-lg border bg-white/10 text-white placeholder-white/40
    transition-all focus:outline-none focus:ring-2 focus:ring-yellow-500/30 focus:border-yellow-300
    ${errors[fieldName] && touched[fieldName] ? 'border-red-500/50 bg-red-500/10' : 'border-white/20'}
  `;

  const selectClass = (fieldName) => `
    w-full px-3 py-2 rounded-lg border bg-white/10 text-white
    transition-all focus:outline-none focus:ring-2 focus:ring-yellow-500/30 focus:border-yellow-300
    ${errors[fieldName] && touched[fieldName] ? 'border-red-500/50 bg-red-500/10' : 'border-white/20'}
    appearance-none cursor-pointer
    [&>option]: bg-gray-900 text-white
    [&_option]: bg-gray-900 text-white
  `;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onCancel}
      />

      {/* Modal */}
      <div className="relative z-10 w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl border border-white/15 bg-white/10 backdrop-blur-md shadow-2xl animate-in fade-in slide-in-from-bottom-2 duration-300">

        {/* Header */}
        <div className="sticky top-0 flex items-center justify-between border-b border-white/15 bg-white/5 px-6 py-4">
          <h2 className="text-xl font-bold text-white">
            {product ? 'Edit Product' : 'Add New Product'}
          </h2>
          <button
            onClick={onCancel}
            className="p-1 text-white/60 hover:text-white transition-all"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        {/* Form Content */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5">

          {/* Image Upload Preview */}
          <div className="flex flex-col items-center gap-4">
            <div className="w-24 h-24 rounded-lg border-2 border-dashed border-white/30 bg-white/5 flex items-center justify-center overflow-hidden">
              {formData.imagePreview ? (
                <img
                  src={formData.imagePreview}
                  alt="Preview"
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="text-3xl">📦</span>
              )}
            </div>
            <label className="cursor-pointer px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-sm font-medium text-white hover:bg-white/15 transition-all">
              Upload Image
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />
            </label>
          </div>

          {/* Grid Layout */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Product Name */}
            <div>
              <label className="block text-sm font-medium text-white/80 mb-2">
                Product Name *
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="e.g., Gold Necklace"
                className={inputClass('name')}
              />
              {errors.name && touched.name && (
                <p className="text-red-400 text-xs mt-1">{errors.name}</p>
              )}
            </div>

            {/* Category */}
            <div>
              <label className="block text-sm font-medium text-white/80 mb-2">
                Category *
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                onBlur={handleBlur}
                className={selectClass('category')}
              >
                <option value="Designs" style={{ backgroundColor: '#1f2937', color: '#fff' }}>Designs</option>
                <option value="Templates" style={{ backgroundColor: '#1f2937', color: '#fff' }}>Templates</option>
                <option value="Components" style={{ backgroundColor: '#1f2937', color: '#fff' }}>Components</option>
                <option value="Accessories" style={{ backgroundColor: '#1f2937', color: '#fff' }}>Accessories</option>
              </select>
              {errors.category && touched.category && (
                <p className="text-red-400 text-xs mt-1">{errors.category}</p>
              )}
            </div>

            {/* Price */}
            <div>
              <label className="block text-sm font-medium text-white/80 mb-2">
                Price (₹) *
              </label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="0.00"
                step="0.01"
                className={inputClass('price')}
              />
              {errors.price && touched.price && (
                <p className="text-red-400 text-xs mt-1">{errors.price}</p>
              )}
            </div>

            {/* Quantity */}
            <div>
              <label className="block text-sm font-medium text-white/80 mb-2">
                Quantity *
              </label>
              <input
                type="number"
                name="quantity"
                value={formData.quantity}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="0"
                min="0"
                className={inputClass('quantity')}
              />
              {errors.quantity && touched.quantity && (
                <p className="text-red-400 text-xs mt-1">{errors.quantity}</p>
              )}
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-white/80 mb-2">
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Enter product description..."
              rows="4"
              className={`${inputClass('description')} resize-none`}
            />
          </div>

          {/* Actions */}
          <div className="flex flex-col-reverse sm:flex-row gap-3 pt-4 border-t border-white/15">
            <button
              type="button"
              onClick={onCancel}
              className="px-6 py-2.5 rounded-lg border border-white/30 bg-white/10 text-sm font-semibold text-white hover:bg-white/20 active:scale-95 transition-all"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-6 py-2.5 rounded-lg bg-gradient-to-r from-[#f5d97c] via-[#d4af37] to-[#a87b12] text-sm font-semibold text-[#231806] hover:brightness-110 active:scale-95 transition-all disabled:opacity-50"
            >
              {isSubmitting ? 'Saving...' : product ? 'Update Product' : 'Add Product'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductForm;
