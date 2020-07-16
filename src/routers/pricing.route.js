const PricingController = require('../controllers/pricing.controller');

const sponsorRoute = (app, router) => {
    // get all active pricing
    router.get('/pricings', PricingController.getPricings);
    // get all pricing
    router.get('/pricings/all', PricingController.getAllPricings);
    // get pricing by id
    router.get('/pricing/:pricingId', PricingController.getPricingById);
    // create the pricing
    router.post('/pricing', PricingController.createPricing);
    // delete pricing
    router.delete('/pricing/:pricingId', PricingController.deletePricing);
    // update pricing
    router.put('/pricing/:pricingId', PricingController.updatePricing);

    return router;
};

module.exports = sponsorRoute;