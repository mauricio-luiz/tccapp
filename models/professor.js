const Schema = require('mongoose').Schema;

module.exports = () => {
    
    const sala = Schema({
        nome : {
            type : String,
            required: true
        },
        codigo : {
            type : String,
            required : true
        },
        alunos : {
            type : Schema.Types.ObjectId,
            ref: 'aluno'
        }
    });

    const disciplina = Schema({
        nome : {
            type : String,
            required : true
        }
    });

    const professor = Schema({
        usuario : {
            type : Schema.Types.ObjectId,
            required : true
        },
        disciplinas : [disciplina],
        salas : [sala]
    });
    
    return db.model('professor', professor);
}