
const AdminService = require('../services/adminService');
const adminService = new AdminService();

class AdminController {
    static async getAllCustomers(req, res, next) {
    try {
      const customers = await adminService.getAllCustomers();
      res.status(200).json({ success: true, data: customers });
    } catch (error) {
      next(error);
    }
  }
   static async verifyDevice(req, res, next) {
    try {
      const { deviceId } = req.body;
      const result = await AdminService.verifyDevice({ deviceId });
      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }
    static async getCustomerDetails(req, res, next) {
    try {
      const { userId } = req.params;
      const user = await adminService.getCustomerDetails(userId);

      res.status(200).json({
        success: true,
        message: 'Customer details retrieved',
        data: user,
      });
    } catch (error) {
      next(error);
    }
  }

    static async getAllTransactions(req, res, next) {
    try {
      const transactions = await adminService.getAllTransactions();
      res.status(200).json({ success: true, data: transactions });
    } catch (error) {
      next(error);
    }
  }

    static async getAllDevices(req, res, next) {
    try {
      const devices = await adminService.getAllDevices();
      res.status(200).json({ success: true, data: devices });
    } catch (error) {
      next(error);
    }
  }

  
}

module.exports = AdminController;
