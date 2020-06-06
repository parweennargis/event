const eventOfflineService = require('../service/eventOffline.service');
const validateOfflineEventRequest = require('../validateRequest/eventOffline');
const awsS3Service = require('../service/aws/aws.s3.service');
const CustomError = require('../utils/error');

module.exports = {
    create: async (req, res) => {
        try {
            // validate the request body
            const { body, file } = req;
            body.is_active = body.is_active === 'true' ? true : false;
            validateOfflineEventRequest.createEvent(body);
            
            // get data from logged in user and map it for event_organized_by;
            body.organized_by = req.user.userId;
            
            // create event
            if (file) {
                const image = await awsS3Service.uploadFile(file);
                if (image) body.banner = image.key;
            }
            const event = await eventOfflineService.createEvent(body);

            return res.json({ data: event });
        } catch (error) {
            console.log(error);
            return res.status(400).json({ errors: error.errors || error.message });
        }
    },
    action: async (req, res) => {
        try {
            // validate the request body
            const { body } = req;
            validateOfflineEventRequest.eventAction(body);
            
            // get data from logged in user and map it for event_organized_by;
            body.user_id = req.user.userId;
            // create event
            const event = await eventOfflineService.eventAction(body)
            return res.json({ data: event });
        } catch (error) {
            console.log(error);
            return res.status(400).json({ errors: error.errors || error.message });
        }
    },
    delete: async (req, res) => {
        try {
            const { eventId } = req.params;
            if (!eventId) throw new CustomError(400, 'Event id is required');
            await eventOfflineService.deleteEvent(eventId);
            return res.status(204).json({});
        } catch (error) {
            return res.status(400).json({ errors: error.errors || error.message });
        }
    },
    update: async (req, res) => {
        try {
            // validate the request params
            const { params: { eventId }, body, file } = req;
            if (!eventId) throw new CustomError(400, 'Event id is required');
            body.is_active = body.is_active === 'true' ? true : false;
            // validate the request body
            validateOfflineEventRequest.createEvent(body);
            // update event
            if (file) {
                const image = await awsS3Service.uploadFile(file);
                if (image) body.banner = image.key;
            }
            const event = await eventOfflineService.updateEvent(eventId, body);
            return res.json({ data: event });
        } catch (error) {
            return res.status(400).json({ errors: error.errors || error.message });
        }
    },
    getById: async (req, res) => {
        try {
            const { eventId } = req.params;
            if (!eventId) throw new CustomError(400, 'Event id is required');
            const event =  await eventOfflineService.getEventDetail(eventId);
            return res.json({ data: event });
        } catch (error) {
            return res.status(400).json({ errors: error.errors || error.message });
        }
    },
};