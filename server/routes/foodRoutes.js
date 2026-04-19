const express = require('express');
const {
    getAllMenuItems,
    createMenuItem,
    updateMenuItem,
    deleteMenuItem
} = require('../controllers/foodController');
const { protect, admin } = require('../middleware/authMiddleware');

const router = express.Router();

router.route('/')
    .get(getAllMenuItems)
    .post(protect, admin, createMenuItem);

router.route('/:id')
    .put(protect, admin, updateMenuItem)
    .delete(protect, admin, deleteMenuItem);

module.exports = router;
