const express = require('express');
const router = express.Router();
const {
  getOrders,
  getOrder,
  createOrder,
  updateOrderStatus,
  getTopSellers,
  clearAllOrders,
} = require('../controllers/orderController');

// Clear all orders (must be before /:id routes)
router.delete('/clear/all', clearAllOrders);

// Analytics route (must be before /:id)
router.get('/analytics/top-sellers', getTopSellers);

// CRUD routes
router.route('/').get(getOrders).post(createOrder);

router.route('/:id').get(getOrder);

// Status update
router.patch('/:id/status', updateOrderStatus);

module.exports = router;