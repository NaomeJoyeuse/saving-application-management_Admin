const express = require('express');
const AdminAuthenticationController = require('../controllers/adminAuthController');
const AdminController = require('../controllers/adminController');
const { authMiddleware } = require('../middleware/auth');

const router = express.Router();
/**
 * @swagger
 * tags:
 *   name: Admin
 *   description: Admin operations
 */

/**
 * @swagger
 * /admin/login:
 *   post:
 *     summary: Admin login
 *     tags: [Admin]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login successful, returns JWT token
 *       401:
 *         description: Invalid email or password
 */
router.post('/login', AdminAuthenticationController.login);

router.use(authMiddleware);

/**
 * @swagger
 * /admin/device/verify:
 *   patch:
 *     summary: Verify a customer device
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               deviceId:
 *                 type: string
 *                 example: DEVICE12345
 *     responses:
 *       200:
 *         description: Device verified successfully
 *       400:
 *         description: Device already verified
 *       404:
 *         description: Device not found
 */
router.patch('/device/verify', AdminController.verifyDevice);
/**
 * @swagger
 * /admin/customers:
 *   get:
 *     summary: Get all customers with accounts and balances
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of all customers
 */
router.get('/customers', AdminController.getAllCustomers);

/**
 * @swagger
 * /admin/customers/{userId}:
 *   get:
 *     summary: Get details of a single customer
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: userId
 *         schema:
 *           type: string
 *         required: true
 *         description: Customer UUID
 *     responses:
 *       200:
 *         description: Customer details including account and devices
 *       404:
 *         description: Customer not found
 */

router.get('/customers/:userId', AdminController.getCustomerDetails);

/**
 * @swagger
 * /admin/transactions:
 *   get:
 *     summary: Get all transactions for all accounts
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 20
 *         description: Number of transactions to return
 *       - in: query
 *         name: offset
 *         schema:
 *           type: integer
 *           default: 0
 *         description: Pagination offset
 *     responses:
 *       200:
 *         description: List of transactions
 */

router.get('/transactions',AdminController.getAllTransactions);

/**
 * @swagger
 * /admin/devices:
 *   get:
 *     summary: Get all customer devices
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of devices including verification status
 */

router.get('/devices', AdminController.getAllDevices);


module.exports = router;
