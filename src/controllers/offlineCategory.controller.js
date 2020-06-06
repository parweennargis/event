const CustomError = require('../utils/error');
const offlineCategoryService = require('../service/offlineCategory.service');
const validateEventCategoryRequest = require('../validateRequest/eventCategory');

module.exports = {
    create: async (req, res) => {
        try {
            const { body } = req;
            // validate the request body
            validateEventCategoryRequest.createEventCategory(body);

            // create event Category
            const offlineEvent = await offlineCategoryService.createOfflineCategory(body)
            return res.json({ data: offlineEvent });
        } catch (error) {
            console.log(error);
            return res.status(400).json({ errors: error.errors || error.message });
        }
    },
    update: async (req, res) => {
        try {
            // validate the request params
            const { params: { offlineCategoryId }, body } = req;
            if (!offlineCategoryId) throw new CustomError(400, 'Offline Category id is required');

            // validate the request body
            validateEventCategoryRequest.updateEventCategory(body);

            // update event
            const offlineEvent = await offlineCategoryService.updateOfflineCategory(offlineCategoryId, body);
            return res.json({ data: offlineEvent });
        } catch (error) {
            console.log(error);
            return res.status(400).json({ errors: error.errors || error.message });
        }
    },
    delete: async (req, res) => {
        try {
            const { offlineCategoryId } = req.params;
            if (!offlineCategoryId) throw new CustomError(400, 'Event Category id is required');
            offlineCategoryService.deleteOfflineCategory(offlineCategoryId);
            return res.status(204).json();
        } catch (error) {
            return res.status(400).json({ errors: error.errors || error.message });
        }
    },
    getAll: async (req, res) => {
        try {
            const events = await offlineCategoryService.getAllOfflineCategory();
            return res.json({ data: events });
        } catch (error) {
            return res.status(400).json({ errors: error.errors || error.message });
        }
    },
    getById: async (req, res) => {
        try {
            const { offlineCategoryId } = req.params;
            if (!offlineCategoryId) throw new CustomError(400, 'Category Id is required');
            const event =  await offlineCategoryService.getOfflineCategoryDetail(offlineCategoryId);
            return res.json({ data: event });
        } catch (error) {
            return res.status(400).json({ errors: error.errors || error.message });
        }
    }
};