const Order = require('../models/Order');

// @desc    Get all orders with pagination and filtering
// @route   GET /api/orders
// @access  Public
const getOrders = async (req, res) => {
  try {
    const { status, page = 1, limit = 10 } = req.query;

    // Build filter object
    const filter = {};
    if (status) {
      filter.status = status;
    }

    // Pagination
    const skip = (parseInt(page) - 1) * parseInt(limit);

    const orders = await Order.find(filter)
      .populate('items.menuItem', 'name price category imageUrl')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit));

    const total = await Order.countDocuments(filter);

    res.status(200).json({
      success: true,
      data: orders,
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

// @desc    Get single order
// @route   GET /api/orders/:id
// @access  Public
const getOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate(
      'items.menuItem',
      'name price category imageUrl preparationTime'
    );

    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found',
      });
    }

    res.status(200).json({
      success: true,
      data: order,
    });
  } catch (error) {
    if (error.kind === 'ObjectId') {
      return res.status(400).json({
        success: false,
        message: 'Invalid order ID',
      });
    }
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message,
    });
  }
};

// @desc    Create new order
// @route   POST /api/orders
// @access  Public
const createOrder = async (req, res) => {
  try {
    const { items, customerName, tableNumber } = req.body;

    // Calculate total amount
    const totalAmount = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

    const order = await Order.create({
      items,
      totalAmount,
      customerName,
      tableNumber,
    });

    // Populate the created order
    const populatedOrder = await Order.findById(order._id).populate('items.menuItem', 'name price category');

    res.status(201).json({
      success: true,
      data: populatedOrder,
      message: 'Order created successfully',
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

// @desc    Update order status
// @route   PATCH /api/orders/:id/status
// @access  Public
const updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;

    if (!status) {
      return res.status(400).json({
        success: false,
        message: 'Status is required',
      });
    }

    const validStatuses = ['Pending', 'Preparing', 'Ready', 'Delivered', 'Cancelled'];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: `Invalid status. Must be one of: ${validStatuses.join(', ')}`,
      });
    }

    const order = await Order.findByIdAndUpdate(req.params.id, { status }, { new: true, runValidators: true }).populate(
      'items.menuItem',
      'name price category'
    );

    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found',
      });
    }

    res.status(200).json({
      success: true,
      data: order,
      message: `Order status updated to ${status}`,
    });
  } catch (error) {
    if (error.kind === 'ObjectId') {
      return res.status(400).json({
        success: false,
        message: 'Invalid order ID',
      });
    }
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message,
    });
  }
};

// @desc    Get top selling items (Aggregation Challenge)
// @route   GET /api/orders/analytics/top-sellers
// @access  Public
const getTopSellers = async (req, res) => {
  try {
    const topSellers = await Order.aggregate([
      // Only include delivered orders
      { $match: { status: 'Delivered' } },
      // Flatten the items array
      { $unwind: '$items' },
      // Group by menu item and sum quantities
      {
        $group: {
          _id: '$items.menuItem',
          totalQuantity: { $sum: '$items.quantity' },
          totalRevenue: { $sum: { $multiply: ['$items.price', '$items.quantity'] } },
        },
      },
      // Join with MenuItem collection
      {
        $lookup: {
          from: 'menuitems',
          localField: '_id',
          foreignField: '_id',
          as: 'menuItemDetails',
        },
      },
      // Flatten the lookup result
      { $unwind: '$menuItemDetails' },
      // Project the fields we want
      {
        $project: {
          _id: 1,
          name: '$menuItemDetails.name',
          category: '$menuItemDetails.category',
          price: '$menuItemDetails.price',
          totalQuantity: 1,
          totalRevenue: 1,
        },
      },
      // Sort by quantity sold
      { $sort: { totalQuantity: -1 } },
      // Limit to top 5
      { $limit: 5 },
    ]);

    res.status(200).json({
      success: true,
      data: topSellers,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message,
    });
  }
};

// @desc    Delete all orders
// @route   DELETE /api/orders/clear/all
// @access  Public
const clearAllOrders = async (req, res) => {
  try {
    await Order.deleteMany({});
    res.status(200).json({
      success: true,
      message: 'All orders deleted successfully',
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
  getOrders,
  getOrder,
  createOrder,
  updateOrderStatus,
  getTopSellers,
  clearAllOrders,  // Add this
};