const validateDto = require('../middlewares/validation');
const Joi = require('joi');
const { stringReq, numberReq } = require('../middlewares/joiSchema');
const { getCurrent, getRoles } = require('../controllers/user');
const { verifyToken } = require('../middlewares/verifyToken');
const router = require('express').Router();

router.get('/current', verifyToken, getCurrent);
router.get('/roles', getRoles);

module.exports = router;
