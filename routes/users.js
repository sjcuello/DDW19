var express = require('express');
var router = express.Router();
var User = require('../models/user');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

/* POST para nuevo usuario o login...*/
router.post('/', function(req, res, next){
  //Confirmar los datos del usuario...
  console.log(req.body.password);
  console.log(req.body.passwordconf);
  if (req.body.password != req.body.passwordconf) {
    var err = new Error("Claves no coinciden...");
    err.status = 401;
    return next(err);
  }
  //Detectar si estoy haciendo un login o registrando...
  if (req.body.email && req.body.username && req.body.password && req.body.passwordconf) {
    //Registro...
    var userData = {
      email: req.body.email,
      username: req.body.username,
      password: req.body.password,
      passwordconf: req.body.passwordconf
    }

    User.create(userData, function(err, user){
      if (err) {
        return next(err);
      } else {
        req.session.userId = user._id;
        return res.redirect("/");
      }
    }); 
  } else {
    //Login...
    User.authenticate(req.body.logemail, req.body.logpassword, function(err, user){
      if (err || !user) {
        return next(err);
      } else {
        req.session.userId = user._id;
        return res.redirect("/");
      }
    });
  }
});

module.exports = router;
