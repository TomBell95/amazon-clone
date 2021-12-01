const router = require('express').Router();
// this is the same as app.post or app.get

const Category = require('../models/category');

// GET
router.get('/categories', async (req, res) => {
    try {
        let categories = await Category.find();
        res.json({
            success: true,
            categories: categories
        });

    } catch (error) {
        res.status(500).json({
            status: false,
            message: error.message
        })
    }
})

// POST 
router.post('/categories', async (req, res) => {
    try {
        const category = new Category();
        category.type = req.body.type;
        
        await category.save();
        res.json({
            status: true,
            message: "Successfully created new category"
        });

    } catch (error){
        res.status(500).json({
            status: false,
            message: error.message
        })
    }
});

module.exports = router;