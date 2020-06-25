const validateEventRequest = require('../validateRequest/event');
const eventService = require('../service/event.service');
const awsS3Service = require('../service/aws/aws.s3.service');
const CustomError = require('../utils/error');

module.exports = {
    create: async (req, res) => {
        try {
            // validate the request body
            const { body, files } = req;
            validateEventRequest.createEvent(body);

            // get data from logged in user and map it for event_organized_by;
            body.organized_by = req.user.userId;
            if (body.past_event_video) body.past_event_video = body.past_event_video.reduce((prev, curr) => {
                prev.push({ video: curr });
                return prev;
            }, []);
            // create event
            const event = await eventService.createEvent(body);
            // if (files && Object.keys(files).length) {
            //     const promises = Object.keys(files).map(file => awsS3Service.uploadFile(file));
            //     Promise.all(promises)
            //     .then((results) => {
            //         console.log(results);
            //         console.log(event);
            //         const eventJson = event.toJSON();
            //         const imageIds = results.map((result) => result.key);
            //         eventJson.images = imageIds;
            //        return eventService.updateEvent(eventJson._id, eventJson);
            //     })
            //     .catch((error) => {
            //         console.log('Upload event image error occured: ' + error);
            //     });
            // }
            if (files && Object.keys(files).length) {
                for (const key in files) {
                    try {
                        const promises = files[key].map(file => awsS3Service.uploadFile(file));
                        const results = await Promise.all(promises);
                        const eventJson = event.toJSON();
                        const imageIds = results.map((result) => result.key);
                        if (key === 'images') {
                            eventJson[key] = imageIds;
                        } else if (key === 'past_event_images') {
                            let pastEventImageArray = [];
                            for (const image of imageIds) {
                                pastEventImageArray.push({ image });
                            }
                            eventJson['past_event_image'] = pastEventImageArray;
                            // if (eventJson['past_event']) eventJson['past_event']['images'] = imageIds;
                            // else {
                            //     eventJson['past_event'] = {};
                            //     eventJson['past_event']['images'] = imageIds;
                            // }
                        } else {
                            eventJson[key] = imageIds[0];
                        }
                        eventService.updateEvent(eventJson._id, eventJson);
                    } catch (error) {
                        console.log('Upload event image error occured: ' + error);
                    }
                }
            }
            return res.json({ data: event });
        } catch (error) {
            console.log(error);
            return res.status(400).json({ errors: error.errors || error.message });
        }
    },
    update: async (req, res) => {
        try {
            const { params: { eventId }, body, files } = req;

            // validate the request params
            if (!eventId) throw new CustomError(400, 'Event id is required');

            // validate the request body
            validateEventRequest.createEvent(body);

            // get data from logged in user and map it for event_organized_by;
            body.organized_by = req.user.userId;

            if (files && Object.keys(files).length) {
                for (const key in files) {
                    const promises = files[key].map(file => awsS3Service.uploadFile(file));
                    try {
                        const results = await Promise.all(promises);
                        const imageIds = results.map((result) => result.key);
                        if (key === 'images') {
                            body[key] = imageIds;
                        } else if (key === 'past_event_images') {
                            let pastEventImageArray = [];
                            for (const image of imageIds) {
                                pastEventImageArray.push({ image });
                            }
                            body['past_event_image'] = pastEventImageArray;
                            // if (body['past_event']) body['past_event']['images'] = imageIds;
                            // else {
                            //     body['past_event'] = {};
                            //     body['past_event']['images'] = imageIds;
                            const eventImage = { $push: { past_event_image: pastEventImageArray } };
                            await eventService.updateEvent(eventId, eventImage);
                        } else {
                            body[key] = imageIds[0];
                        }
                    } catch (error) {
                        console.log('Upload event image error occured: ' + error);
                    }
                }
            }
            if (body.past_event_video) body.past_event_video = body.past_event_video.reduce((prev, curr) => {
                prev.push({ video: curr });
                return prev;
            }, []);

            // update event
            const event = await eventService.updateEvent(eventId, body);

            return res.json({ data: event });
        } catch (error) {
            return res.status(400).json({ errors: error.errors || error.message });
        }
    },
    delete: async (req, res) => {
        try {
            const { eventId } = req.params;
            if (!eventId) throw new CustomError(400, 'Event id is required');
            eventService.deleteEvent(eventId);
            return res.status(204).json();
        } catch (error) {
            return res.status(400).json({ errors: error.errors || error.message });
        }
    },
    getAll: async (req, res) => {
        try {
            const { query: { page, limit, eventCategoryId } } = req;
            const events = await eventService.getAll(page, limit, eventCategoryId);
            return res.json({ data: events });
        } catch (error) {
            console.log(error);
            return res.status(400).json({ errors: error.errors || error.message });
        }
    },
    getById: async (req, res) => {
        try {
            const { eventId } = req.params;
            if (!eventId) throw new CustomError(400, 'Event id is required');
            const event = await eventService.getEventDetail(eventId);
            return res.json({ data: event });
        } catch (error) {
            return res.status(400).json({ errors: error.errors || error.message });
        }
    },
    getByCategoryId: async (req, res) => {
        try {
            const { categoryId } = req.params;
            if (!categoryId) throw new CustomError(400, 'Invalid Request');

            const event = await eventService.getEventByCategory(categoryId);
            return res.json({ data: event });
        } catch (error) {
            return res.status(400).json({ errors: error.errors || error.message });
        }
    },
    getAllEvents: async (req, res) => {
        try {
            const events = await eventService.getAllEvents(req.body);
            console.log(events);
            return res.json({ data: events });
        } catch (error) {
            console.log(error);
            return res.status(400).json({ errors: error.errors || error.message });
        }
    },
    getAllOfflineEvent: async (req, res) => {
        try {
            const { query: { page, limit, eventCategoryId } } = req;
            const events = await eventService.getAllOfflineEvent(page, limit, eventCategoryId);
            return res.json({ data: events });
        } catch (error) {
            console.log(error);
            return res.status(400).json({ errors: error.errors || error.message });
        }
    },
};