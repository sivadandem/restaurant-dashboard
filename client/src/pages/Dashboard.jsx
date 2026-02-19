import { useState, useEffect } from "react";
import { UtensilsCrossed, ClipboardList, DollarSign, TrendingUp, Clock, CheckCircle, Trash2, RefreshCw } from "lucide-react";
import { menuAPI, orderAPI } from "../services/api";
import LoadingSpinner from "../components/common/LoadingSpinner";
import ConfirmDialog from "../components/common/ConfirmDialog";
import toast from "react-hot-toast";

const RupeeIcon = ({ className }) => (
  <span className={`text-xl font-bold ${className}`}>₹</span>
);

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalMenuItems: 0,
    availableItems: 0,
    totalOrders: 0,
    pendingOrders: 0,
    totalRevenue: 0,
    deliveredOrders: 0,
  });
  const [topSellers, setTopSellers] = useState([]);
  const [recentOrders, setRecentOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  // Dialog states
  const [showClearDialog, setShowClearDialog] = useState(false);
  const [clearType, setClearType] = useState(""); // 'menu', 'orders', or 'all'
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);

      // Fetch menu items
      const menuResponse = await menuAPI.getAll({ limit: 100 });
      const menuItems = menuResponse.data.data;

      // Fetch orders
      const ordersResponse = await orderAPI.getAll({ limit: 100 });
      const orders = ordersResponse.data.data;

      // Fetch top sellers
      try {
        const topSellersResponse = await orderAPI.getTopSellers();
        setTopSellers(topSellersResponse.data.data || []);
      } catch (err) {
        console.log("Top sellers not available");
        setTopSellers([]);
      }

      // Calculate stats
      const availableItems = menuItems.filter((item) => item.isAvailable).length;
      const pendingOrders = orders.filter((o) => o.status === "Pending").length;
      const deliveredOrders = orders.filter((o) => o.status === "Delivered").length;
      const totalRevenue = orders.filter((o) => o.status === "Delivered").reduce((sum, o) => sum + o.totalAmount, 0);

      setStats({
        totalMenuItems: menuItems.length,
        availableItems,
        totalOrders: orders.length,
        pendingOrders,
        totalRevenue,
        deliveredOrders,
      });

      setRecentOrders(orders.slice(0, 5));
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleClearClick = (type) => {
    setClearType(type);
    setShowClearDialog(true);
  };

  const handleClearConfirm = async () => {
    setIsDeleting(true);
    try {
      if (clearType === "menu" || clearType === "all") {
        await menuAPI.clearAll();
      }
      if (clearType === "orders" || clearType === "all") {
        await orderAPI.clearAll();
      }

      toast.success(clearType === "all" ? "All data cleared successfully!" : `All ${clearType} cleared successfully!`);

      setShowClearDialog(false);
      fetchDashboardData(); // Refresh the dashboard
    } catch (error) {
      toast.error("Failed to clear data. Please try again.");
      console.error("Error clearing data:", error);
    } finally {
      setIsDeleting(false);
    }
  };

  const getDialogContent = () => {
    switch (clearType) {
      case "menu":
        return {
          title: "Clear All Menu Items",
          message: "Are you sure you want to delete all menu items? This will permanently remove all dishes from your menu.",
          confirmText: "Delete All Menu Items",
        };
      case "orders":
        return {
          title: "Clear All Orders",
          message: "Are you sure you want to delete all orders? This will permanently remove all order history.",
          confirmText: "Delete All Orders",
        };
      case "all":
        return {
          title: "Clear Entire Database",
          message: "Are you sure you want to delete ALL data? This will permanently remove all menu items AND all orders.",
          confirmText: "Delete Everything",
        };
      default:
        return { title: "", message: "", confirmText: "" };
    }
  };

  const statCards = [
    {
      title: "Total Menu Items",
      value: stats.totalMenuItems,
      subtitle: `${stats.availableItems} available`,
      icon: UtensilsCrossed,
      color: "bg-blue-500",
      bgColor: "bg-blue-50",
      iconColor: "#3b82f6",
    },
    {
      title: "Total Orders",
      value: stats.totalOrders,
      subtitle: `${stats.pendingOrders} pending`,
      icon: ClipboardList,
      color: "bg-orange-500",
      bgColor: "bg-orange-50",
      iconColor: "#f97316",
    },
    {
      title: "Total Revenue",
      value: `₹${stats.totalRevenue.toFixed(0)}`,
      subtitle: `From ${stats.deliveredOrders} orders`,
      icon: RupeeIcon,
      color: "bg-green-500",
      bgColor: "bg-green-50",
      iconColor: "#22c55e",
    },
    {
      title: "Delivered Orders",
      value: stats.deliveredOrders,
      subtitle: "Completed successfully",
      icon: CheckCircle,
      color: "bg-purple-500",
      bgColor: "bg-purple-50",
      iconColor: "#a855f7",
    },
  ];

  const getStatusColor = (status) => {
    const colors = {
      Pending: "bg-yellow-100 text-yellow-700",
      Preparing: "bg-blue-100 text-blue-700",
      Ready: "bg-purple-100 text-purple-700",
      Delivered: "bg-green-100 text-green-700",
      Cancelled: "bg-red-100 text-red-700",
    };
    return colors[status] || "bg-gray-100 text-gray-700";
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  const dialogContent = getDialogContent();

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-500">Welcome back! Here's what's happening today.</p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-2">
          <button onClick={fetchDashboardData} className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
            <RefreshCw className="w-4 h-4" />
            Refresh
          </button>
          <button onClick={() => handleClearClick("menu")} disabled={true}  className="flex items-center gap-2 px-4 py-2 bg-orange-100 text-orange-700 rounded-lg hover:bg-orange-200 transition-colors">
            <Trash2 className="w-4 h-4" />
            Clear Menu
          </button>
          <button onClick={() => handleClearClick("orders")}  disabled={true} className="flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors">
            <Trash2 className="w-4 h-4" />
            Clear Orders
          </button>
          <button onClick={() => handleClearClick("all")}   disabled={true}  className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors">
            <Trash2 className="w-4 h-4" />
            Clear All Data
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat, index) => (
          <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">{stat.title}</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
                <p className="text-sm text-gray-400 mt-1">{stat.subtitle}</p>
              </div>
              <div className={`p-3 rounded-xl ${stat.bgColor}`}>
                <stat.icon className="w-6 h-6" style={{ color: stat.iconColor }} />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Orders */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Recent Orders</h2>
            <Clock className="w-5 h-5 text-gray-400" />
          </div>

          <div className="space-y-4">
            {recentOrders.length > 0 ? (
              recentOrders.map((order) => (
                <div key={order._id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-900">{order.orderNumber}</p>
                    <p className="text-sm text-gray-500">
                      {order.customerName} • Table {order.tableNumber}
                    </p>
                  </div>
                  <div className="text-right">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>{order.status}</span>
                    <p className="text-sm font-medium text-gray-900 mt-1">₹{order.totalAmount?.toFixed(0)}</p>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-500 text-center py-4">No recent orders</p>
            )}
          </div>
        </div>

        {/* Top Selling Items */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Top Selling Items</h2>
            <TrendingUp className="w-5 h-5 text-gray-400" />
          </div>

          <div className="space-y-4">
            {topSellers.length > 0 ? (
              topSellers.map((item, index) => (
                <div key={item._id} className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg">
                  <div className="w-8 h-8 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center font-bold">{index + 1}</div>
                  <div className="flex-1">
                    <p className="font-medium text-gray-900">{item.name}</p>
                    <p className="text-sm text-gray-500">{item.category}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-gray-900">{item.totalQuantity} sold</p>
                    <p className="text-sm text-green-600">₹{item.totalRevenue?.toFixed(0)}</p>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-500 text-center py-4">No sales data yet</p>
            )}
          </div>
        </div>
      </div>

      {/* Clear Data Confirmation Dialog */}
      <ConfirmDialog isOpen={showClearDialog} onClose={() => setShowClearDialog(false)} onConfirm={handleClearConfirm} title={dialogContent.title} message={dialogContent.message} confirmText={dialogContent.confirmText} isLoading={isDeleting} />
    </div>
  );
};

export default Dashboard;
