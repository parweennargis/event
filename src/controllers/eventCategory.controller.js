const CustomError = require('../utils/error');
const eventCategoryService = require('../service/eventCategory.service');
const validateEventCategoryRequest = require('../validateRequest/eventCategory');

module.exports = {
    create: async (req, res) => {
        try {
            const { body } = req;
            // validate the request body
            validateEventCategoryRequest.createEventCategory(body);

            // create event Category
            const event = await eventCategoryService.createEventCategory(body)
            return res.json({ data: event });
        } catch (error) {
            console.log(error);
            return res.status(400).json({ errors: error.errors || error.message });
        }
    },
    update: async (req, res) => {
        try {
            // validate the request params
            const { params: { eventCategoryId }, body } = req;
            if (!eventCategoryId) throw new CustomError(400, 'Event Category id is required');

            // validate the request body
            validateEventCategoryRequest.updateEventCategory(body);

            // update event
            const event = await eventCategoryService.updateEventCategory(eventCategoryId, body);
            return res.json({ data: event });
        } catch (error) {
            console.log(error);
            return res.status(400).json({ errors: error.errors || error.message });
        }
    },
    delete: async (req, res) => {
        try {
            const { eventCategoryId } = req.params;
            if (!eventCategoryId) throw new CustomError(400, 'Event Category id is required');
            eventCategoryService.deleteEventCategory(eventCategoryId);
            return res.status(204).json();
        } catch (error) {
            return res.status(400).json({ errors: error.errors || error.message });
        }
    },
    getAll: async (req, res) => {
        try {
            const events = await eventCategoryService.getAllEventCategory();
            return res.json({ data: events });
        } catch (error) {
            return res.status(400).json({ errors: error.errors || error.message });
        }
    }
};