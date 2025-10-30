const express = require('express');
const AdminAuthenticationController = require('../controllers/adminAuthController');
const AdminController = require('../controllers/adminController');
const { authMiddleware } = require('../middleware/auth');

const router = express.Router();

router.post('/login', AdminAuthenticationController.login);

router.use(authMiddleware);

router.patch('/device/verify', AdminController.verifyDevice);
router.get('/customers', AdminController.getAllCustomers);
router.get('/customers/:userId', AdminController.getCustomerDetails);
router.get('/transactions',AdminController.getAllTransactions);
router.get('/devices', AdminController.getAllDevices);

module.exports = router;
