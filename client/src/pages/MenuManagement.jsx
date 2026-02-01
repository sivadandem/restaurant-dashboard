import { useState, useEffect } from 'react';
import { Plus } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { useDebounce } from '../hooks/useDebounce';
import MenuCard from '../components/menu/MenuCard';
import MenuForm from '../components/menu/MenuForm';
import MenuFilters from '../components/menu/MenuFilters';
import Modal from '../components/common/Modal';
import LoadingSpinner from '../components/common/LoadingSpinner';
import Pagination from '../components/common/Pagination';
import toast from 'react-hot-toast';

const MenuManagement = () => {
  const {
    menuItems,
    loading,
    menuPagination,
    fetchMenuItems,
    searchMenuItems,
    createMenuItem,
    updateMenuItem,
    deleteMenuItem,
    toggleAvailability,
  } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedAvailability, setSelectedAvailability] = useState('all');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  const debouncedSearch = useDebounce(searchQuery, 300);

  // Fetch menu items when filters change
  useEffect(() => {
    if (debouncedSearch) {
      searchMenuItems(debouncedSearch);
    } else {
      const params = {
        page: currentPage,
        limit: 12,
      };
      if (selectedCategory) params.category = selectedCategory;
      if (selectedAvailability !== 'all') params.isAvailable = selectedAvailability;
      
      fetchMenuItems(params);
    }
  }, [debouncedSearch, selectedCategory, selectedAvailability, currentPage, fetchMenuItems, searchMenuItems]);

  const handleAddNew = () => {
    setEditingItem(null);
    setIsModalOpen(true);
  };

  const handleEdit = (item) => {
    setEditingItem(item);
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this menu item?')) {
      try {
        await deleteMenuItem(id);
      } catch (error) {
        // Error handled in context
      }
    }
  };

  const handleFormSubmit = async (formData) => {
    try {
      if (editingItem) {
        await updateMenuItem(editingItem._id, formData);
      } else {
        await createMenuItem(formData);
      }
      setIsModalOpen(false);
      setEditingItem(null);
    } catch (error) {
      // Error handled in context
    }
  };

  const handleToggleAvailability = async (id) => {
    await toggleAvailability(id);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Menu Management</h1>
          <p className="text-gray-500">Manage your restaurant's menu items</p>
        </div>
        <button
          onClick={handleAddNew}
          className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
        >
          <Plus className="w-5 h-5" />
          Add Menu Item
        </button>
      </div>

      {/* Filters */}
      <MenuFilters
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        selectedCategory={selectedCategory}
        onCategoryChange={(cat) => {
          setSelectedCategory(cat);
          setCurrentPage(1);
        }}
        selectedAvailability={selectedAvailability}
        onAvailabilityChange={(avail) => {
          setSelectedAvailability(avail);
          setCurrentPage(1);
        }}
      />

      {/* Loading State */}
      {loading ? (
        <LoadingSpinner size="lg" />
      ) : (
        <>
          {/* Menu Grid */}
          {menuItems.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {menuItems.map((item) => (
                <MenuCard
                  key={item._id}
                  item={item}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                  onToggleAvailability={handleToggleAvailability}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-white rounded-xl border border-gray-200">
              <p className="text-gray-500 text-lg">No menu items found</p>
              <p className="text-gray-400 mt-1">Try adjusting your filters or add a new item</p>
            </div>
          )}

          {/* Pagination */}
          {menuPagination.totalPages > 1 && (
            <Pagination
              currentPage={menuPagination.currentPage}
              totalPages={menuPagination.totalPages}
              onPageChange={handlePageChange}
            />
          )}
        </>
      )}

      {/* Add/Edit Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingItem(null);
        }}
        title={editingItem ? 'Edit Menu Item' : 'Add New Menu Item'}
      >
        <MenuForm
          item={editingItem}
          onSubmit={handleFormSubmit}
          onCancel={() => {
            setIsModalOpen(false);
            setEditingItem(null);
          }}
        />
      </Modal>
    </div>
  );
};

export default MenuManagement;