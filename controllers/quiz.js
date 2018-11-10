const { Types: { ObjectId } } = require('mongoose');

module.exports = (app) => {    
    const Quiz = app.models.quiz;
    const Professor = app.models.professor;

    const mensagemSucesso = 'Item Cadastrado com sucesso!';
    const mensagemError = 'Ocorreu um erro! Detalhes: ';
    const mensagemAtualiza = 'Item Atualizado com sucesso!';
    const mensagemDelete = 'Item Deletado com sucesso!';

    const QuizController = {        
        index(req, res){
            const { _id } = req.session.professor;
            const { usuario } = req.session;
            Quiz.find( {professor : _id} ).populate('professor')
                .then((quizzes) => {
                    res.render('quiz/index', { quizzes, usuario });
                }).catch( (e) => { console.log(e); res.redirect('/'); });            
        },       
        save(req, res){
            const { usuario } = req.session;
            const { _id } = req.session.professor;
            Professor.findById( _id )
                .then((professor) => {
                    const { disciplinas } = professor;
                    const set = { nome : 'Quiz sem Título', disciplina : null, professor : professor._id, status : false, questoes : [] };
                    const quiz = new Quiz(set);
                    quiz.save(function (err, newQuiz) {
                        if (err) {
                            res.json({ status: "error", message: `Ocorreu um erro ao salvar questao ${err}` });
                            return
                        }
                        
                        res.json({ status: "sucesso", message: `Quiz salvo com sucesso`, quiz: newQuiz._id });
                    });
                }).catch( () => res.redirect('/'));            
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
            const id = req.params.id;
            const {quiz} = req.body;
            const {nome, disciplina} = quiz;
            const where = { _id : id};
            const set = { $set: { nome : nome, disciplina : disciplina } };
            Quiz.updateOne(where, set)
                .then( () => {
                    req.session.sessionFlash = {
                        type: 'success',
                        message: `${mensagemAtualiza}`
                    };
                    res.redirect(`/quizzes`);
                })
                .catch( (e) => { console.log(e); res.redirect('/') });
            ;
        },
        destroy(req, res){
            const { id } = req.params;
            Quiz.findById(id, (err, quiz) =>{
                const where = { _id : id };
                Quiz.deleteOne(where)
                    .then( () =>  res.redirect(`/quizzes`))
                    .catch( (e) => { console.log(e); res.redirect('/') })
                ;
            });
        },
        duplicate(req, res){
            const { usuario } = req.session;
            const id  = req.params.id;        
            Quiz.findById(id).populate('professor')
                .then((quiz) => {                    
                    const set = { nome : `${quiz.nome} - cópia`, disciplina : quiz.disciplina, professor : quiz.professor._id, status : false, questoes : quiz.questoes };
                    const quizClone = new Quiz(set);
                    quizClone.save(function (err, newQuiz) {
                        if (err) {
                            res.json({ status: "error", message: `Ocorreu um erro ao salvar questao ${err}` });
                            return
                        }
                        
                        req.session.sessionFlash = {
                            type: 'success',
                            message: `${mensagemSucesso}`
                        };
                        res.redirect(`/quizzes`);
                    });
                })
            ;            
        }
    };
    return QuizController;
}