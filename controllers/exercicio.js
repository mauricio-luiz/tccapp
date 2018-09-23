const { Types: { ObjectId } } = require('mongoose');

module.exports = (app) => {    
    const Exercicio = app.models.exercicio;
    const ExercicioController = {        
        index(req, res){
            const disciplinaId = req.params.id;
            Exercicio.find( { disciplina : disciplinaId } )
                .then((exercicios) => {
                    const menu_extra = [{nome : 'Criar Exercicios', url : `/exercicio/${disciplinaId}/criar`}];
                    res.render('exercicio/index', { exercicios, menu_extra });
                }).catch( (e) => { console.log(e); res.redirect('/'); });            
        },
        create(req, res){
            const usuario = req.session;
            const disciplinaId = req.params.id;
            res.render('exercicio/create', {disciplinaId});
        },
        save(req, res){
            const exercicio = req.body.exercicio;
            const { email } = req.session.usuario;
            const { nome } = exercicio;
            const disciplinaId = exercicio.identificador;
            
            const documentoExercicio = new Exercicio({ nome: nome, disciplina : disciplinaId, quem : email, questoes : []});
            documentoExercicio.save()
                .then(() => res.redirect(`/exercicios/${disciplinaId}/disciplina`))
                .catch((e) => { console.log(e); res.redirect('/') })
            ;            
        },
        show(req, res){
            const exercicioId = req.params.id;
            Exercicio.findOne( { _id : exercicioId } )
            .then((exercicio) => {
                const quantidade_exercicio = exercicio.questoes.length;
                res.render('exercicio/show', { exercicio, quantidade_exercicio, questoes : exercicio.questoes});
            }).catch( (e) => { console.log(e); res.redirect('/'); }); 
        },
        edit(req, res){
            const id  = req.params.id;        
            Exercicio.findById(id)
                .then((exercicio) => {
                    res.render('exercicio/edit', {exercicio});
                })
            ;
        },
        update(req, res){
            const exercicioId = req.params.id;
            const {exercicio} = req.body;
            const {nome, disciplina} = exercicio;
            const where = { _id : exercicioId};
            const set = { $set: { nome : nome } };
            Exercicio.updateOne(where, set)
                .then( () => {
                    res.redirect(`/exercicios/${disciplina}/disciplina`);
                })
                .catch( (e) => { console.log(e); res.redirect('/') });
            ;
        },
        destroy(req, res){
            const { id } = req.params;
            Exercicio.findById(id, (err, exercicio) =>{
                const where = { _id : id };
                Exercicio.deleteOne(where)
                    .then( () =>  res.redirect(`/exercicios/${exercicio.disciplina}/disciplina`))
                    .catch( (e) => { console.log(e); res.redirect('/') })
                ;
            });
        }
    };
    return ExercicioController;
}