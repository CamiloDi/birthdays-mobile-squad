const express = require('express');
const router = express.Router();

const { health, error404, error500 } = require('./comunRoutes');

const birthdays = require('./birthdays');
const employees = require('./employees');

router.use('/birthdays', birthdays);
router.use('/employees', employees);


router.get('/health', health);
router.use('', error404);
router.use(error500);

module.exports = router;
