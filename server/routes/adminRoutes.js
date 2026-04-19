const express = require('express');
const { getDashboardAnalytics, getAllUsers } = require('../controllers/adminController');
const { protect, admin } = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/analytics', protect, admin, getDashboardAnalytics);
router.get('/users', protect, admin, getAllUsers);

module.exports = router;
