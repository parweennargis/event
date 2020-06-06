const sponsorRepository = require('../repository/sponsor.repository');
const CustomError = require('../utils/error');

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
        return sponsorRepository.find({ is_active: true });
    },
    deleteSponsor: async (sponsorId) => {
        const sponsor = await sponsorRepository.findOne({ _id: sponsorId })
        if (!sponsor) throw new CustomError(404, 'Sponsor not found');
        sponsor.is_active = false;
        return sponsor.save();
    }
}