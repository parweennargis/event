const userService = require('../service/user.service');
const awsS3Service = require('../service/aws/aws.s3.service');
const cloudFrontService = require('../service/aws/aws.cloudfront.service');

module.exports = {
    userList: async (req, res) => {
        try {
            // get id from seesion
            const userId = req.user.userId;
            const user = await userService.userList(userId);
            console.log(user.toJSON());
            return res.json({ data: user.toJSON() });
        } catch (error) {
            console.log(error);
            return res.status(400).json({ errors: error.errors || error.message });
        }
    },
    profile: async (req, res) => {
        try {
            const { user: { userId } } = req;
            let user = await userService.findById(userId);
            user = user.toJSON();
            const resume = user.link && user.link.resume ? user.link.resume : null;
            const logo = user.link && user.link.logo ? user.link.logo : null;
            let resumeLink = null;
            let logoLink = null;
            if (resume) resumeLink = await cloudFrontService.getSignedUrl(resume);
            if (logo) logoLink = await cloudFrontService.getSignedUrl(logo);
            if (resumeLink) user.resume = resumeLink;
            if (logoLink) user.logo = logoLink;
            return res.json({ data: user });
        } catch (error) {
            console.log(error);
            return res.status(400).json({ errors: error.errors || error.message });
        }
    },
    updateProfile: async (req, res) => {
        try {
            const { user: { userId }, body } = req;
            const user = await userService.updateProfile(userId, body);
            return res.json({ data: user});
        } catch (error) {
            console.log(error);
            return res.status(400).json({ errors: error.errors || error.message });
        }
    },
    profileUpload: async (req, res) => {
        try {
            const { user: { userId }, file, body: { name } } = req;
            const data = await awsS3Service.uploadFile(file);
            const [uploadedFile] = await Promise.all([
                cloudFrontService.getSignedUrl(data.key),
                userService.updateProfile(userId, { link: { [name]: data.key } })
            ]);
            return res.json({ data: uploadedFile });
        } catch (error) {
            console.log(error);
            return res.status(400).json({ errors: error.errors || error.message });
        }
    },
};
