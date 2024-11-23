const express = require('express');
const router = express.Router();
const administratorHandler = require('../handlers/administratorHandler.js');
const formModel = require('../model/formModel.js');

router.get('/restricted', (req, res) => {
    res.render('restricted', { message: req.query.message });
});
  
router.post('/restricted', administratorHandler.loginAdmin);
  
router.get('/dashboard', administratorHandler.ensureAuthenticated, (req, res) => { 
    res.render('dashboard', { page: 'dashboard' });
});

router.get('/dashboard/:number', administratorHandler.ensureAuthenticated, async (req, res) => {
    const lukeNumber = parseInt(req.params.number, 10);
    try {
        const submissions = await formModel.find({ date: lukeNumber });
        res.render('dashboard-luke', {
            number: lukeNumber,
            submissions: submissions,
            page: `luke-${lukeNumber}`
        });
    } catch (err) {
        console.error(err);
        res.status(500).send('Error loading data');
    }
});
  
router.get('/logout', administratorHandler.logoutAdmin);  
  
module.exports = router;
