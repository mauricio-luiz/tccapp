const { Types: { ObjectId } } = require ( 'mongoose' );

module.exports = (app) => {
    const Professor = app.models.professor;
    const SalaController = {
        index(req, res){
            const { usuario } = req.session;
            res.render('sala/index', { usuario } );
        },
        create(req,res){
            const { usuario } = req.session;
            res.render('sala/create', { usuario });
        },
        save(req, res){
            const { sala } = req.body;
            const { _id } = req.session.usuario;
            const { nome, password } = sala;
            
            const set = { $push : { salas : { nome, password, quizzes : [] }}};
            Professor.findByIdAndUpdate(_id, set)
                .then(() => res.redirect('/salas'))
                .catch(() => res.redirect('/salas/create'))
            ;
        }
    };
    return SalaController;
}