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
 
  static async verifyDevice({ deviceId }) {
    const device = await Device.findOne({ where: { deviceId } });
    if (!device) {
      throw new AppError(404, 'Device not found');
    }

    if (device.isVerified) {
      throw new AppError(400, 'Device already verified');
    }

    device.isVerified = true;
    device.verifiedAt = new Date();
    await device.save();

    return {
      message: `Device ${deviceId} verified successfully`,
      device: {
        id: device.id,
        userId: device.userId,
        deviceId: device.deviceId,
        isVerified: device.isVerified,
        verifiedAt: device.verifiedAt,
      },
    };
  }

  // Optional: Get all users with accounts and balances
  static async getAllCustomers() {
    const users = await User.findAll({
      include: [
        {
          model: Account,
          attributes: ['id', 'balance', 'accountNumber'],
          include: [
            {
              model: Transaction,
              attributes: ['id', 'type', 'amount', 'balanceBefore', 'balanceAfter', 'createdAt'],
            },
          ],
        },
        {
          model: Device,
          attributes: ['deviceId', 'isVerified', 'verifiedAt'],
        },
      ],
    });

    return users;
  }
}

module.exports = AdminService;
