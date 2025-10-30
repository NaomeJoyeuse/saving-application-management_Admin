
const { User, Account, Transaction, Device } = require('../models');

class AdminService {
  async getAllCustomers() {
    return await User.findAll({
      include: [
        {
          model: Account,
          attributes: ['id', 'accountNumber', 'balance'],
        },
      ],
      attributes: ['id', 'fullName', 'email', 'createdAt'],
    });
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


  async getCustomerDetails(userId) {
    const user = await User.findByPk(userId, {
      include: [
        {
          model: Account,
          attributes: ['id', 'accountNumber', 'balance', 'createdAt'],
          include: [
            {
              model: Transaction,
              attributes: [
                'id',
                'type',
                'amount',
                'balanceBefore',
                'balanceAfter',
                'description',
                'createdAt',
              ],
              order: [['createdAt', 'DESC']],
            },
          ],
        },
        {
          model: Device,
          attributes: ['id', 'deviceId', 'status', 'createdAt'],
        },
      ],
      attributes: ['id', 'fullName', 'email', 'createdAt'],
    });

    if (!user) throw new Error('Customer not found');
    return user;
  }

  async getAllTransactions() {
    return await Transaction.findAll({
      include: [
        {
          model: Account,
          attributes: ['accountNumber'],
          include: [{ model: User, attributes: ['fullName', 'email'] }],
        },
      ],
      order: [['createdAt', 'DESC']],
    });
  }

  async getAllDevices() {
    return await Device.findAll({
      include: [{ model: User, attributes: ['fullName', 'email'] }],
      order: [['createdAt', 'DESC']],
    });
  }

  async verifyDevice(deviceId, status) {
    const device = await Device.findByPk(deviceId);
    if (!device) throw new Error('Device not found');

    device.status = status; // "VERIFIED" or "REJECTED"
    await device.save();

    return device;
  }
}

module.exports = AdminService;
