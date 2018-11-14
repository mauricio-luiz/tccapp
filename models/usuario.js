const Schema = require('mongoose').Schema;

module.exports = () => {

    const usuario = Schema({
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
        tipo : {
            type : String,
            required : true
        },
        token : {
            type: String            
        }
    });
    
    return db.model('usuario', usuario);
}