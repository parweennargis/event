const EventController = require('../controllers/event.controller');



const eventRoute = (app, router) => {
    const uploadFields = app.upload.fields([
        { name: 'images', maxCount: 5 },
        { name: 'banner', maxCount: 1 },
        { name: 'floor_plan', maxCount: 1 },
        { name: 'past_event_images', maxCount: 20 },
        { name: 'past_event_banner_image', maxCount: 1 }
    ]);

    router.post('/events', uploadFields, EventController.create);

    router.put('/events/:eventId', uploadFields, EventController.update);

    router.delete('/events/:eventId', EventController.delete);

    router.get('/events', EventController.getAll);

    router.get('/events/:eventId', EventController.getById);

    // TODO
    router.get('/events/:categoryId', EventController.getByCategoryId);

    // events to show in admin portal
    router.post('/all-events', EventController.getAllEvents);

    router.get('/offline-events', EventController.getAllOfflineEvent);

    router.get('/previous-events', EventController.previousEvents);

    router.post('/jobseeker-send-email', EventController.jobseekerSendEmail);

    return router;
};

module.exports = eventRoute;