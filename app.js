const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors= require ("cors");
const mongoose = require("mongoose")

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users_router');
const paintingsRouter = require('./routes/paintings_router');

const app = express();

mongoose
  .connect("mongodb://localhost:27017/project3",
    {useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then( (x) => 
      console.log(`Connected to Mongo! Database name: "${x.connections[0].name}`)
      )
  .catch( (err) => console.log(err));


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(cors({
  credentials: true,
  origin: ["http://localhost:3000"]
}))

app.use("/users", usersRouter)
app.use("/paintings", paintingsRouter)

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
