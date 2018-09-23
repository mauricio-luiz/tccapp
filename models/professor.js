const Schema = require('mongoose').Schema;

module.exports = () => {    

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
        disciplinas : [disciplina]
    });
    
    return db.model('professor', professor);
}