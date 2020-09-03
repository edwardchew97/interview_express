const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const db = require('./utility/databaseUtility');
const authRouter = require('./routes/auth/authRouter');
const usersRouter = require('./routes/user/userRouter');
const cors = require('cors')

// Initializing app
var app = express();
db.connectDB();


///////////////////////////////////
//      Utilities Middleware     //
///////////////////////////////////
const corsOptions = {
    origin:[ "http://localhost:3000"] ,
    optionsSuccessStatus: 200,
    credentials:true
}
  
app.use(cors(corsOptions))
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


/////////////////////////////////
//      Registering Routes     //
/////////////////////////////////
app.use('/auth', authRouter);
app.use('/users', usersRouter);


////////////////////////////
//      Error handler     //
////////////////////////////
app.use(function (err, req, res, next) {
    res.status(err.status).send({
        result : 'error',
        status : err.status,
        message: err.message
    })
})


module.exports = app;
