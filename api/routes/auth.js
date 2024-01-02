const { register, signin } = require('../controllers/auth');
const validateDto = require('../middlewares/validation');
const Joi = require('joi');
const { stringReq, numberReq, string } = require('../middlewares/joiSchema');
const router = require('express').Router();

router.post('/signup', validateDto(Joi.object({ password: stringReq, name: stringReq, phone: numberReq, roleCode: string })), register);
router.post('/signin', validateDto(Joi.object({ password: stringReq, phone: numberReq })), signin);

module.exports = router;
