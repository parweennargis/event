const ContactController = require('../controllers/contact.controller');

const accountsRoutes = (app, router) => {
    router.post('/contact', ContactController.createContact);

    return router;
};

module.exports = accountsRoutes;
