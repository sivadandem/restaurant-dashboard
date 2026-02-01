import { Filter } from 'lucide-react';

const OrderFilters = ({ selectedStatus, onStatusChange }) => {
  const statuses = [
    { value: '', label: 'All Orders' },
    { value: 'Pending', label: 'Pending' },
    { value: 'Preparing', label: 'Preparing' },
    { value: 'Ready', label: 'Ready' },
    { value: 'Delivered', label: 'Delivered' },
    { value: 'Cancelled', label: 'Cancelled' },
  ];

  const statusColors = {
    '': 'bg-gray-100 text-gray-700 hover:bg-gray-200',
    Pending: 'bg-yellow-100 text-yellow-700 hover:bg-yellow-200',
    Preparing: 'bg-blue-100 text-blue-700 hover:bg-blue-200',
    Ready: 'bg-purple-100 text-purple-700 hover:bg-purple-200',
    Delivered: 'bg-green-100 text-green-700 hover:bg-green-200',
    Cancelled: 'bg-red-100 text-red-700 hover:bg-red-200',
  };

  return (
    <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200 mb-6">
      <div className="flex items-center gap-3 mb-3">
        <Filter className="w-5 h-5 text-gray-400" />
        <span className="font-medium text-gray-700">Filter by Status:</span>
      </div>
      
      <div className="flex flex-wrap gap-2">
        {statuses.map((status) => (
          <button
            key={status.value}
            onClick={() => onStatusChange(status.value)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              selectedStatus === status.value
                ? `${statusColors[status.value]} ring-2 ring-offset-1 ring-indigo-500`
                : `${statusColors[status.value]} opacity-70`
            }`}
          >
            {status.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default OrderFilters;