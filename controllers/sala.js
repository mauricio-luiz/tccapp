const { Types: { ObjectId } } = require ( 'mongoose' );

module.exports = (app) => {
    const Professor = app.models.professor;
    const SalaController = {
        index(req, res){
            const { _id } = req.session.usuario;
            Professor.findById( _id )
                .then((professor) => {
                    const { salas } = professor;
                    res.render('sala/index', { salas } );
                }).catch( () => res.redirect('/'));            
        },
        create(req,res){
            const { usuario } = req.session;
            res.render('sala/create', { usuario });
        },
        edit(req, res){
            const { _id } = req.session.usuario;
            const salaId = req.params.id;
            Professor.findById(_id)
                .then((professor) => {
                    const { salas } = professor;
                    const sala = salas.find((sl) => {
                        return sl._id.toString() === salaId;
                    });
                    res.render('sala/edit', {sala});
                })
            ;
        },
        update(req,res){
            const salaId = req.params.id;
            const { sala } = req.body;
            const { usuario } = req.session;
            const where = { _id : usuario._id, 'salas._id': salaId };
            const set = { $set: { 'salas.$': sala } };
            Professor.update(where, set)
                .then( () => res.redirect('/salas'))
                .catch( () => res.redirect('/'))
            ;
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
        },
        destroy(req, res){
            const salaId = req.params.id;
            const { _id } = req.session.usuario;
            const where = { _id };
            const set = {
                $pull: {
                    salas: { _id: ObjectId(salaId) }
                }
            };
            Professor.update(where, set)
                .then( () => res.redirect('/salas'))
                .catch( () => res.redirect('/') )
            ;
        }
    };
    return SalaController;
}