const express = require(`express`);
const app = express();
const browser = require(`browser-detect`)
const path = require(`path`)

const routes = require('./routes/routes.js');

app.set("view engine", "ejs");
app.use(express.static(__dirname + '/public/'));
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.set('views', path.join(__dirname, 'views'));
app.use(express.static('public', {
    index: false, // Prevent directory listing
    dotfiles: 'ignore', // Ignore hidden files
    extensions: ['html', 'htm'], // Allow file extensions
}));


app.use(routes)

app.listen(8000, () => {
    console.log("Listening")
})