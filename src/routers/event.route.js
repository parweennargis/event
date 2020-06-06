const EventController = require('../controllers/event.controller');

const eventRoute = (app, router) => {

    router.post('/events', app.upload.array('files', 5) , EventController.create);

    router.put('/events/:eventId', app.upload.array('files', 5), EventController.update);

    router.delete('/events/:eventId', EventController.delete);

    router.get('/events', EventController.getAll);

    router.get('/events/:eventId', EventController.getById);

    // TODO
    router.get('/events/:categoryId', EventController.getByCategoryId);

    // events to show in admin portal
    router.post('/all-events', EventController.getAllEvents);

    router.get('/offline-events', EventController.getAllOfflineEvent);

    return router;
};

module.exports = eventRoute;