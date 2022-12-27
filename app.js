var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mongoose = require('mongoose');
const mongoClient = require('mongodb').mongoCleint;
const assert = require('assert');
const url = 'mongodb://localhost:27017/natnael';
const Store = require('./models/Store');
const imageFile = require('./models/Image');
const passport = require('passport');
const session = require('express-session');
const flash = require('connect-flash');
require('./config/passport')(passport)
var methodOverride = require('method-override')

const db = mongoose.connect(url);
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const loginRouter = require('./routes/login');
const homeRouter = require('./routes/home');
const aboutRouter = require('./routes/about')
const dataRouter = require('./routes/data');
const userRouter = require('./routes/users')
const dashRouter = require('./routes/admin/dash');
const candRouter = require('./routes/admin/can')
const jobRouter = require('./routes/admin/jobs');
const orderRouter = require('./routes/admin/orders');
const reportRouter = require('./routes/admin/orders');
const deltRouter = require('./routes/admin/delete')
const imgRouter = require('./routes/admin/image');
const recImage = require('./routes/admin/receiveImage');
const LogRouter = require('./routes/LoginPage');
const regRouter = require('./routes/Register')
const upRouter = require('./routes/admin/Update')
const usRouter = require('./routes/User/canPage')
const addUsRouter = require('./routes/User/DataPage')
const logoutRouter = require('./routes/logout');
const upCardRouter = require('./routes/admin/updateCard');
const up =  require("./routes/admin/updateCard")
const updRouter = require('./routes/')


var app = express();
// view engine setup
app.set('views', path.resolve(__dirname, 'views'));
app.set('view engine', 'ejs');
mongoose.set('strictQuery', false)


 
// override with POST having ?_method=DELETE
app.use(methodOverride('_method'))
// app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.resolve(__dirname, 'public')));
app.use(session({
  secret: 'secret',
  resave: true,
  saveUninitialized: true,
}));
app.use(passport.initialize());
app.use(passport.session());


app.use(flash());

app.use((req, res, next) => {
  res.locals.success_msg = req.flash('success_msg')
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');

  next();

})


// app.use(session({
//   secret: 'dhakfhieufhjdahfehariehfdsahfih',
//   resave: false,
//   saveUninitialized: false
// }));
// app.use(flash);
// app.use(passport.initialize());
// app.use(passport.session())


app.use('/',indexRouter)
app.use('/login', loginRouter);
app.use('/home', homeRouter)
app.use('/about',aboutRouter)
app.use('/data', dataRouter);
app.use('/users', userRouter);
app.use('/dash', dashRouter);
app.use('/can', candRouter);
app.use('/jobs', jobRouter);
app.use('/order', orderRouter);
app.use('/report', reportRouter);
app.use('/delete/', deltRouter);
app.use('/add', imgRouter);
app.use('/image', recImage);
app.use('/mainLogin', LogRouter);
app.use('/register',regRouter)
app.use('/update',upRouter)
app.use('/addData', addUsRouter)
app.use('/userData',usRouter)
app.use('/logout',logoutRouter)
app.use('/updateCard',up)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});


// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
