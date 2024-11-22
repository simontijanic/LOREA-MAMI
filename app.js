const express = require(`express`);
const app = express();
const browser = require(`browser-detect`)
const path = require(`path`)
const env = require('dotenv').config();
const session = require('express-session');
const mongoose = require('mongoose'); // Import mongoose

const routes = require('./routes/routes.js');
const adminRoutes = require(`./routes/adminRoutes.js`)
const dbHandler = require('./handlers/dbHandler.js');

const PORT = process.env.PORT || 8000;
const dbstring = process.env.DBSTRING || "env problem";


app.set("view engine", "ejs");
app.use(express.static(__dirname + '/public/'));
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.set('views', path.join(__dirname, 'views'));

app.use(session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false } // For development. Set to true for HTTPS in production
  }));

app.use(routes)
app.use(adminRoutes)

app.listen(process.env.PORT || 8000, async () => {
    try {
      console.log('Connecting to database...');
      await dbHandler.connect(process.env.DBSTRING); // Ensure the database connection is correct
  
    //  console.log('Creating admin user...');
    //  const admin = new Administrator({
    //      name: 'admin',
    //      password: hashedPassword,  // Store the hashed password
    //    });
  
    //    await admin.save(); // Save the new admin user to the database
    //    console.log('Admin user created successfully');
    //
    //    mongoose.connection.close(); // Close the connection after the operation

  
      console.log("Server is running on port", process.env.PORT || 8000);
    } catch (error) {
      console.error("Error creating admin user:", error); // Log the error for better debugging
    }
  });
  