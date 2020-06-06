const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const contactSchema = new Schema({
    name: {
        type: Schema.Types.String,
        required: [true, 'Name is required']
    },
    email: {
        type: Schema.Types.String,
        required: [true, 'Email is required']
    },
    phone_no: {
        type: Schema.Types.String
    },
    subject: {
        type: Schema.Types.String,
        required: [true, 'Subject is required']
    },
    message: {
        type: Schema.Types.String
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Contact', contactSchema);
