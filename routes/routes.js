const express = require(`express`);
const router = express.Router();
const homeController = require('../controller/homeController.js');

const { getAccessibleDays, serveCalendarDay } = require('../controller/calendarController');

router.get('/api/accessible-days', getAccessibleDays); // Returns accessible days
router.get('/luker/:day', serveCalendarDay); // Serves calendar content for a specific day

router.get('/', homeController);


module.exports = router;