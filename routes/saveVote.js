var express = require('express');
var router = express.Router();
var Candidate = require('../models/candidate');
var User = require('../models/user');

router.post("/", function(req, res, next) {

    //console.log('route/saveVote - req.body: ', req.body);

    User.actualizaEstado(req.session.userId, function(err) {
        if (err) {
            console.log("error actualizarEstado: " + err);
        }
    });

    Candidate.countVote(req.body.cand, function(err) {
        if (err) {
            console.log("error countVote: " + err);
            return next(err);
        } else {
            console.log('voto contado...');
        }
    });
    res.render("finish", { title: "Votacion finalizada" });
    setTimeout(() => {
        return res.render("index", { title: "Votacion" });
    }, 3000);
    // esta opcion sola si funciona return res.render("finish", { title: "Votacion finalizada" });
});

module.exports = router;