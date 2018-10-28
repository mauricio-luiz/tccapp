const Schema = require('mongoose').Schema;

module.exports = () => {

    const resposta = Schema({
        aluno : {
            type : String,
            required : true
        },
        questoes : {
            type: [Schema.Types.Mixed]
        }
    });

    const estatistica = Schema(
        {            
            professor: {
                type : Schema.Types.ObjectId,
                required : true
            },
            sala: {
                type: String,
                required: true
            },
            quiz : {
                type : String,
                required: true
            },
            respostas : [resposta]
        },
        {
            timestamps: { 
                createdAt : 'created_at',
                updatedAt : 'updated_at' 
            }
        }
    );
    
    return db.model('estatistica', estatistica);
}