import { ordersData } from './ordersData';

const STORAGE_KEY = 'requestedOrders';

const safeParse = (value) => {
  try {
    return JSON.parse(value);
  } catch {
    return [];
  }
};

export const getRequestedOrders = () => {
  if (typeof window === 'undefined') {
    return [];
  }

  const raw = window.localStorage.getItem(STORAGE_KEY);
  const parsed = safeParse(raw || '[]');
  return Array.isArray(parsed) ? parsed : [];
};

export const getAllOrders = () => {
  return [...ordersData, ...getRequestedOrders()];
};

export const addRequestedOrder = (order) => {
  if (typeof window === 'undefined') {
    return;
  }

  const existing = getRequestedOrders();
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify([order, ...existing]));
};
