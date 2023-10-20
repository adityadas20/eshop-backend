const express = require('express');
const router = express.Router();
const { Order } = require('../models/order');
const { Catalog } = require('../models/catalog');
const { User } = require('../models/user');


/*
* Gets the list of orders received by a seller
*/
router.get('/orders', async (req, res) => {
    try {
        const sellerId = req.body.sellerId;
        const orderList = await Order.find({ sellerId });
        if (!orderList) {
            return res.send('No orders found for the seller');
        }
        res.json(orderList);
    } catch (error) {
        console.log("Failed to fetch the list of orders", error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
})

/*
* Creates a catalog for the seller with list of items specified in the request body
*/
router.post('/create-catalog', async (req, res) => {
    try {
        const sellerId = req.body.sellerId;
        // Ensure that the seller can have only one catalog
        const seller = await Catalog.find({ sellerId });
        if (seller.length) {
            return res.status(404).send('Seller can have only one catalog');
        }

        let catalog = new Catalog({
            sellerId: sellerId,
            products: req.body.products
        })
        catalog = await catalog.save();
        if (!catalog) {
            return res.status(500).send("The catalog was not created");
        }
        res.send(catalog);
    } catch (error) {
        console.log("Failed to create a catalog", error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
})

module.exports = router;