var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema(
    {
        nombre: {
            type: String,
            required: true
        },
        apellido: {
            type: String,
            required: true
        },
        documento:{
            type: String,
            required: true,
            trim: true
        },
        sexo:{
            type: Number,
            required: true
        },
        password: {
            type: String,
            required: true,
            trim: true
        },
        voto: {
            type: Boolean,
            required: true,
            default: false
        }

    }
);
/*
** Metodos de extension para UserSchema
*/
UserSchema.statics.authenticate = function(email, password, callback) {
    User.findOne({ email: email}).exec(
        function(err, user) {
            if (err) {
                return callback(err);
            } else if (!user) {
                var err = new Error("Usuario no encontrado...");
                err.status = 401;
                return callback(err);
            }

            // Si no tengo error y tengo un usuario entonces continuo con la validacion de clave.
            bcrypt.compare(password, user.password, function(err, result){
                if (result == true) {
                    return callback(null, user);
                } else {
                    var err = new Error('Clave ingresada inválida...');
                    err.status = 401;
                    return callback(err);
                }
            });
        }
    );
};

// Capturar el evento de guardado y encriptar la clave...
UserSchema.pre("save", function(next){
    var user = this;
    bcrypt.hash(user.password, 10, function(err, hash){
        if (err) {
            return next(err);
        }
        user.password = hash;
        next();
    })
});

var User = mongoose.model("User", UserSchema);

module.exports = User;