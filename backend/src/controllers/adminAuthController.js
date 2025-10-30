const AdminService = require('../services/authService');
const { AppError } = require('../middleware/errorhandling');

class AdminAuthenticatioController {
 
  static async login(req, res, next) {
    try {
      const { email, password } = req.body;

      const result = await AdminService.login({ email, password });
      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }

 
 

  // GET /admin/customers
  static async getAllCustomers(req, res, next) {
    try {
      const users = await AdminService.getAllCustomers();
      res.status(200).json(users);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = AdminAuthenticatioController;
