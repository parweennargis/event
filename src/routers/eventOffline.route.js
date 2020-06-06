const EventOfflineController = require('../controllers/eventOffline.controller');

const eventRoute = (app, router) => {

    // create offline event
    router.post('/offline-event', app.upload.single('banner'), EventOfflineController.create);

    router.delete('/offline-event/:eventId', EventOfflineController.delete);

    router.put('/offline-event/:eventId', app.upload.single('banner'), EventOfflineController.update);

    router.get('/offline-event/:eventId', EventOfflineController.getById);

    router.post('/event-action', EventOfflineController.action);

    return router;
};

module.exports = eventRoute;