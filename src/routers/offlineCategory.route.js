const OfflineCategoryController = require('../controllers/offlineCategory.controller');

const offlineCategoryRoutes = (app, router) => {

    router.get('/offline-categories', OfflineCategoryController.getAll);

    router.put('/offline-categories/:offlineCategoryId', OfflineCategoryController.update);

    router.delete('/offline-categories/:offlineCategoryId', OfflineCategoryController.delete);

    router.post('/offline-categories', OfflineCategoryController.create);

    router.get('/offline-categories/:offlineCategoryId', OfflineCategoryController.getById);

    return router;
};

module.exports = offlineCategoryRoutes