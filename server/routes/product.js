const router = require('express').Router();
// this is the same as app.post or app.get

const Product = require('../models/products');

//import the upload photo
const upload = require('../middlewares/upload-photo');

// POST create new product
router.post('/products', upload.single('photo'), async (req, res) => {
    try {
        let product = new Product();
        product.title = req.body.title;
        product.description = req.body.description;
        product.photo = req.file.location; // this will get the amazon s3 location for image
        product.price = req.body.price;
        product.stockQuantity = req.body.stockQuantity;
        product.ownerID = req.body.ownerID;
        product.categoryID = req.body.categoryID;

        await product.save();
        res.json({
            status: true,
            message: "Successfully saved"
        });

    } catch (error) {
        res.status(500).json({
            status: false,
            message: error.message
        })
    }
});

// GET all products
router.get('/products', async (req, res) => {
    try {
        let products = await Product.find()
          .populate('owner category')
          .populate("reviews", "rating")
          .exec();
        res.json({
            success: true,
            products: products
        });

    } catch (error) {
        res.status(500).json({
            status: false,
            message: error.message
        })
    }
})

// GET single product
router.get('/products/:id', async (req, res) => { // pass parameter "/:id"
    try {
        let product = await Product.findOne({ _id:req.params.id })
          .populate('owner category')
          .populate("reviews", "rating")
          .exec();
        res.json({
            success: true,
            product: product
        });

    } catch (error) {
        res.status(500).json({
            status: false,
            message: error.message
        })
    }
})

// PUT update a single product
router.put('/products/:id', upload.single('photo'), async (req, res) => { // pass parameter "/:id"
    try {
        let product = await Product.findOneAndUpdate({ _id:req.params.id }, {
            $set: {
                title:  req.body.title,
                description:  req.body.description,
                photo:  req.file.location,
                price:  req.body.price,
                stockQuantity:  req.body.stockQuantity,
                category: req.body.categoryID,
                owner: req.body.ownerID
            },
          }, {upsert: true} // if object doesnt exist - then create
        );

        res.json({
            success: true,
            updatedProduct: product
        });

    } catch (error) {
        res.status(500).json({
            status: false,
            message: error.message
        })
    }
})

// DELETE a single product
router.delete('/products/:id', async (req, res) => { // pass parameter "/:id"
    try {
        let deletedProduct = await Product.findOneAndDelete({ _id:req.params.id });
        if (deletedProduct){
            res.json({
                success: true,
                message: "Successfully deleted"
            });
        }

    } catch (error) {
        res.status(500).json({
            status: false,
            message: error.message
        })
    }
})

module.exports = router;