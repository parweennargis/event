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
    },
    billing: {
        first_name: {
            type: Schema.Types.String
        },
        last_name: {
            type: Schema.Types.String
        },
        email: {
            type: Schema.Types.String
        },
        phone_no: {
            type: Schema.Types.String
        },
        current_position: {
            type: Schema.Types.String 
        },
        address: {
            type: Schema.Types.String
        },
        city: {
            type: Schema.Types.String
        },
        province: {
            type: Schema.Types.String
        },
        postal_code: {
            type: Schema.Types.String
        },
        country: {
            type: Schema.Types.String
        }
    }
}, {
    timestamps: true
})


module.exports = mongoose.model('Order', orderSchema);