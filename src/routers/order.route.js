const OrderController = require('../controllers/order.controller');

const orderRoutes = (app, router) => {

    router.post('/payment', OrderController.placeOrder);

    return router;
};

module.exports = orderRoutes;
