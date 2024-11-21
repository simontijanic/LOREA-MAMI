const express = require(`express`);
const router = express.Router();
const defaultController = require('../controller/defaultController.js');
const date = require('../controller/date.js');

router.get('/', defaultController);

router.get('/:luker/:day', date);

module.exports = router;