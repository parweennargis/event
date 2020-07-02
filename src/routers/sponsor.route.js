const SponsorController = require('../controllers/sponsor.controller');

const sponsorRoute = (app, router) => {
    router.post('/sponsors', app.upload.single('image'), SponsorController.createSponsor);

    router.put('/sponsors/:sponsorId', app.upload.single('image'), SponsorController.updateSponsor);

    router.delete('/sponsors/:sponsorId', SponsorController.deleteSponsor);

    router.get('/sponsors', SponsorController.getSponsors);

    router.get('/sponsors/:sponsorId', SponsorController.getSponsorById);
};

module.exports = sponsorRoute;