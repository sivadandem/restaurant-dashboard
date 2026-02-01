import { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import OrderCard from '../components/orders/OrderCard';
import OrderFilters from '../components/orders/OrderFilters';
import OrderStats from '../components/orders/OrderStats';
import LoadingSpinner from '../components/common/LoadingSpinner';
import Pagination from '../components/common/Pagination';

const OrdersPage = () => {
  const {
    orders,
    loading,
    orderPagination,
    fetchOrders,
    updateOrderStatus,
  } = useApp();

  const [selectedStatus, setSelectedStatus] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const params = {
      page: currentPage,
      limit: 10,
    };
    if (selectedStatus) params.status = selectedStatus;
    
    fetchOrders(params);
  }, [selectedStatus, currentPage, fetchOrders]);

  const handleStatusChange = async (orderId, newStatus) => {
    await updateOrderStatus(orderId, newStatus);
  };

  const handleFilterChange = (status) => {
    setSelectedStatus(status);
    setCurrentPage(1);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Orders</h1>
        <p className="text-gray-500">Manage and track customer orders</p>
      </div>

      {/* Order Stats */}
      <OrderStats orders={orders} />

      {/* Filters */}
      <OrderFilters
        selectedStatus={selectedStatus}
        onStatusChange={handleFilterChange}
      />

      {/* Loading State */}
      {loading ? (
        <LoadingSpinner size="lg" />
      ) : (
        <>
          {/* Orders Grid */}
          {orders.length > 0 ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {orders.map((order) => (
                <OrderCard
                  key={order._id}
                  order={order}
                  onStatusChange={handleStatusChange}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-white rounded-xl border border-gray-200">
              <p className="text-gray-500 text-lg">No orders found</p>
              <p className="text-gray-400 mt-1">
                {selectedStatus
                  ? `No orders with status "${selectedStatus}"`
                  : 'Orders will appear here when customers place them'}
              </p>
            </div>
          )}

          {/* Pagination */}
          {orderPagination.totalPages > 1 && (
            <Pagination
              currentPage={orderPagination.currentPage}
              totalPages={orderPagination.totalPages}
              onPageChange={handlePageChange}
            />
          )}
        </>
      )}
    </div>
  );
};

export default OrdersPage;