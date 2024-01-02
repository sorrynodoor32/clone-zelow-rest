const asyncHandler = require('express-async-handler');
const { throwErrorWithStatus } = require('../middlewares/errorHandler');
const db = require('../models/index');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { roles } = require('../utils/constants');

const initRoles = asyncHandler(async (req, res) => {
  const response = await db.Role.bulkCreate(roles);
  return res.json({
    success: Boolean(response),
    mes: response ? 'Inserted' : 'Something went wrong.',
  });
});



module.exports = {
  initRoles,
};
