const express = require('express');
const router = express.Router();
const administratorHandler = require('../handlers/administratorHandler.js');

// Route for GET request to '/restricted'
router.get('/restricted', (req, res) => {
    res.render('restricted', { message: req.query.message });  // Pass message through query params
});
  
// Route for POST request to '/restricted'
router.post('/restricted', administratorHandler.loginAdmin);  // This should handle the login
  
router.get('/dashboard', administratorHandler.ensureAuthenticated, (req, res) => { 
   res.render('dashboard');  // The page after successful login
});
  
router.get('/logout', administratorHandler.logoutAdmin);  
  
module.exports = router;
