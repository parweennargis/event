const CartController = require('../controllers/cart.controller');

const cartsRoutes = (app, router) => {

    router.get('/cart', CartController.getUserCart);

    router.post('/cart', CartController.addItemInCart);

    router.delete('/cart/:cartId', CartController.deleteItemFromCart);

    return router;
};

module.exports = cartsRoutes;
