const validateSponsorRequest = require('../validateRequest/sponsor');
const sponsorService = require('../service/sponsor.service');
const awsS3Service = require('../service/aws/aws.s3.service');

module.exports = {
    createSponsor: async (req, res) => {
        try {
            // validate sponsor request
            const { body } = req;
            validateSponsorRequest.sponsor(body);
            // upload image if send in request body
            if (req.file) {
                const uploadFileData = await awsS3Service.uploadFile(req.file);
                body.image = uploadFileData ? uploadFileData.key : '';
            }
            // create sponsor
            const sponsor = await sponsorService.createSponsor(body);
            return res.status(201).json({ data: sponsor });
        } catch (error) {
            // console.log(error);
            console.log(error.message);
            return res.status(400).json({ errors: error.errors || error.message });
        }
    },
    getSponsors: async (req, res) => {
        try {
            const sponsors = await sponsorService.getSponsors();
            return res.json({ data: sponsors });
        } catch (error) {
            console.log(error);
            return res.status(400).json({ errors: error.errors || error.message });
        }
    },
    deleteSponsor: async (req, res) => {
        try {
            const { params: { sponsorId } } = req;
            await sponsorService.deleteSponsor(sponsorId);
            return res.status(204).json({});
        } catch (error) {
            return res.status(400).json({ errors: error.errors || error.message });
        }
    },
    updateSponsor: async (req, res) => {
        try {
            // validate sponsor request
            const { body, params: { sponsorId } } = req;
            validateSponsorRequest.sponsor(body);
            // upload image if send in request body
            if (req.file) {
                const uploadFileData = await awsS3Service.uploadFile(req.file);
                body.image = uploadFileData ? uploadFileData.key : '';
            }
            // create sponsor
            const sponsor = await sponsorService.updateSponsor(sponsorId, body);
            return res.json({ data: sponsor });
        } catch (error) {
            console.log(error);
            return res.status(400).json({ errors: error.errors || error.message });
        }
    }
};