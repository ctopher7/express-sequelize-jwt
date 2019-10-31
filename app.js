let express = require('express');
let path = require('path');
let cookieParser = require('cookie-parser');

// let indexRouter = require('./routes/index');
let userRouter = require('./routes/user');

let bodyParser = require('body-parser')
let app = express();
let cors = require('cors')
let compression = require('compression')
let helmet = require('helmet')
let {headerApi} = require('./utils/header')

let nodeEnv = process.env.NODE_ENV;
if (nodeEnv === 'development') {
  var envPath = path.resolve('.env.development');
} else if (nodeEnv === 'test') {
  var envPath = path.resolve('.env.test');
} else if (nodeEnv === 'production') {
  var envPath = path.resolve('.env.production');
}
require('dotenv').config({path: envPath})

app.disable('x-powered-by'); 

app.use(cors())
app.use(compression())
app.use(helmet())
app.all('*',headerApi)
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.disable('x-powered-by'); 

// app.use('/', indexRouter);
app.use('/user', userRouter);

app.use(function(req, res, next) {
  res.sendStatus(404)
});

app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.sendStatus(err.status || 500);
});

module.exports = app;
