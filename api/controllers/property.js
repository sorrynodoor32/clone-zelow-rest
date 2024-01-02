const asyncHandler = require('express-async-handler');
const { throwErrorWithStatus } = require('../middlewares/errorHandler');
const db = require('../models/index');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// const createProperty = asyncHandler(async (req, res) => {
//   // const response = await db.
// });

