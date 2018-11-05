const { Types: { ObjectId } } = require ( 'mongoose' );

module.exports = (app) => {
    
    const Professor = app.models.professor;
    const mensagemSucesso = 'Item Cadastrado com sucesso!';
    const mensagemError = 'Ocorreu um erro! Detalhes: ';
    const mensagemAtualiza = 'Item Atualizado com sucesso!';
    const mensagemDelete = 'Item Deletado com sucesso!';

    const DisciplinaController = {
        index(req, res){
            const { _id } = req.session.professor;
            const { usuario } = req.session;   
            Professor.findById( _id )
                .then((professor) => {
                    const { disciplinas } = professor;
                    res.render('disciplina/index', { disciplinas, usuario } );
                }).catch( () => res.redirect('/'));
        },
        create(req,res){
            const { usuario } = req.session;
            res.render('disciplina/create', { usuario });
        },
        edit(req, res){
            const { _id } = req.session.professor;
            const { usuario } = req.session;
            const disciplinaId = req.params.id;
            Professor.findById(_id)
                .then((professor) => {
                    const { disciplinas } = professor;
                    const disciplina = disciplinas.find((dc) => {
                        return dc._id.toString() === disciplinaId;
                    });
                    res.render('disciplina/edit', {disciplina, usuario});
                })
            ;
        },
        update(req,res){
            const disciplinaId = req.params.id;
            const { disciplina } = req.body;
            const { professor } = req.session;
            const where = { _id : professor._id, 'disciplinas._id': disciplinaId };
            const set = { $set: { 'disciplinas.$': disciplina } };
            Professor.update(where, set)
                .then( () => {
                    req.session.sessionFlash = {
                        type: 'success',
                        message: `${mensagemAtualiza}`
                    }
                    res.redirect('/disciplinas');
                })
                .catch( (e) => {
                    req.session.sessionFlash = {
                        type: 'error',
                        message: `${mensagemError} ${e}`
                    }
                    res.redirect('/disciplinas');
                })
            ;
        },
        save(req, res){
            const { disciplina } = req.body;
            const { _id } = req.session.professor;
            const { nome } = disciplina;
            
            const set = { $push : { disciplinas : { nome, exercicios : [] }}};
            Professor.findByIdAndUpdate(_id, set)
                .then(() => {
                    req.session.sessionFlash = {
                        type: 'success',
                        message: `${mensagemSucesso}`
                    }
                    res.redirect('/disciplinas');
                })
                .catch((e) => {
                    req.session.sessionFlash = {
                        type: 'error',
                        message: `${mensagemError} ${e}`
                    }
                    res.redirect('/disciplina/criar');
                })
            ;
        },
        destroy(req, res){
            const disciplinaId = req.params.id;
            const { _id } = req.session.professor;
            const where = { _id };
            const set = {
                $pull: {
                    disciplinas: { _id: ObjectId(disciplinaId) }
                }
            };
            Professor.update(where, set)
                .then( () => { 
                    req.session.sessionFlash = {
                        type: 'success',
                        message: `${mensagemDelete}`
                    }
                    res.redirect('/disciplinas')
                })
                .catch( (e) => { 
                    req.session.sessionFlash = {
                        type: 'error',
                        message: `${mensagemError} ${e}`
                    }
                    res.redirect('/') 
                })
            ;
        }
    };
    return DisciplinaController;
}