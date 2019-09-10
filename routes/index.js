var express = require('express');
var router = express.Router();
var request = require("request");
var createError = require("http-errors");
var requiresLogin = require("./requiresLogin");

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Express' });
});

/* GET login */
router.get('/login', function(req, res, next) {
    res.render('login', { title: "Login" });
});

router.get('/votacion', function(req, res, next) {
    console.log('req: ',req.session);
    res.render('votacion', {title: "Login" , user: req.user });
});

module.exports = router;