const UserController = require('../controllers/users.controller');
const AccountController = require('../controllers/accounts.controller');

const accountsRoutes = (app, router) => {

    router.get('/user-list', UserController.userList);

    router.post('/register', AccountController.register);

    router.post('/login', AccountController.login);

    router.get('/send-msg', AccountController.sendMsg);

    app.post('/file-upload', app.upload.single('fileUpload'), AccountController.resumeUpload);

    router.get('/verify', AccountController.verifyUser);

    router.post('/forgot-password', AccountController.forgotPassword);

    router.post('/reset-password', AccountController.resetPassword);

    router.post('/change-password', AccountController.changePassword);

    router.post('/activate-account', AccountController.activateAccount);

    return router;
};

module.exports = accountsRoutes;
