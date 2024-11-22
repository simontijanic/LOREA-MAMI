const administratorModel = require('../model/administratorModel.js'); 
const bcrypt = require('bcrypt');
const session = require('express-session');

async function loginAdmin(req, res) {
    const name = req.body.name;
    const password = req.body.password;

    console.log('Received body:', req.body);
    console.log('Attempting login with', name, password);

    try {
        const admin = await administratorModel.findOne({ name }); // Find the admin by name

        if (!admin) {
            return res.render('restricted', { message: 'Admin not found. Please try again.' });
        }

        const isPasswordMatch = await bcrypt.compare(password, admin.password);

        if (isPasswordMatch) {
            // Regenerate the session to prevent session fixation
            req.session.regenerate((err) => {
                if (err) {
                    return res.status(500).send('Error logging in');
                }

                req.session.loggedIn = true;

                res.redirect('/dashboard');
            });
        } else {
            res.render('restricted', { message: 'Invalid credentials. Please try again.' });
        }
    } catch (err) {
        console.error('Error during login:', err);
        res.status(500).send('Error logging in');
    }
}


function ensureAuthenticated(req, res, next) {
 if (req.session.loggedIn) {
   return next(); // Proceed to the restricted area
 } else {
    res.redirect('/restricted'); // Redirect to login if not authenticated
 }
}

function logoutAdmin(req, res) {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).send('Error logging out');
    }
    res.redirect('/restricted');
  });
}

module.exports = {
  loginAdmin,
  ensureAuthenticated,
  logoutAdmin,
};
