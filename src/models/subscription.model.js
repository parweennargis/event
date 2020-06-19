const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const subscriptionSchema = new Schema({
    email: {
        type: Schema.Types.String,
        unique: true
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Subscription', subscriptionSchema);
