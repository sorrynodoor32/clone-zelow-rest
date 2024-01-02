const asyncHandler = require('express-async-handler');
const { throwErrorWithStatus } = require('../middlewares/errorHandler');
const db = require('../models/index');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const getCurrent = asyncHandler(async (req, res) => {
  const { uid } = req.user;

  const response = await db.User.findByPk(uid, {
    attributes: {
      exclude: ['password'],
    },
    include: [
      {
        model: db.User_Role,
        as: 'userRoles',
        attributes: ['roleCode'],
        include: [
          {
            model: db.Role,
            as: 'roleName',
            attributes: ['value'],
          },
        ],
      },
    ],
  });

  return res.json({
    success: Boolean(response),
    mes: response ? 'Got.' : 'Cannot get user',
    currentUser: response,
  });
});

const getRoles = asyncHandler(async (req, res) => {
  const response = await db.Role.findAll({
    attributes: ['code', 'value'],
  });

  return res.json({
    success: Boolean(response),
    mes: response ? 'Got.' : 'Cannot get roles',
    roles: response,
  });
});

module.exports = {
  getCurrent,
  getRoles,
};
