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
        let sponsers = await sponsorRepository.find({ is_active: true });
        if (!_.isEmpty(sponsers)) {
            sponsers = _.map(sponsers, sponser => {
                return sponser.toObject();
            });
            const imagePromise = sponsers.map(async (item) => {
                item.image_url = await cloudFrontService.getSignedUrl(item.image)
                return item;
            });
            sponsers.image_url = await Promise.all(imagePromise);
        }

        return sponsers;
    },
    deleteSponsor: async (sponsorId) => {
        const sponsor = await sponsorRepository.findOne({ _id: sponsorId })
        if (!sponsor) throw new CustomError(404, 'Sponsor not found');
        sponsor.is_active = false;
        return sponsor.save();
    }
}