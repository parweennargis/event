const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const cartSchema = new Schema({
    pricing: {
        type: Schema.Types.ObjectId,
        ref: 'Pricing'
    },
    event: {
        type: Schema.Types.ObjectId,
        ref: 'Event'
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    price: {
        type: Schema.Types.Number,
        default: 0
    },
    tax: {
        type: Schema.Types.Number,
        default: 0
    },
    total_price: {
        type: Schema.Types.Number,
        default: 0
    },
    quantity: {
        type: Schema.Types.Number,
        default: 1
    },
    order_status: {
        type: Schema.Types.String,
        default: 'CART',
        enum: ['CART', 'ORDER']
    }
}, {
    timestamps: true
});


module.exports = mongoose.model('Cart', cartSchema);