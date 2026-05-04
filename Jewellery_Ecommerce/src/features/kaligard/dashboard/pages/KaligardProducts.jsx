import { useState, useMemo } from 'react';
import ProductForm from '../components/ProductForm';
import { useKaligardProducts } from '../../context/KaligardProductContext';
import { X } from 'lucide-react';

const KaligardProducts = () => {
  const { products, addProduct, updateProduct, deleteProduct, listProduct, unlistProduct } = useKaligardProducts();

  const [showProductForm, setShowProductForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [toastMessage, setToastMessage] = useState('');
  const [selectedProductDetail, setSelectedProductDetail] = useState(null);

  const stats = useMemo(() => {
    return {
      total: products.length,
      active: products.filter(p => p.status === 'Active').length,
      listed: products.filter(p => p.isListed).length
    };
  }, [products]);

  const getStatusColor = (status) => {
    switch (status) {
      case 'Listed': return 'bg-yellow-300/20 text-yellow-200';
      case 'Active': return 'bg-green-500/20 text-green-200';
      case 'Low Stock': return 'bg-yellow-500/20 text-yellow-200';
      case 'Out of Stock': return 'bg-red-500/20 text-red-200';
      default: return 'bg-gray-500/20 text-gray-200';
    }
  };

  const showToast = (message) => {
    setToastMessage(message);
    setTimeout(() => setToastMessage(''), 3000);
  };

  const handleAddProduct = (formData) => {
    addProduct(formData);
    setShowProductForm(false);
    showToast('Product added successfully!');
  };

  const handleUpdateProduct = (formData) => {
    updateProduct(editingProduct.id, formData);
    setShowProductForm(false);
    setEditingProduct(null);
    showToast('Product updated successfully!');
  };

  const handleDeleteProduct = (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      deleteProduct(id);
      showToast('Product deleted successfully!');
    }
  };

  const handleListProduct = (id) => {
    listProduct(id);
    showToast('Product listed successfully! View in "List Products"');
  };

  const handleUnlistProduct = (id) => {
    unlistProduct(id);
    showToast('Product unlisted successfully!');
  };

  const handleEditClick = (product) => {
    setEditingProduct(product);
    setShowProductForm(true);
  };

  const handleAddClick = () => {
    setEditingProduct(null);
    setShowProductForm(true);
  };

  return (
    <div className="mx-auto w-full max-w-6xl space-y-6">
      {/* Toast Message */}
      {toastMessage && (
        <div className="fixed top-4 right-4 z-50 px-4 py-3 rounded-lg bg-green-500/20 border border-green-500/50 text-green-200 text-sm font-medium animate-in fade-in slide-in-from-top-2 duration-300">
          {toastMessage}
        </div>
      )}

      {/* Products Stats */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <StatCard title="Total Products" value={stats.total} icon="📦" />
        <StatCard title="Active" value={stats.active} icon="✅" />
        <StatCard title="Listed" value={stats.listed} icon="🎯" />
      </div>

      {/* Products Table */}
      <div className="rounded-2xl border border-white/15 bg-white/10 backdrop-blur-md overflow-hidden shadow-lg">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/15 bg-white/8">
                <th className="px-4 py-3 text-left text-sm font-semibold text-white">Product Name</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-white">Category</th>
                <th className="px-4 py-3 text-center text-sm font-semibold text-white">Price</th>
                <th className="px-4 py-3 text-center text-sm font-semibold text-white">Quantity</th>
                <th className="px-4 py-3 text-center text-sm font-semibold text-white">Status</th>
                <th className="px-4 py-3 text-center text-sm font-semibold text-white">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr
                  key={product.id}
                  onClick={() => setSelectedProductDetail(product)}
                  className="border-b border-white/10 hover:bg-white/12 transition-all cursor-pointer"
                >
                  <td className="px-4 py-3 text-white font-medium">
                    <div className="flex items-center gap-3">
                      {product.imageUrl ? (
                        <img src={product.imageUrl} alt={product.name} className="w-8 h-8 rounded object-cover" />
                      ) : (
                        <span className="w-8 h-8 rounded flex items-center justify-center bg-white/10">📦</span>
                      )}
                      <span>{product.name}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-white/70">{product.category}</td>
                  <td className="px-4 py-3 text-center text-white font-medium">{product.price}</td>
                  <td className="px-4 py-3 text-center text-white">{product.quantity}</td>
                  <td className="px-4 py-3 text-center">
                    <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(product.status)}`}>
                      {product.status}
                    </span>
                  </td>
                  <td className="px-4 py-3" onClick={(e) => e.stopPropagation()}>
                    <div className="flex flex-wrap gap-2 justify-center text-sm">
                      <button
                        onClick={() => handleEditClick(product)}
                        className="px-2 py-1 rounded text-blue-300 hover:text-blue-200 hover:bg-blue-500/20 transition-all"
                      >
                        Edit
                      </button>
                      {product.isListed ? (
                        <button
                          onClick={() => handleUnlistProduct(product.id)}
                          className="px-2 py-1 rounded text-orange-300 hover:text-orange-200 hover:bg-orange-500/20 transition-all"
                        >
                          Unlist
                        </button>
                      ) : (
                        <button
                          onClick={() => handleListProduct(product.id)}
                          className="px-2 py-1 rounded text-yellow-300 hover:text-yellow-200 hover:bg-yellow-500/20 transition-all"
                        >
                          Sale
                        </button>
                      )}
                      <button
                        onClick={() => handleDeleteProduct(product.id)}
                        className="px-2 py-1 rounded text-red-300 hover:text-red-200 hover:bg-red-500/20 transition-all"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {products.length === 0 && (
          <div className="px-6 py-8 text-center text-white/60">
            <p className="text-sm">No products yet. Click "Add New Product" to get started.</p>
          </div>
        )}
      </div>

      {/* Add Product Button */}
      <button
        onClick={handleAddClick}
        className="w-full px-4 py-3 rounded-lg bg-gradient-to-r from-[#f5d97c] via-[#d4af37] to-[#a87b12] text-[#231806] font-semibold hover:brightness-110 active:scale-95 transition-all"
      >
        + Add New Product
      </button>

      {/* Product Form Modal */}
      {showProductForm && (
        <ProductForm
          product={editingProduct}
          onSubmit={editingProduct ? handleUpdateProduct : handleAddProduct}
          onCancel={() => {
            setShowProductForm(false);
            setEditingProduct(null);
          }}
        />
      )}

      {/* Product Detail Modal */}
      {selectedProductDetail && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="rounded-2xl border border-white/15 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-md max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
            {/* Header */}
            <div className="sticky top-0 flex items-center justify-between p-6 border-b border-white/15 bg-white/5">
              <h2 className="text-2xl font-bold text-white">Product Details</h2>
              <button
                onClick={() => setSelectedProductDetail(null)}
                className="p-2 rounded-lg hover:bg-white/20 transition-all text-white/60 hover:text-white"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Content */}
            <div className="p-6 space-y-6">
              {/* Product Image */}
              <div className="flex justify-center">
                {selectedProductDetail.imageUrl ? (
                  <img
                    src={selectedProductDetail.imageUrl}
                    alt={selectedProductDetail.name}
                    className="w-40 h-40 rounded-xl object-cover border border-white/20"
                  />
                ) : (
                  <div className="w-40 h-40 rounded-xl flex items-center justify-center bg-white/10 border border-white/20">
                    <span className="text-5xl">📦</span>
                  </div>
                )}
              </div>

              {/* Product Info */}
              <div className="space-y-4">
                {/* Name */}
                <div>
                  <p className="text-white/60 text-sm font-medium mb-1">Product Name</p>
                  <p className="text-white text-lg font-semibold">{selectedProductDetail.name}</p>
                </div>

                {/* Category & Price */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-white/60 text-sm font-medium mb-1">Category</p>
                    <p className="text-white font-medium">{selectedProductDetail.category}</p>
                  </div>
                  <div>
                    <p className="text-white/60 text-sm font-medium mb-1">Price</p>
                    <p className="text-yellow-300 font-bold text-lg">{selectedProductDetail.price}</p>
                  </div>
                </div>

                {/* Quantity & Status */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-white/60 text-sm font-medium mb-1">Stock Quantity</p>
                    <p className="text-white font-medium">{selectedProductDetail.quantity} units</p>
                  </div>
                  <div>
                    <p className="text-white/60 text-sm font-medium mb-1">Status</p>
                    <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(selectedProductDetail.status)}`}>
                      {selectedProductDetail.status}
                    </span>
                  </div>
                </div>

                {/* Listed Status */}
                <div>
                  <p className="text-white/60 text-sm font-medium mb-1">Listing Status</p>
                  <div className="flex items-center gap-2">
                    <div className={`w-3 h-3 rounded-full ${selectedProductDetail.isListed ? 'bg-green-500' : 'bg-gray-500'}`} />
                    <p className="text-white font-medium">
                      {selectedProductDetail.isListed ? 'Listed for Sale' : 'Not Listed'}
                    </p>
                  </div>
                </div>

                {/* Description */}
                {selectedProductDetail.description && (
                  <div>
                    <p className="text-white/60 text-sm font-medium mb-1">Description</p>
                    <p className="text-white/80 text-sm">{selectedProductDetail.description}</p>
                  </div>
                )}

                {/* Listed Date */}
                {selectedProductDetail.listedDate && (
                  <div>
                    <p className="text-white/60 text-sm font-medium mb-1">Listed Since</p>
                    <p className="text-white/80 text-sm">{selectedProductDetail.listedDate}</p>
                  </div>
                )}
              </div>

              {/* Actions */}
              <div className="grid grid-cols-2 gap-3 pt-4 border-t border-white/15">
                <button
                  onClick={() => {
                    handleEditClick(selectedProductDetail);
                    setSelectedProductDetail(null);
                  }}
                  className="px-4 py-2.5 rounded-lg bg-blue-500/20 border border-blue-500/30 text-blue-300 hover:text-blue-200 hover:bg-blue-500/30 text-sm font-semibold transition-all"
                >
                  Edit
                </button>
                {selectedProductDetail.isListed ? (
                  <button
                    onClick={() => {
                      handleUnlistProduct(selectedProductDetail.id);
                      setSelectedProductDetail(null);
                    }}
                    className="px-4 py-2.5 rounded-lg bg-orange-500/20 border border-orange-500/30 text-orange-300 hover:text-orange-200 hover:bg-orange-500/30 text-sm font-semibold transition-all"
                  >
                    Unlist
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      handleListProduct(selectedProductDetail.id);
                      setSelectedProductDetail(null);
                    }}
                    className="px-4 py-2.5 rounded-lg bg-yellow-500/20 border border-yellow-500/30 text-yellow-300 hover:text-yellow-200 hover:bg-yellow-500/30 text-sm font-semibold transition-all"
                  >
                    List for Sale
                  </button>
                )}
                <button
                  onClick={() => {
                    handleDeleteProduct(selectedProductDetail.id);
                    setSelectedProductDetail(null);
                  }}
                  className="px-4 py-2.5 rounded-lg bg-red-500/20 border border-red-500/30 text-red-300 hover:text-red-200 hover:bg-red-500/30 text-sm font-semibold transition-all col-span-2"
                >
                  Delete Product
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const StatCard = ({ title, value, icon }) => (
  <div className="rounded-xl border border-white/15 bg-white/10 backdrop-blur-sm p-4 hover:bg-white/15 transition-all">
    <div className="text-3xl mb-2">{icon}</div>
    <p className="text-white/60 text-sm font-medium">{title}</p>
    <p className="text-2xl font-bold text-white mt-1">{value}</p>
  </div>
);

export default KaligardProducts;
