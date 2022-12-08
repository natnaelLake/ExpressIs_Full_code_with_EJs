var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mongoose = require('mongoose');
const mongoClient = require('mongodb').mongoCleint;
const assert = require('assert');
const url = 'mongodb://localhost:27017/dayOne';
const Store = require('./models/Store');


const db = mongoose.connect('mongodb+srv://natnael:nati1212@naticluster.gbkr5zo.mongodb.net/?retryWrites=true&w=majority',{
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => console.log('mongo connected'))
   .catch(err => console.log(err));
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


var app = express();

// view engine setup
app.set('views', path.resolve(__dirname, 'views'));
app.set('view engine', 'ejs');

// app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.resolve(__dirname, 'public')));

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
