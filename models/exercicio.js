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
        disciplina : {
            type : Schema.Types.ObjectId,
            required: true
        },
        quem : {
            type : String,
            required : true
        },
        questoes : [questao],
    });
    
    return db.model('exercicio', exercicio);
}
