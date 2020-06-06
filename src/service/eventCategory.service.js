const CustomError = require('../utils/error');
const eventCategoryRepository = require('../repository/eventCategory.repository');

module.exports = {
    createEventCategory: async (data) => {
        try {
            return await eventCategoryRepository.create(data);
        } catch (e) {
            throw new CustomError(400, e.message);
        }
    },
    deleteEventCategory: async (eventId) => {
        const event = await eventCategoryRepository.findOne({ _id: eventId });
        if (!event) throw new CustomError(404, 'Event Category not found');
        event.is_active = false;
        await event.save();
    },
    getAllEventCategory: async () => {
        return await eventCategoryRepository.find({ is_active: true });
    },
    updateEventCategory: async (eventCategoryId, body) => {
        return await eventCategoryRepository.findByIdAndUpdate(eventCategoryId, body);
    }
}