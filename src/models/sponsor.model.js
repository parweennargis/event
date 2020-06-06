const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const sponsorSchema = new Schema({
    image: {
        type: Schema.Types.String
    },
    // booth_no: {
    //     type: Schema.Types.String
    // },
    description: {
        type: Schema.Types.String
    },
    title: {
        type: Schema.Types.String
    },
    is_active: {
        type: Schema.Types.Boolean,
        default: true
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Sponsor', sponsorSchema);