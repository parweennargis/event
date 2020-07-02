const _ = require('lodash');
const CustomError = require('../utils/error');
const sponsorRepository = require('../repository/sponsor.repository');
const cloudFrontService = require('../service/aws/aws.cloudfront.service');

module.exports = {
    createSponsor: async (data) => {
        return sponsorRepository.create(data);
    },
    updateSponsor: async (sponsorId, data) => {
        // const sponsor = await sponsorRepository.findOne({ _id: sponsorId })
        // if (!sponsor) throw new CustomError(404, 'Sponsor not found');
        return sponsorRepository.findByIdAndUpdate(sponsorId, data);
    },
    getSponsors: async () => {
        // let sponsors = await sponsorRepository.find({ is_active: true });
        let sponsors = await sponsorRepository.find();
        sponsors = (sponsors || []).map(async (item) => {
            item = item.toJSON();
            if (item.image) item.image_url = await cloudFrontService.getSignedUrl(item.image)
            return item;
        });

        return Promise.all(sponsors);
    },
    deleteSponsor: async (sponsorId) => {
        const sponsor = await sponsorRepository.findOne({ _id: sponsorId })
        if (!sponsor) throw new CustomError(404, 'Sponsor not found');
        sponsor.is_active = false;
        return sponsor.save();
    },
    getSponsorById: async (sponsorId) => {
        let sponsor = await sponsorRepository.findOne({ _id: sponsorId })
        if (!sponsor) throw new CustomError(404, 'Sponsor not found');
        sponsor = sponsor.toJSON();
        if (sponsor.image) sponsor.image_url = await cloudFrontService.getSignedUrl(sponsor.image)

        return sponsor;
    },
}