import express from 'express';
import constants from './config/constants';
import cookieParser  from 'cookie-parser';
import bodyParser  from 'body-parser';
import routes from './config/routes.js';
import middlewareHeaderJson from './app/middlewares/sendHeaderJson';
import morgan from 'morgan';
import passport from 'passport';
import './config/auth';

const app = express();
const port = process.env.PORT || 8042;

/***************Init Passport********************/
app.use(passport.initialize());
app.use(express.static('public'))
app.use(bodyParser.json({limit: '50mb'}));
app.use(morgan('dev')); // log every request to the console
app.use(cookieParser()); // read cookies (needed for auth)

/***************Mongodb configuratrion********************/
var mongoose = require('mongoose');
var configDB = require('./config/database.js');
//configuration ===============================================================
mongoose.connect(configDB.url); // connect to our database


// routes ======================================================================

routes(app, passport); // load our routes and pass in our app and fully configured passport

//launch ======================================================================
app.listen(port);
console.log('The magic happens on port ' + port);

//catch 404 and forward to error handler
app.use(function (req, res, next) {
    res.status(404).json('404', {title: "Sorry, page not found"});
});

app.use(function (req, res, next) {
    res.status(500).json('404', {title: "Sorry, page not found"});
});
exports = module.exports = app;
