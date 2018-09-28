module.exports = (app) => {
    const Exercicio = app.models.exercicio;
    const SalaController = {
        professor(req, res){
            const { id } = req.params;
            const usuario = req.session.usuario;
            Exercicio.findById(id)
                .then((exercicio) => {

                    exercicio.status = true;
                    exercicio.save( (err) => {
                        if(err) return handleError(err);
                        res.render('sala/professor', {usuario, exercicio});
                    });
                })
            ;
        },
        finalizar(req, res){
            const { id } = req.params;
            Exercicio.findById(id)
                .then((exercicio) => {
                    exercicio.status = false;
                    exercicio.save( (err) => {
                        if(err) return handleError(err);
                        res.redirect('/disciplinas');
                    });
                })
            ;
        },
        entrar(req,res){
            const { email } = req.body.sala;
            Exercicio.findOne({ quem: email, status: true }, (err, exercicio) => {
                if(err) return handleError(err);
                const exercicioId = exercicio._id;
                res.redirect(`${exercicioId}/aluno`);
            });
        },
        aluno(req, res){
            const { id } = req.params;
            const usuario = req.session.usuario;
            Exercicio.findById(id, 'nome quem questoes')
                .then((exercicio) => {
                    exercicio.questoes.map( (questao) => {
                        return questao.correta = null;
                    });
                    const quantidade_exercicio = exercicio.questoes.length;
                    res.render('sala/aluno', {usuario, exercicio, quantidade_exercicio, questoes : exercicio.questoes});
                })
            ;
        }
    };
    return SalaController;
}