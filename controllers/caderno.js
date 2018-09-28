const { Types: { ObjectId } } = require ( 'mongoose' );
module.exports = (app) => {
    const Aluno = app.models.aluno;
    const CadernoController = {
        index(req, res){
            const { _id } = req.session.aluno;
            console.log(req.session);
            Aluno.findById( _id )
                .then((aluno) => {
                    const { cadernos } = aluno;
                    res.render('caderno/index', { cadernos } );
                }).catch( () => res.redirect('/'));            
        },
        create(req,res){
            const { usuario } = req.session;
            res.render('caderno/create', { usuario });
        },
        show(req, res){
            res.render('caderno/show');
        },
        edit(req, res){
            const { _id } = req.session.aluno;
            const cadernoId = req.params.id;
            Aluno.findById(_id)
                .then((aluno) => {
                    const { cadernos } = aluno;
                    const caderno = cadernos.find((cd) => {
                        return cd._id.toString() === cadernoId;
                    });
                    res.render('caderno/edit', {caderno});
                })
            ;
        },
        update(req,res){
            const cadernoId = req.params.id;
            const { caderno } = req.body;
            const { aluno } = req.session;
            const where = { _id : aluno._id, 'cadernos._id': cadernoId };
            const set = { $set: { 'cadernos.$': caderno } };
            Aluno.update(where, set)
                .then( () => res.redirect('/cadernos'))
                .catch( () => res.redirect('/'))
            ;
        },
        save(req, res){
            const { caderno } = req.body;
            const { _id } = req.session.aluno;
            const { nome } = caderno;
            
            const set = { $push : { cadernos : { nome }}};
            Aluno.findByIdAndUpdate(_id, set)
                .then(() => res.redirect('/cadernos'))
                .catch(() => res.redirect('/carderno/create'))
            ;
        },
        destroy(req, res){
            const cadernoId = req.params.id;
            const { _id } = req.session.aluno;
            const where = { _id };
            const set = {
                $pull: {
                    cadernos: { _id: ObjectId(cadernoId) }
                }
            };
            Aluno.update(where, set)
                .then( () => res.redirect('/cadernos'))
                .catch( () => res.redirect('/') )
            ;
        }
    };
    return CadernoController;
}