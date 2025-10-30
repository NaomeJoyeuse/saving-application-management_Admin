const { Admin, Device, User, Account, Transaction } = require('../models');
const { generateToken } = require('../utils/jwtToken');
const { comparePassword } = require('../utils/passwordEncryption');
const { AppError } = require('../middleware/errorhandling');

class AdminService {
 
   static async login({ email, password }) {
    const admin = await Admin.findOne({ where: { email } });
    if (!admin) {
      throw new AppError(401, 'Invalid email or password');
    }

   
    if (admin.password !== password) {
      throw new AppError(401, 'Invalid email or password');
    }

    const token = generateToken(admin.id, admin.email);

    return {
      token,
      admin: {
        id: admin.id,
        email: admin.email,
        fullName: admin.fullName,
        createdAt: admin.createdAt,
      },
    };
  }
 
  
}

module.exports = AdminService;
