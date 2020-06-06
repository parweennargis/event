const AccountController = require('../controllers/accounts.controller');
const UserController = require('../controllers/users.controller');

const accountsRoutes = (app, router) => {
    // router.post('/register', AccountController.register);
    // router.post('/file-upload', app.upload.single('fileUpload'), UserController.resumeUpload);
    router.get('/profile', UserController.profile);

    router.put('/profile', UserController.updateProfile);

    router.post('/profile/upload', app.upload.single('file'), UserController.profileUpload);
    
    return router;
};

module.exports = accountsRoutes;
