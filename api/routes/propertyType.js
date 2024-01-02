const router = require('express').Router();
const validateDto = require('../middlewares/validation');
const Joi = require('joi');
const { stringReq, string } = require('../middlewares/joiSchema');
const { verifyToken, isAdmin } = require('../middlewares/verifyToken');
const { createNewPropertyType, getPropertyTypes, updatePropertyType, removePropertyType } = require('../controllers/propertyType');
const rateLimiter = require('../middlewares/rateLimiter');

router.use(rateLimiter);
router.post('/', [verifyToken, isAdmin], validateDto(Joi.object({ name: stringReq, description: stringReq, image: stringReq })), createNewPropertyType);
router.get('/', getPropertyTypes);
router.patch('/:id', [verifyToken, isAdmin], validateDto(Joi.object({ name: string, description: string, image: string })), updatePropertyType);
router.delete('/:id', [verifyToken, isAdmin], removePropertyType);

module.exports = router;
