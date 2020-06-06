const CustomError = require('../utils/error');
const offlineCategoryRepository = require('../repository/offlineCategory.repository');

module.exports = {
    createOfflineCategory: async (data) => {
        try {
            return await offlineCategoryRepository.create(data);
        } catch (e) {
            throw new CustomError(400, e.message);
        }
    },
    deleteOfflineCategory: async (eventId) => {
        const event = await offlineCategoryRepository.findOne({ _id: eventId });
        if (!event) throw new CustomError(404, 'Event Category not found');
        event.is_active = false;
        await event.save();
    },
    getAllOfflineCategory: async () => {
        return await offlineCategoryRepository.find({ is_active: true });
    },
    updateOfflineCategory: async (eventCategoryId, body) => {
        return await offlineCategoryRepository.findByIdAndUpdate(eventCategoryId, body);
    },
    getOfflineCategoryDetail: async (offlineCategoryId) => {
        const offlineCategory = await offlineCategoryRepository.findOne({ _id: offlineCategoryId });
        if (!offlineCategory) throw new CustomError(404, 'Offline Category not found');

        return offlineCategory;
    }
}