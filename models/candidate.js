var mongoose = require('mongoose');

var CandidateSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true
    },
    apellido: {
        type: String,
        required: true
    },
    partido: {
        type: String,
        required: true,
        trim: true
    },
    sexo: {
        type: Number,
        required: true
    },
    cantVotos: {
        type: Number
    }
});

CandidateSchema.statics.countVote = function(id, callback) {
    Candidate.updateOne({ _id: id }, {
            $inc: { cantVotos: 1 }
        },
        (err) => {
            if (err) {
                return callback(err);
            }
        });
};

var Candidate = mongoose.model("Candidate", CandidateSchema);

module.exports = Candidate;