import { createContext, useContext, useState, useCallback } from 'react';
import { menuAPI, orderAPI } from '../services/api';
import toast from 'react-hot-toast';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [menuItems, setMenuItems] = useState([]);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [menuPagination, setMenuPagination] = useState({});
  const [orderPagination, setOrderPagination] = useState({});

  // Fetch menu items
  const fetchMenuItems = useCallback(async (params = {}) => {
    try {
      setLoading(true);
      const response = await menuAPI.getAll(params);
      setMenuItems(response.data.data);
      setMenuPagination(response.data.pagination);
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to fetch menu items');
    } finally {
      setLoading(false);
    }
  }, []);

  // Search menu items
  const searchMenuItems = useCallback(async (query) => {
    if (!query.trim()) {
      return fetchMenuItems();
    }
    try {
      setLoading(true);
      const response = await menuAPI.search(query);
      setMenuItems(response.data.data);
      setMenuPagination({});
    } catch (error) {
      toast.error(error.response?.data?.message || 'Search failed');
    } finally {
      setLoading(false);
    }
  }, [fetchMenuItems]);

  // Create menu item
  const createMenuItem = useCallback(async (data) => {
    try {
      const response = await menuAPI.create(data);
      setMenuItems((prev) => [response.data.data, ...prev]);
      toast.success('Menu item created successfully');
      return response.data.data;
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to create menu item');
      throw error;
    }
  }, []);

  // Update menu item
  const updateMenuItem = useCallback(async (id, data) => {
    try {
      const response = await menuAPI.update(id, data);
      setMenuItems((prev) =>
        prev.map((item) => (item._id === id ? response.data.data : item))
      );
      toast.success('Menu item updated successfully');
      return response.data.data;
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to update menu item');
      throw error;
    }
  }, []);

  // Delete menu item
  const deleteMenuItem = useCallback(async (id) => {
    try {
      await menuAPI.delete(id);
      setMenuItems((prev) => prev.filter((item) => item._id !== id));
      toast.success('Menu item deleted successfully');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to delete menu item');
      throw error;
    }
  }, []);

  // Toggle availability (Optimistic Update)
  const toggleAvailability = useCallback(async (id) => {
    const previousItems = [...menuItems];
    
    setMenuItems((prev) =>
      prev.map((item) =>
        item._id === id ? { ...item, isAvailable: !item.isAvailable } : item
      )
    );

    try {
      await menuAPI.toggleAvailability(id);
      toast.success('Availability updated');
    } catch (error) {
      setMenuItems(previousItems);
      toast.error('Failed to update availability. Changes reverted.');
    }
  }, [menuItems]);

  // Fetch orders
  const fetchOrders = useCallback(async (params = {}) => {
    try {
      setLoading(true);
      const response = await orderAPI.getAll(params);
      setOrders(response.data.data);
      setOrderPagination(response.data.pagination);
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to fetch orders');
    } finally {
      setLoading(false);
    }
  }, []);

  // Update order status
  const updateOrderStatus = useCallback(async (id, status) => {
    try {
      const response = await orderAPI.updateStatus(id, status);
      setOrders((prev) =>
        prev.map((order) => (order._id === id ? response.data.data : order))
      );
      toast.success(`Order status updated to ${status}`);
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to update order status');
      throw error;
    }
  }, []);

  const value = {
    menuItems,
    orders,
    loading,
    menuPagination,
    orderPagination,
    fetchMenuItems,
    searchMenuItems,
    createMenuItem,
    updateMenuItem,
    deleteMenuItem,
    toggleAvailability,
    fetchOrders,
    updateOrderStatus,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};