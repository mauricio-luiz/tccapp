const Schema = require('mongoose').Schema;

module.exports = () => {    

    const disciplina = Schema({
        nome : {
            type : String,
            required : true
        }
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