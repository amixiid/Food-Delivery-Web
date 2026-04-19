const MenuItem = require('../models/MenuItem');

// @desc    Get all menu items
// @route   GET /api/foods
// @access  Public
const getAllMenuItems = async (req, res) => {
    const foods = await MenuItem.find({});
    res.json(foods);
};

// @desc    Create a menu item
// @route   POST /api/foods
// @access  Private/Admin
const createMenuItem = async (req, res) => {
    const { name, description, price, image, category } = req.body;

    const menuItem = new MenuItem({
        name,
        description,
        price,
        image,
        category
    });

    const createdMenuItem = await menuItem.save();
    res.status(201).json(createdMenuItem);
};

// @desc    Update a menu item
// @route   PUT /api/foods/:id
// @access  Private/Admin
const updateMenuItem = async (req, res) => {
    const { name, description, price, image, category, isAvailable } = req.body;

    const menuItem = await MenuItem.findById(req.params.id);

    if (menuItem) {
        menuItem.name = name || menuItem.name;
        menuItem.description = description || menuItem.description;
        menuItem.price = price || menuItem.price;
        menuItem.image = image || menuItem.image;
        menuItem.category = category || menuItem.category;
        menuItem.isAvailable = isAvailable !== undefined ? isAvailable : menuItem.isAvailable;

        const updatedMenuItem = await menuItem.save();
        res.json(updatedMenuItem);
    } else {
        res.status(404);
        throw new Error('Menu item not found');
    }
};

// @desc    Delete a menu item
// @route   DELETE /api/foods/:id
// @access  Private/Admin
const deleteMenuItem = async (req, res) => {
    const menuItem = await MenuItem.findById(req.params.id);

    if (menuItem) {
        await menuItem.deleteOne();
        res.json({ message: 'Menu item removed' });
    } else {
        res.status(404);
        throw new Error('Menu item not found');
    }
};

module.exports = {
    getAllMenuItems,
    createMenuItem,
    updateMenuItem,
    deleteMenuItem
};
