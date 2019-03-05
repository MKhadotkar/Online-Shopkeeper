var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var cors = require('cors')
// database connectivity code
var mongojs = require('mongojs')
var db = mongojs("localhost:27017/shopkeeper", ["users"])


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.use(cors())
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);




app.post("/skregistration",function(req,res,next){
  console.log("skregistration  += ",req.body);
  var first_name = req.body.first_name;
  var last_name = req.body.last_name;
  var shop_name = req.body.shop_name;
  var email = req.body.email;
  var password = req.body.password;
  var reenter_password = req.body.reenter_password;

  db.users.find({email:email}).toArray(function(err,resss){
    console.log("-------------",resss);
    if (resss.length === 0) {
      db.users.insert({user_is:"shopkeeper",first_name:first_name,last_name:last_name,shop_name:shop_name,email:email,password:password},function(err,result){
        console.log("data insert successfully");
        res.send({status:true,message:"Registration successfully"})
      })
    }else {
      res.send({status:false,message:"Email already exist"})

    }
  })
})

app.post("/custregistration",function(req,res,next){
  console.log("custregistration  += ",req.body);
  var first_name = req.body.first_name;
  var last_name = req.body.last_name;
  var address = req.body.address;
  var email = req.body.email;
  var password = req.body.password;
  var reenter_password = req.body.reenter_password;

  db.users.find({email:email}).toArray(function(err,resss){
    console.log("-------------",resss);
    if (resss.length === 0) {
      db.users.insert({user_is:"customer",first_name:first_name,last_name:last_name,address:address,email:email,password:password},function(err,result){
        console.log("data insert successfully");
        res.send({status:true,message:"Registration successfully"})
      })
    }else {
      res.send({status:false,message:"Email already exist"})

    }
  })
})

app.post("/userlogin",function(req,res,next){
  console.log("-- userlogin -- ",req.body);
    var email = req.body.email;
    var password = req.body.password;
      db.users.find({email:email,password:password}).toArray(function(err,resss){
        console.log(" login response db ----",resss);
        if (resss.length == 0) {
            res.send({status:false,message:"invalid username or password"})
        }else {
          res.send({status:true,message:"login successfully",data:resss[0].user_is})
        }


    })
})





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

app.listen(3333,function(req,res){
  console.log("server start 3333");
})
