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
            type : Number,
            required : true
        }
    });

    const resultado = Schema(
        {
            aluno : {
                type : Schema.Types.ObjectId,
                required : true
            },
            caderno : {
                type : Schema.Types.ObjectId,
                required : true
            },
            exercicioReferencia : {
                type : Schema.Types.ObjectId,
                required : true
            },
            exercicio : {
                type : String,
                required : true
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