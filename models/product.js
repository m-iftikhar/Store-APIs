const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'must provide name'],
    },
    price: {
        type: Number,
        required: [true, 'must provide price'],
    },
    featured: {
        type: Boolean,
        default: false,
    },
    rating: {
        type: Number,
        default: 4.5,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    company: {
        type: String, // Ensure this matches the data type you're inserting
        enum: {
            values: ['ikea', 'caressa', 'liddy', 'marcos'],
            message: '{VALUE} is not supported',
        },
    },
});

module.exports = mongoose.model('Product', productSchema);
