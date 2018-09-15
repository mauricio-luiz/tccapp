const Schema = require('mongoose').Schema;

module.exports = () => {
    
    const questao = Schema({        
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
        }
    });

    const exercicio = Schema({
        nome : {
            type : String,
            required : true
        },
        status : {
            type: String,
            required: true
        },
        questoes : [questao],
    });

    const disciplina = Schema({
        nome : {
            type : String,
            required : true
        },
        exercicios : [exercicio]
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
        disciplinas : [disciplina]
    });
    
    return db.model('professor', professor);
}