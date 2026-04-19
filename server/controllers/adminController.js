const User = require('../models/User');
const MenuItem = require('../models/MenuItem');
const Order = require('../models/Order');

// @desc    Get dashboard analytics
// @route   GET /api/admin/analytics
// @access  Private/Admin
const getDashboardAnalytics = async (req, res) => {
    const userCount = await User.countDocuments({});
    const foodCount = await MenuItem.countDocuments({});
    const orderCount = await Order.countDocuments({});
    
    const orders = await Order.find({ isPaid: true });
    const totalRevenue = orders.reduce((acc, order) => acc + order.totalPrice, 0);

    res.json({
        userCount,
        foodCount,
        orderCount,
        totalRevenue
    });
};

// @desc    Get all users
// @route   GET /api/admin/users
// @access  Private/Admin
const getAllUsers = async (req, res) => {
    const users = await User.find({}).select('-password');
    res.json(users);
};

module.exports = {
    getDashboardAnalytics,
    getAllUsers
};
