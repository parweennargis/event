const _ = require('lodash');
const nodemailer = require('nodemailer');
const { v4: uuidv4 } = require('uuid');

const User = require('../models/user.model');
const CustomError = require('../utils/error');
const { createToken } = require('../utils/common');
const userRepository = require('../repository/user.repository');
const awsSesService = require('../service/aws/aws.ses.service');
const config = require('../../config');

module.exports = {
    register: async (data) => {
        const { email, password } = data;

        // // check email is unique or not 
        // if (!await module.exports.isEmailUnique(email)) throw new CustomError(404, `User with ${email} already exist.`);

        // create hash password
        data.password = User.HashPassword(password);
        // Create new Date instance
        var date = new Date();
        // Add a day
        date.setDate(date.getDate() + 2);
        // Activate account login token
        data.activate_account = {
            token: uuidv4(),
            expiryDate: date
        };
        let user = await userRepository.create(data);
        user = user.toObject();
        // delete password from user object to send the object in response.
        delete user.password;

        // send email to user
        awsSesService.sendMail('activate-account.hbs', {
            toAddresses: [user.email],
            subject: 'TTN Account Activation',
            data: { 
                name: `${user.first_name} ${user.last_name ? user.last_name : ''}`,
                activationLink: `${config.websiteUrl}/activate-account?token=${user.activate_account.token}`
            }
        });

        return user;
    },
    login: async (data) => {
        const { email, password } = data;
        const user = await userRepository.findOne({ email, is_active: true });
        if (!user) throw new CustomError(404, 'Invalid Email or Password');

        if (user.password !== User.HashPassword(password)) throw new CustomError(400, 'Email/Password is incorrect');

        return { token: createToken({ userId: user.id, email: user.email, role: user.role_type }), user: { userId: user.id, email: user.email } };
    },
    isEmailUnique: async (email) => {
        const data = await userRepository.findOne({ email }, 'email');
        return _.isEmpty(data);
    },
    sendEmail: async (sendToEmailId, subject) => {
        let transporter = nodemailer.createTransport({
            sendmail: true,
            newline: 'windows',
            logger: false
        });

        let message = {
            from: 'Naveen <nav@thetruckingnetwork.ca>',

            // Comma separated list of recipients
            to: sendToEmailId,

            // Subject of the message
            subject: subject,

            // HTML body
            html:
                '<p><b>Hello</b> </p>' +
                '<p>Register Email Template</p>',
        };

        await transporter.sendMail(message);
    },
    forgotPassword: async (email) => {
        const user = await userRepository.findOne({ email });
        if (!user) throw new CustomError(404, 'Invalid Email');
        // Create new Date instance
        var date = new Date();
        // Add a day
        date.setDate(date.getDate() + 1);
        user.reset_password = {
            token: uuidv4(),
            expiryDate: date
        };
        await user.save();
        awsSesService.sendMail('reset-password.hbs', {
            toAddresses: [email],
            subject: 'Forgot Password',
            data: {
                resetPasswordLink: `http://localhost:4001/reset-password?token=${user.reset_password.token}`,
                name: `${user.first_name} ${user.last_name ? user.last_name : ''}`
            }
        });
    },
    resetPassword: async (token) => {
        const user = await userRepository.findOne({ 'reset_password.token': token });
        if (!user) throw new CustomError(400, 'Link is expired');
        const { reset_password: { expiryDate } } = user;
        const currentTime = (new Date()).getTime();
        const expiryTime = (new Date(expiryDate)).getTime();
        if (currentTime > expiryTime) throw new CustomError(400, 'Link is expired');
        return;
    },
    changePassword: async (token, password) => {
        const user = await userRepository.findOne({ 'reset_password.token': token });
        if (!user) throw new CustomError(400, 'Email not found');
        // create hash password
        user.password = User.HashPassword(password);
        user.reset_password = {
            token: null,
            expiryDate: null
        };
        await user.save();
        return;
    },
    activateAccount: async (token) => {
        let user = await userRepository.findOne({ 'activate_account.token': token }, 'activate_account is_active email first_name last_name');
        if (!user) throw new CustomError(400, 'Link is expired');
        // user = user.toJSON();
        if (user.is_active) throw new CustomError(400, 'Link is expired');
        const { activate_account: { expiryDate } } = user;
        const currentTime = (new Date()).getTime();
        const expiryTime = (new Date(expiryDate)).getTime();
        if (currentTime > expiryTime) throw new CustomError(400, 'Link is expired');

        user.is_active = true;
        await user.save();

        // send email to user
        awsSesService.sendMail('register.hbs', {
            toAddresses: [user.email],
            subject: 'TTN Register',
            data: { 
                name: `${user.first_name} ${user.last_name ? user.last_name : ''}`,
                email: user.email,
                url: `${config.websiteUrl}`
            }
        });
    }
}
