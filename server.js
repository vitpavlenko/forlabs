const path = require('path');
const express = require('express');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const session = require('express-session');

const app = express();

const config = require('./config');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(require('express-session')({
    secret: config.secret,
    resave: false,
    saveUninitialized: false
}));
app.use(express.static('public'));
app.use(express.static('labs'));


const login = require('./routes/login');
const home = require('./routes/index');
const logout = require('./routes/logout');
const amo = require('./routes/amo');
const web = require('./routes/web');

app.use('/', home);
app.use('/login', login);
app.use('/logout', logout);
app.use('/amo', amo);
app.use('/web', web);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

app.listen(config.port, () => {
    console.log(`server is running on port ${config.port}`);
});
