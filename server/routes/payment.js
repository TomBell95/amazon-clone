const router = require('express').Router();
const moment = require('moment');
const stripe = require('stripe')(process.env.STRIPE_KEY);
const verifyToken = require('../middlewares/verify-token');
const Order = require('../models/order');


const SHIPMENT = {
    normal: { price: 2.99, days: 4 },
    fast: { price: 4.99, days: 1 }
}

function shipmentPrice(shipmentOption){
    let estimated = moment().add(shipmentOption.days, "d").format("ddd MMMM Do")

    return { estimated, price: shipmentOption.price}
}

// POST 
router.post('/shipment', async (req, res) => {
    try {
        let shipment ;
        if (req.body.shipment === "normal"){
            shipment = shipmentPrice(SHIPMENT.normal)
        } else {
            shipment = shipmentPrice(SHIPMENT.fast)
        }

        res.json({ success: true, shipment : shipment })

    } catch (error){
        res.status(500).json({
            status: false,
            message: error.message
        })
    }
});

// Stripe
router.post('/payment', verifyToken, (req, res) => {
    let totalPrice = Math.round(req.body.totalPrice * 100) // stripe = must * 100 every time
    stripe.customers.create({
        email: req.decoded.email
    }).then( customer => {
        return stripe.customers.createSource(customer.id, {
            source: "tok_visa"
        });
    }).then( source => {
        return stripe.charges.create({
            amount: totalPrice,
            currency: 'gbp',
            customer: source.customer
        })
    }).then(async charge => {
        let order = new Order();
        let cart = req.body.cart;

        cart.map(product => {
            order.products.push({
                productID: product._id,
                quantity: parseInt(product.quantity),
                price: product.price
            });
        });

        order.owner = req.decoded._id;
        order.estimatedDelivery = req.body.estimatedDelivery;
        await order.save();

        res.json({ success: true, message: "Payment Successful" })

    }).catch(err => {
        res.status(500).json({
            status: false,
            message: err.message
        })
    })
})

module.exports = router;