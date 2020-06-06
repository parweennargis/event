const PricingController = require('../controllers/pricing.controller');

const sponsorRoute = (app, router) => {
    // get all pricing
    router.get('/pricings', PricingController.getPricings);
    // create the pricing
    router.post('/pricing', PricingController.createPricing);
    // delete pricing
    router.delete('/pricing/:pricingId', PricingController.deletePricing);

    return router;
};

module.exports = sponsorRoute;