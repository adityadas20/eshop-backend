const express = require('express');
const router = express.Router();
const { User } = require('../models/user');
const { Order } = require('../models/order');
const { Catalog } = require('../models/catalog');

/*
* Gets a list of all sellers
*/
router.get('/list-of-sellers', async (req, res) => {
    try {
        const userList = await User.find({ type: "seller" });
        if (!userList) {
            return res.json({ error: 'No sellers found' });
        }
        res.json(userList);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
})

/*
* Gets the catalog of a seller
*/
router.get('/seller-catalog/:sellerId', async (req, res) => {
    try {
        const sellerId = req.params.sellerId;
        const catalog = await Catalog.find({ sellerId });
        if (!catalog) {
            return res.status(404).json({ error: 'Catalog not found' });
        }
        res.json(catalog);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
})

/*
* Creates an order with the list of items sent in request body for seller with id = seller_id
*/
router.post('/create-order/:sellerId', async (req, res) => {
    try {
        const buyerId = req.body.buyerId;
        const buyer = await User.find({ _id: buyerId });
        if (!buyer.length) {
            return res.status(404).json({ error: 'Buyer not registered' });
        }

        const sellerId = req.params.sellerId;
        const catalog = await Catalog.find({ sellerId });
        if (!catalog.length) {
            return res.status(404).json({ error: 'Catalog not found' });
        }

        // we also need to check if all the products that the buyer wants to buy is present in the catalog of the seller
        const products = req.body.products;
        const catalogProducts = catalog[0].products.map(prod => prod.name);
        const missingProducts = products.filter(product => !catalogProducts.includes(product.name));
        if (missingProducts.length) {
            return res.status(500).json({ error: "Some products were not found in the catalog of the seller" });
        }

        var order = new Order({
            sellerId: sellerId,
            buyerId: buyerId,
            products: products
        })
        order = await order.save();
        if (!order) {
            return res.status(500).json({ error: "The order was not placed" });
        }
        res.send(order);
    } catch (error) {
        console.log("Order not created, error: ", error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
})


module.exports = router;