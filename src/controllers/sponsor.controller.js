const validateSponsorRequest = require('../validateRequest/sponsor');
const sponsorService = require('../service/sponsor.service');
const awsS3Service = require('../service/aws/aws.s3.service');

module.exports = {
    createSponsor: async (req, res) => {
        try {
            // validate sponsor request
            const { body, file } = req;
            validateSponsorRequest.sponsor(body);
            // create sponsor
            body.is_active = body.is_active === 'true' ? true : false;
            const sponsor = await sponsorService.createSponsor(body);
            // upload image if send in request body
            if (file) {
                awsS3Service.uploadFile(file)
                    .then((uploadtedFile) => {
                        const imageData = { image: uploadtedFile ? uploadtedFile.key : '' };
                        sponsorService.updateSponsor(sponsor._id, imageData);
                    })
                    .catch((err) => {
                        console.log('[CreateSponsor]: error in upload image');
                        console.log(err);
                    });
            }
            return res.status(201).json({ data: sponsor });
        } catch (error) {
            // console.log(error);
            console.log(error.message);
            return res.status(400).json({ errors: error.errors || error.message });
        }
    },
    getSponsors: async (req, res) => {
        try {
            const { query = {} } = req;
            const sponsors = await sponsorService.getSponsors(query);

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
            const { body, params: { sponsorId }, file } = req;
            validateSponsorRequest.sponsor(body);
            // upload image if send in request body
            if (file) {
                const uploadFileData = await awsS3Service.uploadFile(file);
                body.image = uploadFileData ? uploadFileData.key : '';
            }
            // create sponsor
            body.is_active = body.is_active === 'true' ? true : false;
            const sponsor = await sponsorService.updateSponsor(sponsorId, body);
            return res.json({ data: sponsor });
        } catch (error) {
            console.log(error);
            return res.status(400).json({ errors: error.errors || error.message });
        }
    },
    getSponsorById: async (req, res) => {
        try {
            const { params: { sponsorId } } = req;
            const sponsor = await sponsorService.getSponsorById(sponsorId);

            return res.json({ data: sponsor });
        } catch (error) {
            console.log(error);
            return res.status(400).json({ errors: error.errors || error.message });
        }
    },
};