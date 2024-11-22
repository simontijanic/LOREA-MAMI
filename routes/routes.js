const express = require(`express`);
const router = express.Router();
const homeController = require('../controller/homeController.js');
const formController = require('../controller/formController.js');

const { getAccessibleDays, serveCalendarDay } = require('../controller/calendarController');

router.get('/api/accessible-days', getAccessibleDays); // Returns accessible days
router.get('/luker/:day', serveCalendarDay); // Serves calendar content for a specific day

router.get('/', homeController);

router.post('/luker/:day', (req, res) => {
    const form = new formController(); 
    form.postForm(req, res);
});

module.exports = router;