const Schema = require('mongoose').Schema;

module.exports = () => {

    const resposta = Schema({
        questao : {
            type : String,
            required : true
        },
        opcoes : {
            type : Array,
            required : true
        },
        numero : {
            type : Number,
            required : true
        },
        acertou : {
            type : Boolean,
            required: true
        },
        marcada : {
            type : String,
            required : true
        }
    });

    const resultado = Schema(
        {
            aluno : {
                type : Schema.Types.ObjectId,
                required : true
            },
            quiz : {
                type : String,
                required : true
            },
            professor: {
                type : Schema.Types.ObjectId,
                required : true
            },
            nome : {
                type : String,
                required : true,
            }, 
            quiz_nome : {
                type : String,
                require : true
            },
            descricao : {
                type : String
            },
            questoes : [resposta]
        },
        {
            timestamps: { 
                createdAt : 'created_at',
                updatedAt : 'updated_at' 
            }
        }
    );
    
    return db.model('resultado', resultado);
}