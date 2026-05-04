import { createContext, useContext, useState, useCallback } from 'react';

const VendorOrderContext = createContext();

export const VendorOrderProvider = ({ children }) => {
  const [vendorOrders, setVendorOrders] = useState([
    { id: 7001, vendorName: "Raj Jewelry Store", productName: "Gold Necklace Design A", quantity: 5, price: "₹15,000", totalPrice: "₹75,000", status: "Confirmed", orderDate: "May 2, 2026" },
    { id: 7002, vendorName: "Diamond Hub", productName: "Diamond Ring Setting", quantity: 3, price: "₹8,500", totalPrice: "₹25,500", status: "Pending", orderDate: "May 1, 2026" }
  ]);

  const addVendorOrder = useCallback((order) => {
    const newOrder = {
      id: Math.max(...vendorOrders.map(o => o.id), 7000) + 1,
      ...order,
      orderDate: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })
    };
    setVendorOrders([...vendorOrders, newOrder]);
    return newOrder;
  }, [vendorOrders]);

  const updateOrderStatus = useCallback((orderId, newStatus) => {
    setVendorOrders(vendorOrders.map(o =>
      o.id === orderId ? { ...o, status: newStatus } : o
    ));
  }, [vendorOrders]);

  const cancelOrder = useCallback((orderId) => {
    setVendorOrders(vendorOrders.filter(o => o.id !== orderId));
  }, [vendorOrders]);

  const value = {
    vendorOrders,
    addVendorOrder,
    updateOrderStatus,
    cancelOrder
  };

  return (
    <VendorOrderContext.Provider value={value}>
      {children}
    </VendorOrderContext.Provider>
  );
};

export const useVendorOrders = () => {
  const context = useContext(VendorOrderContext);
  if (!context) {
    throw new Error('useVendorOrders must be used within VendorOrderProvider');
  }
  return context;
};
