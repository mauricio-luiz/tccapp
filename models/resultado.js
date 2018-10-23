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
            sala : {
                type : Schema.Types.ObjectId,
                required : true
            },
            quiz : {
                type : Schema.Types.ObjectId,
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