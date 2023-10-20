const mongoose = require('mongoose');

const catalogSchema = mongoose.Schema({
    sellerId: {
        type: String,
        required: true
    },
    products: [{
        name: {
            type: String,
            required: true
        },
        price: {
            type: Number,
            required: true
        }
    }]
})

exports.Catalog = mongoose.model('Catalog', catalogSchema);

