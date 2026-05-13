import { createContext, useState } from 'react';

export const RiderOrderContext = createContext();

export const RiderOrderProvider = ({ children }) => {
  const [orders, setOrders] = useState([
    {
      id: 'ORD001',
      customerName: 'Priya Sharma',
      itemDescription: 'Gold Necklace Set',
      pickupAddress: '123 Main St, Downtown',
      deliveryAddress: '456 Oak Ave, Midtown',
      pickupLat: 27.7172,
      pickupLng: 85.3240,
      deliveryLat: 27.7264,
      deliveryLng: 85.3161,
      status: 'pending',
      orderDate: '2024-05-13',
      estimatedDelivery: '2024-05-13',
      amount: 15000,
    },
    {
      id: 'ORD002',
      customerName: 'Rajesh Kumar',
      itemDescription: 'Diamond Bracelet',
      pickupAddress: '789 Pine Rd, Kathmandu',
      deliveryAddress: '321 Elm St, Bhaktapur',
      pickupLat: 27.7172,
      pickupLng: 85.3240,
      deliveryLat: 27.6663,
      deliveryLng: 85.4192,
      status: 'in_transit',
      orderDate: '2024-05-12',
      estimatedDelivery: '2024-05-13',
      amount: 25000,
    },
    {
      id: 'ORD003',
      customerName: 'Anjali Patel',
      itemDescription: 'Earrings Pair',
      pickupAddress: '555 Maple Dr, Thamel',
      deliveryAddress: '999 Cedar Ln, Patan',
      pickupLat: 27.7172,
      pickupLng: 85.3240,
      deliveryLat: 27.6743,
      deliveryLng: 85.3051,
      status: 'delivered',
      orderDate: '2024-05-10',
      estimatedDelivery: '2024-05-11',
      amount: 8000,
    },
  ]);

  const updateOrderStatus = (orderId, newStatus) => {
    setOrders(prev =>
      prev.map(order =>
        order.id === orderId ? { ...order, status: newStatus } : order
      )
    );
  };

  return (
    <RiderOrderContext.Provider value={{ orders, updateOrderStatus }}>
      {children}
    </RiderOrderContext.Provider>
  );
};
