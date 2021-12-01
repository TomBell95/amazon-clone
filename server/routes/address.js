const router = require('express').Router();
const axios = require('axios');

const Address = require('../models/address');
const verifyToken = require('../middlewares/verify-token');
const User = require('../models/user');

// POST address
router.post('/addresses', verifyToken, async (req, res) => {
    try {
        const address = new Address();
        address.user = req.decoded._id;
        address.country = req.body.country
        address.fullName = req.body.fullName
        address.streetAddress = req.body.streetAddress
        address.city = req.body.city
        address.postcode = req.body.postcode
        address.phoneNumber = req.body.phoneNumber
        address.deliverInstructions = req.body.deliverInstructions
        address.securityCode = req.body.securityCode

        await address.save();
        res.json({ success: true, message: "Successfully saved address"})

    } catch (err) {
        res.status(500).json({
            status: false,
            message: err.message
        })
    }
});

// GET all addresses
router.get('/addresses', verifyToken, async (req, res) => {
    try {
        const addresses = await Address.find({ user: req.decoded._id})

        res.json({ success: true, addresses: addresses})

    } catch (err){
        res.status(500).json({
            status: false,
            message: err.message
        })
    }
});

// GET single addresses
router.get('/addresses/:id', verifyToken, async (req, res) => {
    try {
        const address = await Address.findOne({ _id: req.params.id })

        res.json({ success: true, address: address})

    } catch (err){
        res.status(500).json({
            status: false,
            message: err.message
        })
    }
});

// GET countries
router.get('/countries', async (req, res) => {
    try { 
        const response = await axios.get('https://restcountries.com/v3.1/all');
        res.json(response.data);

    } catch (err) {
        res.status(500).json({
            status: false,
            message: err.message
        })
    }
});

// PUT edit address
router.put('/addresses/:id', verifyToken, async (req, res) => {
    try {
        const foundAddress = await Address.findOne({ _id: req.params.id }); // user: req.decoded._id, 
        if (foundAddress) {
            if (req.body.country) foundAddress.country = req.body.country
            if (req.body.fullName) foundAddress.fullName = req.body.fullName
            if (req.body.streetAddress) foundAddress.streetAddress = req.body.streetAddress
            if (req.body.city) foundAddress.city = req.body.city
            if (req.body.postcode) foundAddress.postcode = req.body.postcode
            if (req.body.phoneNumber) foundAddress.phoneNumber = req.body.phoneNumber
            if (req.body.deliverInstructions) foundAddress.deliverInstructions = req.body.deliverInstructions
            if (req.body.securityCode) foundAddress.securityCode = req.body.securityCode

            await foundAddress.save();
            res.json({ success: true, message: "Successfully updated address"})
        }
    } catch (err) {
        res.status(500).json({
            status: false,
            message: err.message
        })
    }
});

// DELETE address
router.delete('/addresses/:id', verifyToken, async (req, res) => {
    try {
        const deletedAddress = await Address.deleteOne({ user: req.decoded._id, _id: req.params.id });
        if (deletedAddress) {
            res.json({ success: true, message: "Successfully deleted address"})
        }
    } catch (err) {
        res.status(500).json({
            status: false,
            message: err.message
        })
    }
});

// PUT set default address
router.put('/addresses/set/default', verifyToken, async (req, res) => {
    try {
        const updateDefaultAddress = await User.findOneAndUpdate({
            _id: req.decoded._id}, { $set: { address: req.body.id }
        });
        if (updateDefaultAddress) {
            res.json({ success: true, message: "Successfully set default address"})
        }
    } catch (err) {
        res.status(500).json({
            status: false,
            message: err.message
        })
    }
});
module.exports = router;