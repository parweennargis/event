const SponsorController = require('../controllers/sponsor.controller');

const sponsorRoute = (app, router) => {
    router.post('/sponsors', app.upload.single('file'), SponsorController.createSponsor);

    router.put('/sponsors/:sponsorId', app.upload.single('file'), SponsorController.updateSponsor);

    router.delete('/sponsors/:sponsorId', SponsorController.deleteSponsor);

    router.get('/sponsors', SponsorController.getSponsors);
};

module.exports = sponsorRoute;