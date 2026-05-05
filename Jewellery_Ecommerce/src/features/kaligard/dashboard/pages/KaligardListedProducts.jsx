import { useState, useMemo } from 'react';
import { Plus } from 'lucide-react';
import { useKaligardProducts } from '../../context/KaligardProductContext';
import ProductForm from '../components/ProductForm';
import PageHeader from '../components/products/PageHeader';

const KaligardListedProducts = () => {
  const { getListedProducts, deleteProduct, updateProduct, unlistProduct } = useKaligardProducts();
  const listedProducts = useMemo(() => getListedProducts(), [getListedProducts]);

  const [showProductForm, setShowProductForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [selectedProductDetail, setSelectedProductDetail] = useState(null);
  const [toastMessage, setToastMessage] = useState('');

  const stats = useMemo(() => {
    const total = listedProducts.length;
    const totalRevenue = listedProducts.reduce((sum, p) => {
      const price = parseFloat(p.price.replace(/[^0-9.-]/g, '')) || 0;
      return sum + price;
    }, 0);
    return {
      currently_selling: total,
      dynamic_revenue: `NPR ${(totalRevenue / 100000).toFixed(1)}K`
    };
  }, [listedProducts]);

  const filteredProducts = listedProducts;

  const showToast = (message) => {
    setToastMessage(message);
    setTimeout(() => setToastMessage(''), 3000);
  };

  const handleAddProduct = () => {
    setEditingProduct(null);
    setShowProductForm(true);
  };

  const handleEditProduct = (product) => {
    setEditingProduct(product);
    setShowProductForm(true);
  };

  const handleSaveProduct = (formData) => {
    if (editingProduct) {
      updateProduct(editingProduct.id, formData);
      showToast('Product updated successfully!');
    }
    setShowProductForm(false);
    setEditingProduct(null);
  };

  const handleDeleteProduct = (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      deleteProduct(id);
      showToast('Product deleted!');
    }
  };

  const handleUnlistProduct = (id) => {
    unlistProduct(id);
    showToast('Product unlisted!');
  };

  return (
    <div className="w-full space-y-6">
      {/* Toast Message */}
      {toastMessage && (
        <div className="fixed top-4 right-4 z-50 px-4 py-3 rounded-lg bg-green-500/20 border border-green-500/50 text-green-200 text-sm font-medium animate-in fade-in slide-in-from-top-2 duration-300">
          {toastMessage}
        </div>
      )}

      <PageHeader
        title="LISTED PRODUCTS"
        subtitle="Products currently visible to customers in the store."
        showAddButton={false}
      />

      {/* Stats Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="rounded-2xl border border-white/20 bg-white/10 backdrop-blur-md p-6 hover:bg-white/12 transition-all">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-full bg-linear-to-br from-emerald-400 to-teal-500 flex items-center justify-center shrink-0 shadow-lg">
              <span className="text-2xl">📦</span>
            </div>
            <div>
              <p className="text-white/70 text-sm font-medium">CURRENTLY SELLING</p>
              <p className="text-3xl font-bold text-white">{stats.currently_selling}</p>
            </div>
          </div>
        </div>
        <div className="rounded-2xl border border-white/20 bg-white/10 backdrop-blur-md p-6 hover:bg-white/12 transition-all">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-full bg-linear-to-br from-amber-400 to-orange-500 flex items-center justify-center shrink-0 shadow-lg">
              <span className="text-2xl">📊</span>
            </div>
            <div>
              <p className="text-white/70 text-sm font-medium">DYNAMIC REVENUE</p>
              <p className="text-3xl font-bold text-white">{stats.dynamic_revenue}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Products Cards Grid */}
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="rounded-2xl border border-white/20 bg-white/8 backdrop-blur-md overflow-hidden hover:bg-white/12 transition-all h-full flex flex-col"
            >
              {/* Product Image */}
              <div className="w-full h-64 overflow-hidden bg-linear-to-br from-[#6f6bdb]/20 to-[#8a5eae]/20 flex items-center justify-center">
                {product.imageUrl ? (
                  <img
                    src={product.imageUrl}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="text-6xl">📦</div>
                )}
              </div>

              {/* Card Content */}
              <div className="p-6 flex flex-col flex-1">
                {/* Product Name */}
                <h3 className="text-lg font-bold text-white mb-2 line-clamp-2">
                  {product.name}
                </h3>

                {/* Product ID */}
                <p className="text-xs text-white/50 font-mono mb-4 break-all">
                  ID: {product.id}
                </p>

                {/* Details Grid */}
                <div className="space-y-3 mb-4 flex-1">
                  <div className="flex justify-between items-start">
                    <span className="text-white/60 text-sm">Category</span>
                    <span className="text-white font-medium text-sm">{product.category}</span>
                  </div>
                  <div className="flex justify-between items-start">
                    <span className="text-white/60 text-sm">Stock</span>
                    <span className="text-white font-medium text-sm">{product.quantity} units</span>
                  </div>
                  <div className="flex justify-between items-start">
                    <span className="text-white/60 text-sm">Price</span>
                    <span className="text-emerald-400 font-bold text-sm">{product.price}</span>
                  </div>
                </div>

                {/* Unlist Button */}
                <button
                  onClick={() => handleUnlistProduct(product.id)}
                  className="w-full px-4 py-2 rounded-lg bg-red-500/20 hover:bg-red-500/30 text-red-200 text-sm font-medium transition-all"
                >
                  Unlist Product
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="rounded-2xl border border-white/20 bg-white/10 backdrop-blur-md p-12 text-center">
          <div className="text-6xl mb-4">📭</div>
          <h3 className="text-2xl font-bold text-white mb-2">No Products Listed</h3>
          <p className="text-white/60 mb-6">You haven't listed any products yet. Add a product to get started!</p>
          <button
            onClick={handleAddProduct}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-linear-to-r from-amber-400 to-orange-500 text-[#3d2510] font-bold hover:scale-105 transition-transform"
          >
            <Plus className="w-5 h-5" />
            Add Your First Product
          </button>
        </div>
      )}

      {/* Product Form Modal */}
      {showProductForm && (
        <ProductForm
          product={editingProduct}
          onSubmit={handleSaveProduct}
          onCancel={() => {
            setShowProductForm(false);
            setEditingProduct(null);
          }}
        />
      )}

      {/* Product Detail Modal */}
      {selectedProductDetail && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="rounded-2xl border border-white/20 bg-linear-to-br from-white/10 to-white/5 backdrop-blur-md max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
            {/* Header */}
            <div className="sticky top-0 flex items-center justify-between p-6 border-b border-white/15 bg-white/5">
              <h2 className="text-2xl font-bold text-white">Product Details</h2>
              <button
                onClick={() => setSelectedProductDetail(null)}
                className="text-white/60 hover:text-white transition-colors"
              >
                ✕
              </button>
            </div>

            {/* Content */}
            <div className="p-6 space-y-6">
              {/* Image */}
              {selectedProductDetail.imageUrl && (
                <div className="rounded-xl overflow-hidden h-64 bg-linear-to-br from-white/10 to-white/5">
                  <img
                    src={selectedProductDetail.imageUrl}
                    alt={selectedProductDetail.name}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}

              {/* Info */}
              <div className="space-y-4">
                <div>
                  <p className="text-white/60 text-sm">Product Name</p>
                  <p className="text-white font-bold text-lg">{selectedProductDetail.name}</p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-white/60 text-sm">Category</p>
                    <p className="text-white font-semibold">{selectedProductDetail.category}</p>
                  </div>
                  <div>
                    <p className="text-white/60 text-sm">Price</p>
                    <p className="text-white font-semibold">{selectedProductDetail.price}</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-white/60 text-sm">Quantity</p>
                    <p className="text-white font-semibold">{selectedProductDetail.quantity}</p>
                  </div>
                  <div>
                    <p className="text-white/60 text-sm">Status</p>
                    <p className="text-white font-semibold">{selectedProductDetail.status}</p>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-3 pt-4 border-t border-white/15">
                <button
                  onClick={() => {
                    handleEditProduct(selectedProductDetail);
                    setSelectedProductDetail(null);
                  }}
                  className="flex-1 px-4 py-2 rounded-lg bg-blue-500/20 hover:bg-blue-500/30 text-blue-300 hover:text-blue-200 font-semibold transition-all"
                >
                  Edit
                </button>
                <button
                  onClick={() => setSelectedProductDetail(null)}
                  className="flex-1 px-4 py-2 rounded-lg bg-white/10 hover:bg-white/15 text-white font-semibold transition-all"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default KaligardListedProducts;
