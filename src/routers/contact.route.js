const ContactController = require('../controllers/contact.controller');

const accountsRoutes = (app, router) => {
    router.post('/contact', ContactController.createContact);

    // subscribe newsletter
    router.post('/subscribe', ContactController.subscribeNewsletter);

    return router;
};

module.exports = accountsRoutes;
