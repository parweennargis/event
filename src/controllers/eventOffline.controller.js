const eventOfflineService = require('../service/eventOffline.service');
const validateOfflineEventRequest = require('../validateRequest/eventOffline');
const awsS3Service = require('../service/aws/aws.s3.service');
const CustomError = require('../utils/error');

module.exports = {
    create: async (req, res) => {
        try {
            // validate the request body
            const { body, files } = req;
            body.is_active = body.is_active === 'true' ? true : false;
            validateOfflineEventRequest.createEvent(body);
            
            // get data from logged in user and map it for event_organized_by;
            body.organized_by = req.user.userId;
            if (body.past_event_video) body.past_event_video = body.past_event_video.reduce((prev, curr) => {
                prev.push({ video: curr });
                return prev;
            }, []);
            // create event
            const event = await eventOfflineService.createEvent(body);
            if (files && Object.keys(files).length) {
                for (const key in files) {
                    try {
                        const promises = files[key].map(file => awsS3Service.uploadFile(file));
                        const results = await Promise.all(promises);
                        const eventJson = event.toJSON();
                        const updateBody = {};
                        const imageIds = results.map((result) => result.key);
                        if (key === 'images') {
                            updateBody[key] = imageIds;
                        } else if (key === 'past_event_images') {
                            let pastEventImageArray = [];
                            for (const image of imageIds) {
                                pastEventImageArray.push({ image });
                            }
                            updateBody['past_event_image'] = pastEventImageArray;
                        } else {
                            updateBody[key] = imageIds[0];
                        }
                        eventOfflineService.updateEvent(eventJson._id, updateBody);
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
            const { params: { eventId }, body, files } = req;
            if (!eventId) throw new CustomError(400, 'Event id is required');
            body.is_active = body.is_active === 'true' ? true : false;
            // validate the request body
            validateOfflineEventRequest.createEvent(body);
            // update event
            // if (file) {
            //     const image = await awsS3Service.uploadFile(file);
            //     if (image) body.banner = image.key;
            // }
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
                            const eventImage = { $push: { past_event_image: pastEventImageArray } };
                            await eventOfflineService.updateEvent(eventId, eventImage);
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