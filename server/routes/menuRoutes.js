const express = require('express');
const router = express.Router();
const {
  getMenuItems,
  searchMenuItems,
  getMenuItem,
  createMenuItem,
  updateMenuItem,
  deleteMenuItem,
  toggleAvailability,
  clearAllMenuItems,
} = require('../controllers/menuController');

// Clear all menu items (must be before /:id routes)
router.delete('/clear/all', clearAllMenuItems);

// Search route (must be before /:id to avoid conflict)
router.get('/search', searchMenuItems);

// CRUD routes
router.route('/').get(getMenuItems).post(createMenuItem);

router.route('/:id').get(getMenuItem).put(updateMenuItem).delete(deleteMenuItem);

// Availability toggle
router.patch('/:id/availability', toggleAvailability);

module.exports = router;