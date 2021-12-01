const router = require('express').Router();
// this is the same as app.post or app.get

const Owner = require('../models/owner');

//import the upload photo
const upload = require('../middlewares/upload-photo');

// GET
router.get('/owners', async (req, res) => {
    try {
        let owners = await Owner.find();
        res.json({
            success: true,
            owners: owners
        });

    } catch (error) {
        res.status(500).json({
            status: false,
            message: error.message
        })
    }
})

// POST 
router.post('/owners', upload.single('photo'), async (req, res) => {
    try {
        const owner = new Owner();
        owner.name = req.body.name;
        owner.about = req.body.about;
        owner.photo = req.file.location; // this will get the amazon s3 location for image
        
        await owner.save();
        res.json({
            status: true,
            message: "Successfully created new owner"
        });

    } catch (error){
        res.status(500).json({
            status: false,
            message: error.message
        })
    }
});

module.exports = router;