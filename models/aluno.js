const Schema = require('mongoose').Schema;

module.exports = () => {

    const caderno = Schema({
        nome : {
            type : String,
            required : true
        }        
    });

    const aluno = Schema({
        usuario : {
            type : Schema.Types.ObjectId,
            required : true
        },
        cadernos : [caderno]
    });
    
    return db.model('aluno', aluno);
}