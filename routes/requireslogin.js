// middleware - capa intermedia que se ejecuta cuando?: en el medio del request...

var requiresLogin = function(req, res, next) {
    console.log("middleware requiresLogin...");
    if (req.session && req.session.userId) {
        return next();
    } else {
        var err = new Error("Tiene que estar logueado para ver esta página...");
        err.status = 401;
        return next(err);
        //res.redirect('/login');
    }
}

module.exports = requiresLogin;