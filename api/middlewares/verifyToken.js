const jwt = require('jsonwebtoken');
const db = require('../models');
const { throwErrorWithStatus } = require('./errorHandler');

const verifyToken = (req, res, next) => {
  const token = req.headers?.authorization?.startsWith('Bearer');
  if (!token) return throwErrorWithStatus(401, 'Credential not provide.', res, next);

  const rawToken = req.headers?.authorization?.split(' ')[1];

  jwt.verify(rawToken, process.env.JWT_SECRET, (err, decode) => {
    if (err) return throwErrorWithStatus(401, 'Credential invalid.', res, next);
    req.user = decode;
    next();
  });
};

const isAgent = (req, res, next) => {
  const { roleCode } = req.user;

  if (roleCode !== 'ROL1' || roleCode !== 'ROL3' || roleCode !== 'ROL5') {
    return throwErrorWithStatus(401, 'You are not permitted.', res, next);
  }
  next();
};

const isAdmin = (req, res, next) => {
  const { roleCode } = req.user;

  if (roleCode !== 'ROL1') {
    return throwErrorWithStatus(401, 'You are not permitted.', res, next);
  }
  next();
};

const isOwner = (req, res, next) => {
  const { roleCode } = req.user;

  if (roleCode !== 'ROL1' || roleCode !== 'ROL3') {
    return throwErrorWithStatus(401, 'You are not permitted.', res, next);
  }
  next();
};

module.exports = {
  verifyToken,
  isAgent,
  isAdmin,
  isOwner,
};
