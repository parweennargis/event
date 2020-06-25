const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const imageSchema = new Schema({
    image: {
        type: Schema.Types.String
    }
}, {
    timestamps: true
});
const videoSchema = new Schema({
    video: {
        type: Schema.Types.String
    }
}, {
    timestamps: true
});

const eventSchema = new Schema({
    title: {
        type: Schema.Types.String
    },
    start_date: {
        type: Schema.Types.Date
    },
    end_date: {
        type: Schema.Types.Date
    },
    start_time: {
        type: Schema.Types.String
    },
    end_time: {
        type: Schema.Types.String
    },
    images: {
        type: [Schema.Types.String]
    },
    banner: {
        type: Schema.Types.String
    },
    short_description: {
        type: Schema.Types.String
    },
    venue: {
        name: Schema.Types.String,
        streetAddress: Schema.Types.String,
        city: Schema.Types.String,
        state: Schema.Types.String,
        country: Schema.Types.String
    },
    description: {
        type: Schema.Types.String
    },
    organizer: {
        contact_no: Schema.Types.String,
        toll_free_no: Schema.Types.String,
        email: Schema.Types.String
    },
    floor_plan: {
        type: Schema.Types.String
    },
    link: {
        map: Schema.Types.String,
        facebook: Schema.Types.String,
        twitter: Schema.Types.String,
        youtube: Schema.Types.String,
        linkedln: Schema.Types.String,
        instagram: Schema.Types.String
    },
    is_opening_soon: {
        type: Schema.Types.Boolean, // don't show any button such as job seeker, exhibitor when true
        default: false
    },
    is_active: {
        type: Schema.Types.Boolean,
        default: true
    },
    event_category: {
        type: [Schema.Types.ObjectId],
        ref: 'EventCategory'
    },
    pricing: {
        type: [Schema.Types.ObjectId],
        ref: 'Pricing'
    },
    organized_by: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    event_type: {
        type: Schema.Types.String,
        enum: ['ONLINE', 'VIRTUAL', 'OFFLINE']
    },
    zoom_link: {
        type: Schema.Types.String
    },
    past_event_banner_image: { type: Schema.Types.String },
    past_event_image: [{ type: imageSchema }],
    past_event_video: [{ type: videoSchema }],
    // past_event: {
    //     images: {
    //         type: [Schema.Types.String]
    //     },
    //     videos: {
    //         type: [Schema.Types.String]
    //     },
    // }
}, {
    timestamps: true
});

module.exports = mongoose.model('Event', eventSchema);