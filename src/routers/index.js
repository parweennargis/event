const cartRoute = require('./cart.route');
const userRoute = require('./users.route');
const eventRoute = require('./event.route');
const contactRoute = require('./contact.route');
const sponsorRoute = require('./sponsor.route');
const pricingRoute = require('./pricing.route');
const accountRoute = require('./accounts.route');
const eventCatgoryRoute = require('./eventCategory.route');
const eventOfflineRoute = require('../routers/eventOffline.route');
const offlineCategoryRoute = require('../routers/offlineCategory.route');

const indexRoutes = (app, router) => {
    cartRoute(app, router);
    userRoute(app, router);
    cartRoute(app, router);
    eventRoute(app, router);
    accountRoute(app, router);
    contactRoute(app, router);
    sponsorRoute(app, router);
    pricingRoute(app, router);
    eventCatgoryRoute(app, router);
    eventOfflineRoute(app, router);
    offlineCategoryRoute(app, router);

    return router;
};

module.exports = indexRoutes;
