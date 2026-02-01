import { Clock, ChefHat, CheckCircle, XCircle, Package } from 'lucide-react';

const OrderStats = ({ orders }) => {
  const stats = {
    pending: orders.filter((o) => o.status === 'Pending').length,
    preparing: orders.filter((o) => o.status === 'Preparing').length,
    ready: orders.filter((o) => o.status === 'Ready').length,
    delivered: orders.filter((o) => o.status === 'Delivered').length,
    cancelled: orders.filter((o) => o.status === 'Cancelled').length,
  };

  const statCards = [
    {
      label: 'Pending',
      value: stats.pending,
      icon: Clock,
      color: 'bg-yellow-50 text-yellow-600 border-yellow-200',
    },
    {
      label: 'Preparing',
      value: stats.preparing,
      icon: ChefHat,
      color: 'bg-blue-50 text-blue-600 border-blue-200',
    },
    {
      label: 'Ready',
      value: stats.ready,
      icon: Package,
      color: 'bg-purple-50 text-purple-600 border-purple-200',
    },
    {
      label: 'Delivered',
      value: stats.delivered,
      icon: CheckCircle,
      color: 'bg-green-50 text-green-600 border-green-200',
    },
    {
      label: 'Cancelled',
      value: stats.cancelled,
      icon: XCircle,
      color: 'bg-red-50 text-red-600 border-red-200',
    },
  ];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 mb-6">
      {statCards.map((stat) => (
        <div
          key={stat.label}
          className={`p-4 rounded-xl border ${stat.color}`}
        >
          <div className="flex items-center justify-between">
            <stat.icon className="w-6 h-6" />
            <span className="text-2xl font-bold">{stat.value}</span>
          </div>
          <p className="mt-2 text-sm font-medium">{stat.label}</p>
        </div>
      ))}
    </div>
  );
};

export default OrderStats;