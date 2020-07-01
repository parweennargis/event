const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const partnerSchema = new Schema({
    name: {
        type: Schema.Types.String
    },
    image: {
        type: Schema.Types.String
    },
    website: {
        type: Schema.Types.String
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Partner', partnerSchema);
