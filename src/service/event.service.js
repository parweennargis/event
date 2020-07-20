const _ = require('lodash')
const mongoose = require('mongoose');

const PricingModel = require('../models/pricing.model');
const CustomError = require('../utils/error');
const cloudFrontService = require('../service/aws/aws.cloudfront.service');
const awsSesService = require('../service/aws/aws.ses.service');

const userRepository = require('../repository/user.repository');
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
            if (!_.isEmpty(pricing)) {
                const pricings = await pricingRepository.find({ _id: { $in: pricing } }, 'name');
                if (pricings.length !== pricing.length) throw new CustomError(404, 'Invalid Pricing.');
            }

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
        if (event.banner) event.banner = await cloudFrontService.getSignedUrl(event.banner);
        if (event.floor_plan) event.floor_plan = await cloudFrontService.getSignedUrl(event.floor_plan);
        if (event.past_event_image) {
            const pastEventImagesPromises = event.past_event_image.map(async (item) => {
                item.image = await cloudFrontService.getSignedUrl(item.image)
                return item;
            });
            event.past_event_image = await Promise.all(pastEventImagesPromises);
        }
        if (event.past_event_banner_image) event.past_event_banner_image = await cloudFrontService.getSignedUrl(event.past_event_banner_image);

        return event;
    },
    getAll: async (page = "1", limit = "7", eventCategoryId) => {
        if (!eventCategoryId) {
            const eventCategoryDefault = await eventCategoryRepository.findOne({ default: true });
            if (eventCategoryDefault) eventCategoryId = eventCategoryDefault.id
        }
        let query = {};
        query.match = { is_active: true, event_category: mongoose.Types.ObjectId(eventCategoryId), start_date: { $gte: new Date() } };
        query.skip = (+page - 1) * +limit;
        query.sort = { startDate: 'asc' };
        query.limit = +limit;
        const promises = [
            eventRepository.count(query.match),
            eventRepository.paginateItems(query)
        ];
        try {
            const [count, items] = await Promise.all(promises);
            for (const item of items) {
                const promises = item.images.map(image => cloudFrontService.getSignedUrl(image));
                item.images = await Promise.all(promises);
                if (item.banner) item.banner = await cloudFrontService.getSignedUrl(item.banner);
                if (item.floor_plan) item.floor_plan = await cloudFrontService.getSignedUrl(item.floor_plan);
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
        query.match = { is_active: true, event_category: mongoose.Types.ObjectId(eventCategoryId), start_date: { $gte: new Date() }, event_type: 'VIRTUAL' };
        query.skip = (+page - 1) * +limit;
        query.sort = { startDate: 'asc' };
        query.limit = +limit;
        const promises = [
            eventRepository.count(query.match),
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
    previousEvents: async (eventCategoryId) => {
        if (!eventCategoryId) {
            const eventCategoryDefault = await eventCategoryRepository.findOne({ default: true });
            if (eventCategoryDefault) eventCategoryId = eventCategoryDefault.id
        }
        let query = {};
        query.match = {
            event_category: mongoose.Types.ObjectId(eventCategoryId),
            start_date: { $lte: new Date() },
            past_event_image: { $exists: true, $not: { $size: 0 } }
        };
        // query.skip = (+page - 1) * +limit;
        query.sort = { start_date: 'desc' };
        // query.limit = +limit;
        const promises = [
            eventRepository.count(query.match),
            eventRepository.paginateItems(query)
        ];
        try {
            const [count, items] = await Promise.all(promises);
            for (const item of items) {
                // const promises = item.images.map(image => cloudFrontService.getSignedUrl(image));
                // item.images = await Promise.all(promises);
                // if (item.banner) item.banner = await cloudFrontService.getSignedUrl(item.banner);
                // if (item.floor_plan) item.floor_plan = await cloudFrontService.getSignedUrl(item.floor_plan);
                if (item.past_event_banner_image) item.past_event_banner_image = await cloudFrontService.getSignedUrl(item.past_event_banner_image);
            }
            // const noOfPages = Math.ceil(count / limit);
            return { count, items };
        } catch (error) {
            throw new CustomError(400, error.message);
        }
    },
    jobseekerSendEmail: async (userId, event_id) => {
        // check user is job seeker
        const user = await userRepository.findOne({ _id: userId });
        if (!_.isEmpty(user)) {
            if (user.role_type !== 'JOBSEEKER') {
                // send error msg
                throw new CustomError(400, 'User must be a job seeker');
            }

            // check user already interested or not
            if (user.event_interested.includes(event_id)) {
                // send error msg
                throw new CustomError(400, 'You are already registered');
            }

            // send email to user
            awsSesService.sendMail('jobseeker-confirmation.hbs', {
                toAddresses: [user.email],
                subject: 'Job Seeker Confirmation Email',
                data: {
                    name: `${user.first_name} ${user.last_name ? user.last_name : ''}`
                }
            });

            // update the user object for the event
            await userRepository.updateOne({ _id: userId }, { $addToSet: { event_interested: event_id } });

        }

        try {
            const [count, items] = await Promise.all(promises);
            for (const item of items) {
                // const promises = item.images.map(image => cloudFrontService.getSignedUrl(image));
                // item.images = await Promise.all(promises);
                // if (item.banner) item.banner = await cloudFrontService.getSignedUrl(item.banner);
                // if (item.floor_plan) item.floor_plan = await cloudFrontService.getSignedUrl(item.floor_plan);
                if (item.past_event_banner_image) item.past_event_banner_image = await cloudFrontService.getSignedUrl(item.past_event_banner_image);
            }
            // const noOfPages = Math.ceil(count / limit);
            return { count, items };
        } catch (error) {
            throw new CustomError(400, error.message);
        }
    }
}