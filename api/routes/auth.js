const { register } = require('../controllers/auth');
const validateDto = require('../middlewares/validation');
const Joi = require('joi');
const { stringReq, numberReq } = require('../middlewares/joiSchema');
const router = require('express').Router();

router.post('/register', validateDto(Joi.object({ password: stringReq, name: stringReq, phone: numberReq })), register);

module.exports = router;
