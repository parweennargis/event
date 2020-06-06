const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orderSchema = new Schema({
    orders: [{
        type:Schema.Types.ObjectId,
        ref: 'Cart'
    }],
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    total_price: {
        type: Schema.Types.Number,
        default: 0
    },
    total_tax: {
        type: Schema.Types.Number,
        default: 0
    }
}, {
    timestamps: true
})


module.exports = mongoose.model('Order', orderSchema);