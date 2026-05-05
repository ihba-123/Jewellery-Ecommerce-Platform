import { createContext, useContext, useState, useCallback } from "react";

const KaligardProductContext = createContext();

export const KaligardProductProvider = ({ children }) => {
  const [products, setProducts] = useState([
    {
      id: 1,
      name: "Gold Necklace Design A",
      category: "Designs",
      price: "₹15,000",
      quantity: 15,
      status: "In Stock",
      isListed: false,
      isHotDeal: false,
      isSelling: false,
      imageUrl:
        "https://tse4.mm.bing.net/th/id/OIP.ayACpdslq2Oq9hSUQnfMWQHaF1?rs=1&pid=ImgDetMain&o=7&rm=3",
    },
    {
      id: 2,
      name: "Diamond Ring Setting",
      category: "Designs",
      price: "₹8,500",
      quantity: 8,
      status: "In Stock",
      isListed: false,
      isHotDeal: false,
      isSelling: false,
      imageUrl: "https://tse4.mm.bing.net/th/id/OIP.ayACpdslq2Oq9hSUQnfMWQHaF1?rs=1&pid=ImgDetMain&o=7&rm=3",
    },
    {
      id: 3,
      name: "Bracelet Template B",
      category: "Templates",
      price: "₹12,000",
      quantity: 3,
      status: "In Stock",
      isListed: false,
      isHotDeal: false,
      isSelling: false,
      imageUrl: "https://tse4.mm.bing.net/th/id/OIP.ayACpdslq2Oq9hSUQnfMWQHaF1?rs=1&pid=ImgDetMain&o=7&rm=3",
    },
    {
      id: 4,
      name: "Earring Design C",
      category: "Designs",
      price: "₹5,500",
      quantity: 0,
      status: "Out of Stock",
      isListed: false,
      isHotDeal: false,
      isSelling: false,
      imageUrl: "https://tse4.mm.bing.net/th/id/OIP.ayACpdslq2Oq9hSUQnfMWQHaF1?rs=1&pid=ImgDetMain&o=7&rm=3",
    },
  ]);

  const getProductStatus = useCallback(
    (quantity, isListed, isSelling = false) => {
      if (isSelling) return "Selling";
      if (isListed) return "Listed";
      if (quantity === 0) return "Out of Stock";
      return "In Stock";
    },
    [],
  );

  const addProduct = useCallback(
    (formData) => {
      const newProduct = {
        id: Math.max(...products.map((p) => p.id), 0) + 1,
        name: formData.name,
        category: formData.category,
        price: formData.price,
        quantity: formData.quantity,
        weight: formData.weight || null,
        purity: formData.purity || null,
        status: getProductStatus(formData.quantity, false),
        description: formData.description,
        imageUrl: formData.imageUrl || formData.imagePreview || null,
        isListed: false,
        isHotDeal: formData.isHotDeal || false,
      };
      setProducts([...products, newProduct]);
      return newProduct;
    },
    [products, getProductStatus],
  );

  const updateProduct = useCallback(
    (id, formData) => {
      setProducts(
        products.map((p) =>
          p.id === id
            ? {
                ...p,
                name: formData.name,
                category: formData.category,
                price: formData.price,
                quantity: formData.quantity,
                weight: formData.weight || null,
                purity: formData.purity || null,
                status: getProductStatus(formData.quantity, p.isListed),
                description: formData.description,
                imageUrl: formData.imageUrl || formData.imagePreview || null,
                isHotDeal: formData.isHotDeal || p.isHotDeal || false,
              }
            : p,
        ),
      );
    },
    [products, getProductStatus],
  );

  const deleteProduct = useCallback(
    (id) => {
      setProducts(products.filter((p) => p.id !== id));
    },
    [products],
  );

  const listProduct = useCallback(
    (id) => {
      setProducts(
        products.map((p) =>
          p.id === id
            ? {
                ...p,
                isListed: true,
                isSelling: true,
                status: getProductStatus(p.quantity, true, true),
                listedDate: new Date().toLocaleDateString(),
              }
            : p,
        ),
      );
    },
    [products, getProductStatus],
  );

  const unlistProduct = useCallback(
    (id) => {
      setProducts(
        products.map((p) =>
          p.id === id
            ? {
                ...p,
                isListed: false,
                status: getProductStatus(p.quantity, false),
              }
            : p,
        ),
      );
    },
    [products, getProductStatus],
  );

  const getListedProducts = useCallback(() => {
    return products.filter((p) => p.isListed);
  }, [products]);

  const value = {
    products,
    addProduct,
    updateProduct,
    deleteProduct,
    listProduct,
    unlistProduct,
    getListedProducts,
    getProductStatus,
  };

  return (
    <KaligardProductContext.Provider value={value}>
      {children}
    </KaligardProductContext.Provider>
  );
};

export const useKaligardProducts = () => {
  const context = useContext(KaligardProductContext);
  if (!context) {
    throw new Error(
      "useKaligardProducts must be used within KaligardProductProvider",
    );
  }
  return context;
};
