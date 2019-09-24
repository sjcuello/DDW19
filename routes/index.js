var express = require('express');
var router = express.Router();
var request = require("request");
var createError = require("http-errors");
var Candidate = require("../models/candidate");

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Express' });
});

/* GET login */
router.get('/login', function(req, res, next) {
    res.render('login', { title: "Login" });
});

router.get('/votacion', function(req, res, next) {
    Candidate.find((err, candidatos) => {
        if (err) {
            return res.status(500).send(err);
        } else {
            res.status(200).render('votacion', { title: "Votacion", candidatos: candidatos });
        }
    });

    //res.render('votacion', { title: "votacion", candidates: [] });
});

/* GET candidatos */
router.get('/candidatos', function(req, res, next) {
    Candidate.find((err, candidatos) => {
        if (err) {
            return res.status(500).send(err);
        } else {
            res.status(200).render('candidatos', { title: "Candidatos", candidatos: candidatos });
        }
    });
});

router.get('/statistics', function(req, res, next) {
    res.status(200).render('statistics', { title: "Estadisticas" });
});

module.exports = router;