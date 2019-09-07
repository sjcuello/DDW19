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
module.exports = router;