const Schema = require('mongoose').Schema;

module.exports = () => {    

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
            required: true,
        },
        status :  {
            type: Boolean,
            default: false
        },
        questoes : {
            type: Array
        }
    });
    
    return db.model('quiz', quiz);
}
