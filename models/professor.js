const Schema = require('mongoose').Schema;

module.exports = () => {

    const quiz = Schema({
        questao : {
            type : String,
            required : true
        },
        opcoes : {
            type : Array,
            required : true
        },
        correta : {
            type : String,
            required : true
        },
        status : {
            type: String,
            required: true
        }
    });

    const sala = Schema({
        nome : {
            type : String,
            required : true,
        } ,
        senha : {
            type : String,
            required : true,
        },
        quizzes : [quiz]
    });

    const professor = Schema({
        nome : {
            type : String,
        },
        email : {
            type : String,
            required : true,
            index : { unique : true }
        },
        password : {
            type : String,
            required : true
        },
        salas : [sala]
    });
    
    return db.model('professor', professor);
}