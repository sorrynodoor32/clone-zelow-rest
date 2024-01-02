const asyncHandler = require('express-async-handler');
const { throwErrorWithStatus } = require('../middlewares/errorHandler');
const db = require('../models/index');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const register = asyncHandler(async (req, res) => {
  //password, phone, name, role = [USER, AGENT]
  //client = urlencode || formData => req.body
  //client = params (?q=abcxyz) => req.query
  //client api/user/:id   =? req.params

  //DTO = Data transfer object
  const { phone, name, password } = req.body;
  //Handle logic
  const response = await db.User.findOrCreate({
    where: { phone },
    defaults: {
      phone,
      password,
      name,
    },
  });

  const userId = response[0]?.id;
  if (userId) {
    const roleCode = ['ROL7'];
    if (req.body?.roleCode) roleCode.push(req.body?.roleCode);
    const roleCodeBulk = roleCode.map((role) => ({ userId, roleCode: role }));
    const updateRole = await db.User_Role.bulkCreate(roleCodeBulk);
    if (!updateRole) await db.User.destroy({ where: { id: userId } });
  }

  return res.json({
    success: response[1],
    mes: response[1] ? 'Your account is created.' : 'PhoneNumber already has exits.',
  });
});

const signin = asyncHandler(async (req, res, next) => {
  const { phone, password } = req.body;
  const user = await db.User.findOne({ where: { phone } });

  if (!user) return throwErrorWithStatus(401, 'User with that phone is not register.', res, next);

  const isMatchingPassword = bcrypt.compareSync(password, user.password);
  if (!isMatchingPassword) return throwErrorWithStatus(401, 'Password is not correct.', res, next);

  const token = jwt.sign({ uid: user.id, roleCode: user.roleCode }, process.env.JWT_SECRET, { expiresIn: '7d' });

  return res.json({
    success: true,
    mes: 'Sign in is successfully.',
    accessToken: token,
  });
});

module.exports = {
  register,
  signin,
};
