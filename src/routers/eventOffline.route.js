const EventOfflineController = require('../controllers/eventOffline.controller');

const eventRoute = (app, router) => {
    const uploadFields = app.upload.fields([
        { name: 'banner', maxCount: 1 },
        { name: 'past_event_images', maxCount: 20 },
        { name: 'past_event_banner_image', maxCount: 1 }
    ]);

    // create offline event
    router.post('/offline-event', uploadFields, EventOfflineController.create);

    router.delete('/offline-event/:eventId', EventOfflineController.delete);

    router.put('/offline-event/:eventId', uploadFields, EventOfflineController.update);

    router.get('/offline-event/:eventId', EventOfflineController.getById);

    router.post('/event-action', EventOfflineController.action);

    return router;
};

module.exports = eventRoute;