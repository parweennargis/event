const validateAccounts = require('../validateRequest/accounts');
const accountService = require('../service/account.service');
const awsS3Service = require('../service/aws/aws.s3.service');
const awsSesService = require('../service/aws/aws.ses.service');

const CustomError = require('../utils/error');

const checkRegisterBody = (roleType, body) => {
    switch(roleType) {
        case 'ATTENDEE':
            return validateAccounts.registerAttendee(body);
         case 'EXHIBITOR':
             return validateAccounts.registerExhibitor(body);
        case 'JOBSEEKER':
            return validateAccounts.registerJobSeeker(body);
        default:
            throw new CustomError(400, 'Invalid Request');
    }   
}

module.exports = {
    register: async (req, res) => {
        try {
            const { body } = req;
            const { role_type, ...reqBody } = body;
            // validate the register request
            checkRegisterBody(role_type, reqBody);

            const user = await accountService.register(body);
            if (role_type === 'ATTENDEE') {
                const loggedIn = await accountService.login({ email: reqBody.email, password: reqBody.password });
                user.token = loggedIn.token;
            }
            
            return res.json({ data: user });
        } catch (error) {
            return res.status(400).json({ errors: error.errors || error.message });
        }
    },
    login: async (req, res) => {
        try {
            const { body } = req;
            // validate the login request body
            validateAccounts.login(body);
            const loggedIn = await accountService.login(body);
            return res.json({ data: loggedIn });
        } catch (error) {
            return res.status(400).json({ errors: error.errors || error.message });
        }
    },
    resumeUpload: async (req, res) => {
        try {
            await awsS3Service.uploadFile(req.file);
            return res.json({ data: req.file });
        } catch (error) {
            console.log(error);
            return res.status(400).json({ errors: error.errors || error.message });
        }
    },
    verifyUser: async (req, res) => {
        return res.json({ data: req.user});
    },
    sendMsg: async (req, res) => {
        // try {
            const { body } = req;
            const loggedIn = await accountService.sendMsg(body);
            return res.json({ data: loggedIn });
        // } catch (error) {
        //     return res.status(400).json({ errors: error.errors || error.message });
        // }
    },
    forgotPassword: async (req, res) => {
        try {
            const { body } = req;
            // validate the request
            validateAccounts.forgotPassword(body);
            await accountService.forgotPassword(body.email);
            return res.json({});
        } catch (error) {
            console.log(error);
            return res.status(400).json({ errors: error.errors || error.message });
        }
    },
    resetPassword: async (req, res) => {
        try {
            const { body: { token } } = req;
            await accountService.resetPassword(token);
            return res.json({});
        } catch (error) {
            console.log(error);
            return res.status(400).json({ errors: error.errors || error.message });
        }
    },
    changePassword: async (req, res) => {
        try {
            const { body } = req;
            // validate the request
            validateAccounts.changePassword(body);
            const { token, password } = body;
            await accountService.changePassword(token, password);
            return res.json({});
        } catch (error) {
            console.log(error);
            return res.status(400).json({ errors: error.errors || error.message });
        }
    },
    activateAccount: async (req, res) => {
        try {
            const { body: { token } } = req;
            await accountService.activateAccount(token);
            return res.json({});
        } catch (error) {
            console.log(error);
            return res.status(400).json({ errors: error.errors || error.message });
        }
    }
};
