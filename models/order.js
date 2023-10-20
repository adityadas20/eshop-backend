const mongoose = require('mongoose');

const orderSchema = mongoose.Schema({
    sellerId: {
        type: String,
        required: true
    },
    buyerId: {
        type: String,
        required: true
    },
    products: [{
        name: {
            type: String,
            required: true
        }
    }]
})

exports.Order = mongoose.model('Order', orderSchema);

