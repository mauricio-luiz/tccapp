const Schema = require('mongoose').Schema;

module.exports = () => {
    
    const questao = Schema({
        enunciado : {
            type : String,
            required : true
        },
        resposta : {
            type : String,
            required: true,
        },
        opcoes : {
            type : Array
        }
    });

    const quiz = Schema({
        nome : {
            type : String,
            required : true
        },
        professor : {
            type : Schema.Types.ObjectId,
            required: true,
            ref: 'professor'
        },
        disciplina: {
            type : Schema.Types.ObjectId,            
        },
        questoes : [questao]
    });
    
    return db.model('quiz', quiz);
}
