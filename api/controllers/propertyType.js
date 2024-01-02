const asyncHandler = require('express-async-handler');
const { throwErrorWithStatus } = require('../middlewares/errorHandler');
const db = require('../models/index');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { Op, Sequelize } = require('sequelize');
const redis = require('../config/redis.config');

const createNewPropertyType = asyncHandler(async (req, res) => {
  const { name } = req.body;
  const response = await db.PropertyType.findOrCreate({ where: { name }, defaults: req.body });

  return res.json({
    success: response[1],
    mes: response[1] ? 'Created.' : 'Name property duplicated.',
    propertyType: response[0],
  });
});

const getPropertyTypes = asyncHandler(async (req, res) => {
  const { limit, page, fields, name, sort, ...query } = req.query;

  let options = {};

  //Limit Fields
  if (fields) {
    const attributes = fields.split(',');
    const isExclude = attributes.some((el) => el.startsWith('-'));
    if (isExclude) {
      options.attributes = {
        exclude: attributes.map((el) => el.replace('-', '')),
      };
    } else options.attributes = attributes;
  }

  //Filter by client queries
  if (name) query.name = Sequelize.where(Sequelize.fn('LOWER', Sequelize.col('name')), 'LIKE', `%${name.toLocaleLowerCase()}%`); //Search tu dong regex  %LIKE% => House => ou

  //Sorting
  //order = [[createdAt, ASC],[name, DESC]]
  if (sort) {
    const order = sort.split(',').map((el) => (el.startsWith('-') ? [el.replace('-', ''), 'DESC'] : [el, 'ASC']));

    options.order = order;
  }

  if (!limit) {
    // console.log(options);
    const alreadyGetAll = await redis.get('get-propertyType');
    if (alreadyGetAll)
      return res.json({
        success: true,
        mes: 'Got.',
        propertyTypes: JSON.parse(alreadyGetAll),
      });

    const response = await db.PropertyType.findAll({
      where: query,
      ...options,
    });

    redis.set('get-propertyType', JSON.stringify(response));

    return res.json({
      success: response.length > 0 ? true : false,
      mes: response.length > 0 ? 'Got.' : 'Cannot get propertyTypes.',
      propertyTypes: response,
    });
  }

  //Pagination
  const prevPage = page - 1 > 0 ? page - 1 : 1;
  const offset = (prevPage - 1) * limit;
  if (offset) options.offset = offset;
  options.limit = +limit;

  //   console.log(options);
  const response = await db.PropertyType.findAndCountAll({
    where: query,
    ...options,
  });
  return res.json({
    success: response ? true : false,
    mes: response ? 'Got.' : 'Cannot get propertyTypes.',
    propertyTypes: response,
  });
});

const updatePropertyType = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  if (Object.keys(req.body).length === 0) return throwErrorWithStatus(403, 'Need less 1 argument.', res, next);
  const response = await db.PropertyType.update(req.body, { where: { id } });

  //   console.log(response);
  return res.json({
    success: response[0] > 0 ? true : false,
    mes: response[0] > 0 ? 'Updated.' : 'No data is update.',
  });
});

const removePropertyType = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const response = await db.PropertyType.destroy({ where: { id } });

  console.log(response);
  return res.json({
    success: response > 0 ? true : false,
    mes: response > 0 ? 'Deleted.' : 'No data is delete.',
  });
});

module.exports = {
  createNewPropertyType,
  getPropertyTypes,
  updatePropertyType,
  removePropertyType,
};
