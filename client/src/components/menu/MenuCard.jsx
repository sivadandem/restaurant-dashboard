import { Edit, Trash2, Clock, ToggleLeft, ToggleRight } from 'lucide-react';

const MenuCard = ({ item, onEdit, onDelete, onToggleAvailability }) => {
  const categoryColors = {
    Appetizer: 'bg-orange-100 text-orange-700',
    'Main Course': 'bg-blue-100 text-blue-700',
    Dessert: 'bg-pink-100 text-pink-700',
    Beverage: 'bg-green-100 text-green-700',
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
      {/* Image */}
      <div className="relative h-48 bg-gray-100">
        {item.imageUrl ? (
          <img
            src={item.imageUrl}
            alt={item.name}
            className="w-full h-full object-cover"
            onError={(e) => {
              e.target.style.display = 'none';
              e.target.nextSibling.style.display = 'flex';
            }}
          />
        ) : null}
        <div 
          className={`w-full h-full items-center justify-center text-gray-400 ${item.imageUrl ? 'hidden' : 'flex'}`}
        >
          No Image
        </div>
        
        {/* Category Badge */}
        <span
          className={`absolute top-3 left-3 px-2 py-1 rounded-full text-xs font-medium ${
            categoryColors[item.category] || 'bg-gray-100 text-gray-700'
          }`}
        >
          {item.category}
        </span>

        {/* Availability Badge */}
        <span
          className={`absolute top-3 right-3 px-2 py-1 rounded-full text-xs font-medium ${
            item.isAvailable
              ? 'bg-green-100 text-green-700'
              : 'bg-red-100 text-red-700'
          }`}
        >
          {item.isAvailable ? 'Available' : 'Unavailable'}
        </span>
      </div>

      {/* Content */}
      <div className="p-4">
        <div className="flex items-start justify-between mb-2">
          <h3 className="font-semibold text-gray-900 text-lg truncate flex-1">
            {item.name}
          </h3>
          <span className="text-lg font-bold text-indigo-600 ml-2">
            ₹{item.price?.toFixed(0)}
          </span>
        </div>

        {item.description && (
          <p className="text-sm text-gray-500 mb-3 line-clamp-2">
            {item.description}
          </p>
        )}

        {/* Prep Time */}
        {item.preparationTime && (
          <div className="flex items-center gap-1 text-sm text-gray-500 mb-3">
            <Clock className="w-4 h-4" />
            <span>{item.preparationTime} mins</span>
          </div>
        )}

        {/* Ingredients */}
        {item.ingredients && item.ingredients.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-4">
            {item.ingredients.slice(0, 3).map((ingredient, index) => (
              <span
                key={index}
                className="px-2 py-0.5 bg-gray-100 text-gray-600 text-xs rounded-full"
              >
                {ingredient}
              </span>
            ))}
            {item.ingredients.length > 3 && (
              <span className="px-2 py-0.5 bg-gray-100 text-gray-600 text-xs rounded-full">
                +{item.ingredients.length - 3} more
              </span>
            )}
          </div>
        )}

        {/* Actions */}
        <div className="flex items-center justify-between pt-3 border-t border-gray-100">
          <button
            onClick={() => onToggleAvailability(item._id)}
            className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
              item.isAvailable
                ? 'text-green-600 hover:bg-green-50'
                : 'text-red-600 hover:bg-red-50'
            }`}
          >
            {item.isAvailable ? (
              <ToggleRight className="w-5 h-5" />
            ) : (
              <ToggleLeft className="w-5 h-5" />
            )}
            {item.isAvailable ? 'On' : 'Off'}
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={() => onEdit(item)}
              className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
              title="Edit"
            >
              <Edit className="w-4 h-4" />
            </button>
            <button
              onClick={() => onDelete(item._id)}
              className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
              title="Delete"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MenuCard;