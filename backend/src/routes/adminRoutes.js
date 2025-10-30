const express = require('express');
const AdminController = require('../controllers/adminAuthController');
const { authMiddleware } = require('../middleware/auth');

const router = express.Router();

router.post('/login', AdminController.login);

router.use(authMiddleware);

router.patch('/device/verify', AdminController.verifyDevice);

router.get('/customers', AdminController.getAllCustomers);

module.exports = router;
