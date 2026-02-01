import { useState } from 'react';
import { Clock, User, MapPin, ChevronDown, ChevronUp } from 'lucide-react';

const OrderCard = ({ order, onStatusChange }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const statusColors = {
    Pending: 'bg-yellow-100 text-yellow-700 border-yellow-200',
    Preparing: 'bg-blue-100 text-blue-700 border-blue-200',
    Ready: 'bg-purple-100 text-purple-700 border-purple-200',
    Delivered: 'bg-green-100 text-green-700 border-green-200',
    Cancelled: 'bg-red-100 text-red-700 border-red-200',
  };

  const statusOptions = ['Pending', 'Preparing', 'Ready', 'Delivered', 'Cancelled'];

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString('en-IN', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      {/* Header */}
      <div className="p-4 border-b border-gray-100">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-3">
            <span className="font-bold text-gray-900">{order.orderNumber}</span>
            <span
              className={`px-2 py-1 rounded-full text-xs font-medium border ${
                statusColors[order.status]
              }`}
            >
              {order.status}
            </span>
          </div>
          <span className="text-lg font-bold text-indigo-600">
            ₹{order.totalAmount?.toFixed(0)}
          </span>
        </div>

        <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
          <div className="flex items-center gap-1">
            <User className="w-4 h-4" />
            <span>{order.customerName}</span>
          </div>
          <div className="flex items-center gap-1">
            <MapPin className="w-4 h-4" />
            <span>Table {order.tableNumber}</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            <span>{formatDate(order.createdAt)}</span>
          </div>
        </div>
      </div>

      {/* Items Preview / Expanded */}
      <div className="p-4">
        <div className="flex items-center justify-between mb-3">
          <span className="text-sm font-medium text-gray-700">
            {order.items?.length} item{order.items?.length !== 1 ? 's' : ''}
          </span>
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="flex items-center gap-1 text-sm text-indigo-600 hover:text-indigo-700"
          >
            {isExpanded ? (
              <>
                <span>Hide details</span>
                <ChevronUp className="w-4 h-4" />
              </>
            ) : (
              <>
                <span>View details</span>
                <ChevronDown className="w-4 h-4" />
              </>
            )}
          </button>
        </div>

        {/* Expanded Items List */}
        {isExpanded && (
          <div className="space-y-3 mb-4 pt-3 border-t border-gray-100">
            {order.items?.map((item, index) => (
              <div
                key={index}
                className="flex items-center gap-3 p-2 bg-gray-50 rounded-lg"
              >
                {item.menuItem?.imageUrl && (
                  <img
                    src={item.menuItem.imageUrl}
                    alt={item.menuItem?.name}
                    className="w-12 h-12 object-cover rounded-lg"
                  />
                )}
                <div className="flex-1">
                  <p className="font-medium text-gray-900">
                    {item.menuItem?.name || 'Unknown Item'}
                  </p>
                  <p className="text-sm text-gray-500">
                    {item.menuItem?.category}
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-medium text-gray-900">
                    x{item.quantity}
                  </p>
                  <p className="text-sm text-gray-500">
                    ₹{(item.price * item.quantity).toFixed(0)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Status Update */}
        <div className="flex items-center justify-between pt-3 border-t border-gray-100">
          <span className="text-sm font-medium text-gray-700">Update Status:</span>
          <select
            value={order.status}
            onChange={(e) => onStatusChange(order._id, e.target.value)}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium border focus:ring-2 focus:ring-indigo-500 ${
              statusColors[order.status]
            }`}
          >
            {statusOptions.map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

export default OrderCard;