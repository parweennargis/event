const validate = require('../utils/validate');

module.exports = {
    'createEvent': (body) => {
        validate(body, {
            type: 'object',
            properties: {
                title: { type: 'string', format: 'notEmpty' },
                start_date: { type: 'string' }, //TODO: check with date
                end_date: { type: 'string' }, //TODO: check with date
                start_time: { type: 'string' }, //TODO: check with date
                end_time: { type: 'string' }, //TODO: check with date
                short_description: { type: 'string', format: 'notEmpty' },
                venue: {
                    type: 'object',
                    properties: {
                        name: { type: 'string', format: 'notEmpty' },
                        streetAddress: { type: 'string' },
                        city: { type: 'string' },
                        state: { type: 'string' },
                        country: { type: 'string' }
                    },
                    required: ['name']
                },
                description: { type: 'string' },
                organizer: {
                    type: 'object',
                    properties: {
                        contact_no: { type: 'string', format: 'notEmpty' },
                        toll_free_no: { type: 'string', format: 'notEmpty' },
                        email: { type: 'string', format: 'email' },
                    }
                },
                link: {
                    type: 'object',
                    properties: {
                        map: { type: 'string' },
                        facebook: { type: 'string' },
                        twitter: { type: 'string' },
                        youtube: { type: 'string' },
                        linkedln: { type: 'string' },
                        instagram: { type: 'string' }
                    }
                },
                is_opening_soon: { type: 'string', enum: ['true', 'false'] },
                event_category: { type: 'array', items: { type: 'string', format: 'objectId' } },
                pricing: { type: 'array', items: { type: 'string', format: 'objectId' } },
                event_type: { type: 'string', enum: ['ONLINE', 'VIRTUAL', 'OFFLINE'] },
                is_active: { type: 'string', enum: ['true', 'false'] },
                past_event: {
                    type: 'object',
                    properties: {
                        images: { type: 'array', items: { type: 'string' } },
                        videos: { type: 'array', items: { type: 'string' } },
                    }
                }
            },
            required: [
                'title', 'start_date', 'venue', 'description', 'event_category', 'event_type'
            ]
        });
    }
}
