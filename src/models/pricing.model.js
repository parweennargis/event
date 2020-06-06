const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const pricingSchema = new Schema({
    name: {
        type: Schema.Types.String,
        required: true
    },
    amount: {
        type: Schema.Types.Number,
        required: true
    },
    short_description: {
        type: Schema.Types.String
    },
    main_description_1: {
        type: Schema.Types.String
    },
    main_description_2: {
        type: Schema.Types.String
    },
    main_description_3: {
        type: Schema.Types.String
    },
    main_description_4: {
        type: Schema.Types.String
    },
    main_description_5: {
        type: Schema.Types.String
    },
    main_description_6: {
        type: Schema.Types.String
    },
    main_description_7: {
        type: Schema.Types.String
    },
    is_active: {
        type: Schema.Types.Boolean,
        default: true
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Pricing', pricingSchema);
