const Joi = require('joi');

// ✅ Admin login validation schema
const loginAdminSchema = Joi.object({
  email: Joi.string().email().required().messages({
    'string.email': 'Invalid email format',
    'string.empty': 'Email is required',
  }),

  password: Joi.string().required().messages({
    'string.empty': 'Password is required',
  }),
});

module.exports = { loginAdminSchema };
