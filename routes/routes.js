const express = require('express');
const router = express.Router();
const homeController = require('../controller/homeController.js');
const administratorHandler = require('../handlers/administratorHandler.js');
const Form = require('../controller/formController.js');

const { getAccessibleDays, serveCalendarDay } = require('../controller/calendarController');

router.get('/api/accessible-days', getAccessibleDays); 
router.get('/luker/:day', serveCalendarDay); 

const formController = new Form();

router.get("/api/submissions", administratorHandler.ensureAuthenticated, (req, res) => formController.getSubmissions(req, res));

router.get('/', homeController);

router.post('/luker/:day', (req, res) => {
    const form = new Form(); 
    form.postForm(req, res);
});

module.exports = router;