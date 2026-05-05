import { useState, useMemo } from 'react';
import ProductForm from '../components/ProductForm';
import { useKaligardProducts } from '../../context/KaligardProductContext';
import PageHeader from '../components/products/PageHeader';
import StatsSection from '../components/products/StatsSection';
import SearchBar from '../components/products/SearchBar';
import ProductCard from '../components/products/ProductCard';
import ProductDetailModal from '../components/products/ProductDetailModal';
import EmptyState from '../components/products/EmptyState';
import Toast from '../components/products/Toast';

const KaligardProducts = () => {
  const { products, addProduct, updateProduct, deleteProduct, listProduct } = useKaligardProducts();
  const [query, setQuery] = useState('');
  const [showProductForm, setShowProductForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [selectedProductDetail, setSelectedProductDetail] = useState(null);
  const [toastMessage, setToastMessage] = useState('');
  const [justListedIds, setJustListedIds] = useState([]);

  // Filter to show only unlisted products, but keep locally-listed ones visible
  const unlistedProducts = useMemo(() => products.filter(p => !p.isListed || justListedIds.includes(p.id)), [products, justListedIds]);

  const filteredProducts = useMemo(() => {
    return unlistedProducts.filter(product =>
      product.name.toLowerCase().includes(query.toLowerCase()) ||
      product.category.toLowerCase().includes(query.toLowerCase()) ||
      product.price.toString().toLowerCase().includes(query.toLowerCase())
    );
  }, [unlistedProducts, query]);

  const stats = useMemo(() => {
    return {
      total: unlistedProducts.length,
      active: unlistedProducts.filter(p => p.status === 'In Stock').length
    };
  }, [unlistedProducts]);

  const showToast = (message) => {
    setToastMessage(message);
    setTimeout(() => setToastMessage(''), 3000);
  };

  const handleAddClick = () => {
    setEditingProduct(null);
    setShowProductForm(true);
  };

  const handleAddProduct = (formData) => {
    addProduct(formData);
    setShowProductForm(false);
    showToast('Product added successfully!');
  };

  const handleEditProduct = (product) => {
    setEditingProduct(product);
    setShowProductForm(true);
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
      showToast('Product deleted!');
      setSelectedProductDetail(null);
    }
  };

  const handleListProduct = (id) => {
    // Mark globally as listed, but keep visible in this view via local state
    listProduct(id);
    setJustListedIds(prev => Array.from(new Set([...prev, id])));
    showToast('Product listed successfully!');
    setSelectedProductDetail(null);
  };

  const getStatusBadgeColor = (status) => {
    switch (status) {
      case 'Active': return 'from-emerald-500 to-teal-600';
      case 'Low Stock': return 'from-amber-500 to-orange-600';
      case 'Out of Stock': return 'from-red-500 to-red-600';
      default: return 'from-slate-500 to-slate-600';
    }
  };

  return (
    <div className="w-full space-y-6">
      <Toast message={toastMessage} isVisible={!!toastMessage} />
      <PageHeader onAdd={handleAddClick} />
      <StatsSection stats={stats} />
      <SearchBar query={query} onQueryChange={setQuery} />
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 gap-4 sm:gap-5 md:gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onEdit={handleEditProduct}
              onView={setSelectedProductDetail}
              onDelete={handleDeleteProduct}
              onList={handleListProduct}
              getStatusBadgeColor={getStatusBadgeColor}
              isListedLocal={justListedIds.includes(product.id)}
            />
          ))}
        </div>
      ) : (
        <EmptyState onAdd={handleAddClick} />
      )}
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
      <ProductDetailModal
        product={selectedProductDetail}
        onEdit={handleEditProduct}
        onList={handleListProduct}
        onClose={() => setSelectedProductDetail(null)}
      />
    </div>
  );
};

export default KaligardProducts;
