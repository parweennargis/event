const EventCategoryController = require('../controllers/eventCategory.controller');

const eventCategoryRoutes = (app, router) => {

    router.get('/event-categories', EventCategoryController.getAll);

    router.put('/event-categories/:eventCategoryId', EventCategoryController.update);

    router.delete('/event-categories/:eventCategoryId', EventCategoryController.delete);

    router.post('/event-categories', EventCategoryController.create);

    return router;
};

module.exports = eventCategoryRoutes