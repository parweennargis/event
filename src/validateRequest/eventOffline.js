const validate = require('../utils/validate');

module.exports = {
    'createEvent': (body) => {
        validate(body, {
            type: 'object',
            properties: {
                title: { type: 'string', format: 'notEmpty' },
                event_category: { type: 'array', items: { type: 'string', format: 'objectId' } },
                start_date: { type: 'string' }, //TODO: check with date
                end_date: { type: 'string' }, //TODO: check with date
                start_time: { type: 'string' }, //TODO: check with date
                end_time: { type: 'string' }, //TODO: check with date
                description: { type: 'string' },
                organizer: {
                    type: 'object',
                    properties: {
                        contact_no: { type: 'string' },
                        email: { type: 'string' },
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
                is_active: { type: 'boolean' },
                event_type: { type: 'string', enum: ['ONLINE', 'VIRTUAL'] },
                zoom_link: { type: 'string' }
            },
            required: [
                'title', 'start_date', 'description', 'event_category', 'event_type', 'is_active', 'zoom_link'
            ]
        });
    },

    'eventAction': (body) => {
        validate(body, {
            type: 'object',
            properties: {
                type: { type: 'string', enum: ['LIKE', 'UNLIKE'] },
                event_id: { type: 'string', format: 'objectId' }
            },
            required: ['type', 'event_id']
        });
    }
}
