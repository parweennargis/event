const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const eventCategorySchema = new Schema({
    name: {
        type: Schema.Types.String,
        unique: true
    },
    is_active: {
        type: Schema.Types.Boolean,
        default: true
    },
    default: {
        type: Schema.Types.Boolean,
        default: false
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('EventCategory', eventCategorySchema);
