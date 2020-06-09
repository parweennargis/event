const _ = require('lodash')
const mongoose = require('mongoose');

const PricingModel = require('../models/pricing.model');
const CustomError = require('../utils/error');
const cloudFrontService = require('../service/aws/aws.cloudfront.service');

const eventRepository = require('../repository/event.repository');
const pricingRepository = require('../repository/pricing.repository');
const eventCategoryRepository = require('../repository/eventCategory.repository');
const offlineCategoryRepository = require('../repository/offlineCategory.repository');


module.exports = {
    createEvent: async (data) => {
        try {
            const { event_category, pricing } = data;
            // check all categories exist or not
            const eventCategories = await eventCategoryRepository.find({ _id: { $in: event_category } }, 'name');
            if (eventCategories.length !== event_category.length) throw new CustomError(404, 'Invalid Event Category.');

            // check all pricing exist or not
            const pricings = await pricingRepository.find({ _id: { $in: pricing } }, 'name');
            if (pricings.length !== pricing.length) throw new CustomError(404, 'Invalid Pricing.');

            //TODO: upload array of images
            const event = await eventRepository.create(data);
            return event;
        } catch (e) {
            throw new CustomError(400, e.message);
        }
    },
    updateEvent: async (eventId, data) => {
        return eventRepository.findByIdAndUpdate(eventId, data);
    },
    deleteEvent: async (eventId) => {
        const event = await eventRepository.findOne({ _id: eventId });
        if (!event) throw new CustomError(404, 'Event not found');
        event.is_active = false;
        await event.save();
    },
    getEventDetail: async (eventId) => {
        const populate = [
            { path: 'pricing', model: PricingModel }
        ];
        const event = await eventRepository.findOne({ _id: eventId }, populate);
        if (!event) throw new CustomError(404, 'Event not found');
        const promises = event.images.map(image => cloudFrontService.getSignedUrl(image));
        event.images = await Promise.all(promises);
        if(event.banner) event.banner = await cloudFrontService.getSignedUrl(event.banner);
        return event;
    },
    getAll: async (page = "1", limit = "7", eventCategoryId) => {
        if (!eventCategoryId) {
            const eventCategoryDefault = await eventCategoryRepository.findOne({ default: true });
            if (eventCategoryDefault) eventCategoryId = eventCategoryDefault.id
        }
        let query = {};
        query.match = { is_active: true, event_category: mongoose.Types.ObjectId(eventCategoryId) };
        query.skip = (+page - 1) * +limit;
        query.sort = { startDate: 'asc' };
        query.limit = +limit;
        const promises = [
            eventRepository.count({ is_active: true, event_category: mongoose.Types.ObjectId(eventCategoryId) }),
            eventRepository.paginateItems(query)
        ];
        try {
            const [count, items] = await Promise.all(promises);
            for (const item of items) {
                const promises = item.images.map(image => cloudFrontService.getSignedUrl(image));
                item.images = await Promise.all(promises);
                if(item.banner) item.banner = await cloudFrontService.getSignedUrl(item.banner);
            }
            const noOfPages = Math.ceil(count / limit);
            return { count, noOfPages, items };
        } catch (error) {
            throw new CustomError(400, error.message);
        }
    },
    getEventByCategory: async (categoryId) => {
        const events = await eventRepository.find({ event_category: categoryId });
        if (_.isEmpty(events)) throw new CustomError(404, 'Events not found');
        return events;
    },
    getAllEvents: async (body) => {
        const { event_type } = body;
        const events = await eventRepository.find({ event_type });
        // if (_.isEmpty(events)) throw new CustomError(404, 'Events not found');
        return events;
    },
    getAllOfflineEvent: async (page = "1", limit = "7", eventCategoryId) => {
        if (!eventCategoryId) {
            const eventCategoryDefault = await offlineCategoryRepository.findOne({ default: true });
            if (eventCategoryDefault) eventCategoryId = eventCategoryDefault.id
        }
        let query = {};
        query.match = { is_active: true, event_category: mongoose.Types.ObjectId(eventCategoryId) };
        query.skip = (+page - 1) * +limit;
        query.sort = { startDate: 'asc' };
        query.limit = +limit;
        const promises = [
            eventRepository.count({ is_active: true, event_category: mongoose.Types.ObjectId(eventCategoryId), event_type: 'VIRTUAL' }),
            eventRepository.paginateItems(query)
        ];
        try {
            const [count, items] = await Promise.all(promises);
            for (const item of items) {
                if (item.banner) item.banner = await cloudFrontService.getSignedUrl(item.banner);
            }
            const noOfPages = Math.ceil(count / limit);
            return { count, noOfPages, items };
        } catch (error) {
            throw new CustomError(400, error.message);
        }
    },
}