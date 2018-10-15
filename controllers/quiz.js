const { Types: { ObjectId } } = require('mongoose');

module.exports = (app) => {    
    const Quiz = app.models.quiz;
    const Professor = app.models.professor;
    const QuizController = {        
        index(req, res){
            const { _id } = req.session.professor;
            const { usuario } = req.session;
            Quiz.find( {professor : _id} ).populate('professor')
                .then((quizzes) => {
                    res.render('quiz/index', { quizzes, usuario });
                }).catch( (e) => { console.log(e); res.redirect('/'); });            
        },
        create(req, res){
            const { usuario } = req.session;
            const { _id } = req.session.professor;
            Professor.findById( _id )
                .then((professor) => {
                    const { disciplinas } = professor;
                    res.render('quiz/create', { disciplinas, usuario });
                }).catch( () => res.redirect('/'));
        },
        save(req, res){
            const exercicio = req.body.exercicio;
            const { email } = req.session.usuario;
            const { nome } = exercicio;
            const disciplinaId = exercicio.identificador;
            
            const documentoExercicio = new Exercicio({ nome: nome, disciplina : disciplinaId, quem : email, questoes : []});
            documentoExercicio.save()
                .then(() => res.redirect(`/quiz/${disciplinaId}/disciplina`))
                .catch((e) => { console.log(e); res.redirect('/') })
            ;            
        },
        show(req, res){
            const exercicioId = req.params.id;
            Exercicio.findOne( { _id : exercicioId } )
            .then((exercicio) => {
                const quantidade_exercicio = exercicio.questoes.length;
                res.render('quiz/show', { exercicio, quantidade_exercicio, questoes : exercicio.questoes});
            }).catch( (e) => { console.log(e); res.redirect('/'); }); 
        },
        edit(req, res){
            const { usuario } = req.session;
            const id  = req.params.id;        
            Quiz.findById(id).populate('professor')
                .then((quiz) => {
                    const { disciplinas } = quiz.professor;
                    res.render('quiz/edit', {quiz, usuario, disciplinas});
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
                    res.redirect(`/quiz/${disciplina}/disciplina`);
                })
                .catch( (e) => { console.log(e); res.redirect('/') });
            ;
        },
        destroy(req, res){
            const { id } = req.params;
            Exercicio.findById(id, (err, exercicio) =>{
                const where = { _id : id };
                Exercicio.deleteOne(where)
                    .then( () =>  res.redirect(`/quiz/${exercicio.disciplina}/disciplina`))
                    .catch( (e) => { console.log(e); res.redirect('/') })
                ;
            });
        }
    };
    return QuizController;
}