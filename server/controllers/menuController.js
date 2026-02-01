const MenuItem = require('../models/MenuItem');

// @desc    Get all menu items with filters
// @route   GET /api/menu
// @access  Public
const getMenuItems = async (req, res) => {
  try {
    const { category, isAvailable, minPrice, maxPrice, page = 1, limit = 10 } = req.query;

    // Build filter object
    const filter = {};

    if (category) {
      filter.category = category;
    }

    if (isAvailable !== undefined) {
      filter.isAvailable = isAvailable === 'true';
    }

    if (minPrice || maxPrice) {
      filter.price = {};
      if (minPrice) filter.price.$gte = parseFloat(minPrice);
      if (maxPrice) filter.price.$lte = parseFloat(maxPrice);
    }

    // Pagination
    const skip = (parseInt(page) - 1) * parseInt(limit);

    const menuItems = await MenuItem.find(filter)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit));

    const total = await MenuItem.countDocuments(filter);

    res.status(200).json({
      success: true,
      data: menuItems,
      pagination: {
        currentPage: parseInt(page),
        totalPages: Math.ceil(total / parseInt(limit)),
        totalItems: total,
        itemsPerPage: parseInt(limit),
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message,
    });
  }
};

// @desc    Search menu items
// @route   GET /api/menu/search
// @access  Public
const searchMenuItems = async (req, res) => {
  try {
    const { q } = req.query;

    if (!q || q.trim() === '') {
      return res.status(400).json({
        success: false,
        message: 'Search query is required',
      });
    }

    // Sanitize the search query
    const sanitizedQuery = q.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

    // Search using regex for partial matches
    const menuItems = await MenuItem.find({
      $or: [
        { name: { $regex: sanitizedQuery, $options: 'i' } },
        { ingredients: { $regex: sanitizedQuery, $options: 'i' } },
        { description: { $regex: sanitizedQuery, $options: 'i' } },
      ],
    }).sort({ name: 1 });

    res.status(200).json({
      success: true,
      data: menuItems,
      count: menuItems.length,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message,
    });
  }
};

// @desc    Get single menu item
// @route   GET /api/menu/:id
// @access  Public
const getMenuItem = async (req, res) => {
  try {
    const menuItem = await MenuItem.findById(req.params.id);

    if (!menuItem) {
      return res.status(404).json({
        success: false,
        message: 'Menu item not found',
      });
    }

    res.status(200).json({
      success: true,
      data: menuItem,
    });
  } catch (error) {
    if (error.kind === 'ObjectId') {
      return res.status(400).json({
        success: false,
        message: 'Invalid menu item ID',
      });
    }
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message,
    });
  }
};

// @desc    Create menu item
// @route   POST /api/menu
// @access  Public
const createMenuItem = async (req, res) => {
  try {
    const { name, description, category, price, ingredients, isAvailable, preparationTime, imageUrl } = req.body;

    const menuItem = await MenuItem.create({
      name,
      description,
      category,
      price,
      ingredients,
      isAvailable,
      preparationTime,
      imageUrl,
    });

    res.status(201).json({
      success: true,
      data: menuItem,
      message: 'Menu item created successfully',
    });
  } catch (error) {
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map((err) => err.message);
      return res.status(400).json({
        success: false,
        message: 'Validation Error',
        errors: messages,
      });
    }
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message,
    });
  }
};

// @desc    Update menu item
// @route   PUT /api/menu/:id
// @access  Public
const updateMenuItem = async (req, res) => {
  try {
    const menuItem = await MenuItem.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!menuItem) {
      return res.status(404).json({
        success: false,
        message: 'Menu item not found',
      });
    }

    res.status(200).json({
      success: true,
      data: menuItem,
      message: 'Menu item updated successfully',
    });
  } catch (error) {
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map((err) => err.message);
      return res.status(400).json({
        success: false,
        message: 'Validation Error',
        errors: messages,
      });
    }
    if (error.kind === 'ObjectId') {
      return res.status(400).json({
        success: false,
        message: 'Invalid menu item ID',
      });
    }
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message,
    });
  }
};

// @desc    Delete menu item
// @route   DELETE /api/menu/:id
// @access  Public
const deleteMenuItem = async (req, res) => {
  try {
    const menuItem = await MenuItem.findByIdAndDelete(req.params.id);

    if (!menuItem) {
      return res.status(404).json({
        success: false,
        message: 'Menu item not found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Menu item deleted successfully',
    });
  } catch (error) {
    if (error.kind === 'ObjectId') {
      return res.status(400).json({
        success: false,
        message: 'Invalid menu item ID',
      });
    }
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message,
    });
  }
};

// @desc    Toggle menu item availability
// @route   PATCH /api/menu/:id/availability
// @access  Public
const toggleAvailability = async (req, res) => {
  try {
    const menuItem = await MenuItem.findById(req.params.id);

    if (!menuItem) {
      return res.status(404).json({
        success: false,
        message: 'Menu item not found',
      });
    }

    menuItem.isAvailable = !menuItem.isAvailable;
    await menuItem.save();

    res.status(200).json({
      success: true,
      data: menuItem,
      message: `Menu item is now ${menuItem.isAvailable ? 'available' : 'unavailable'}`,
    });
  } catch (error) {
    if (error.kind === 'ObjectId') {
      return res.status(400).json({
        success: false,
        message: 'Invalid menu item ID',
      });
    }
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message,
    });
  }
};
// @desc    Delete all menu items
// @route   DELETE /api/menu/clear/all
// @access  Public
const clearAllMenuItems = async (req, res) => {
  try {
    await MenuItem.deleteMany({});
    res.status(200).json({
      success: true,
      message: 'All menu items deleted successfully',
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message,
    });
  }
};

module.exports = {
  getMenuItems,
  searchMenuItems,
  getMenuItem,
  createMenuItem,
  updateMenuItem,
  deleteMenuItem,
  toggleAvailability,
  clearAllMenuItems,  // Add this
};