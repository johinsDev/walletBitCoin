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

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(morgan('dev')); // log every request to the console
app.use(cookieParser()); // read cookies (needed for auth)
app.use(bodyParser()); // get information from html forms


/***************Mongodb configuratrion********************/
var mongoose = require('mongoose');
var configDB = require('./config/database.js');
//configuration ===============================================================
mongoose.connect(configDB.url); // connect to our database


// middleware set header json content type

app.use(middlewareHeaderJson);


// routes ======================================================================

routes(app, passport); // load our routes and pass in our app and fully configured passport

//launch ======================================================================
app.listen(port);
console.log('The magic happens on port ' + port);

//catch 404 and forward to error handler
app.use(function (req, res, next) {
    res.status(404).json('404', {title: "Sorry, page not found"});
});

app.use(function(err, req, res, next) {
    
    const status = err.status || err.statusCode || 500;
    res.statusCode = status;

    const body = {
      status: status
    };

    // internal server errors
    if (status >= 500) {
      console.error(err.stack);
      body.message = status;
      res.json(body);
      return;
    }

    // client errors
    body.message = err.message;

    if (err.code) body.code = err.code;
    if (err.name) body.name = err.name;
    if (err.type) body.type = err.type;

    res.json(body);
  });

app.use(function (req, res, next) {
    res.status(500).json('404', {title: "Sorry, page not found"});
});
exports = module.exports = app;
