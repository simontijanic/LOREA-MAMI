const express = require(`express`);
const app = express();
const browser = require(`browser-detect`)
const path = require(`path`)
const env = require('dotenv').config();

const routes = require('./routes/routes.js');
const dbHandler = require('./handlers/dbHandler.js');

const PORT = process.env.PORT || 8000;
const dbstring = process.env.DBSTRING || "env problem";

app.set("view engine", "ejs");
app.use(express.static(__dirname + '/public/'));
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.set('views', path.join(__dirname, 'views'));

app.use(routes)

app.listen(PORT, async () => {
    try {
        console.log('Connecting to database...');
        await dbHandler.connect(dbstring); 
        console.log("Server is running on port", PORT);
    } catch (error) {
        console.log("not wwork")
    }
});
