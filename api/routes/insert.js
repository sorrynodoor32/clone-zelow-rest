const { initRoles } = require('../controllers/insert');

const router = require('express').Router();

router.post('/roles', initRoles);

module.exports = router;
