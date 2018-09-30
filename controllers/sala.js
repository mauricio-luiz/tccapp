const crypto = require('crypto');
module.exports = (app) => {
    const Exercicio = app.models.exercicio;
    const SalaController = {
        professor(req, res){
            const { id } = req.params;
            const usuario = req.session.usuario;          
            Exercicio.findOneAndUpdate(id, {status : true}, { new : true})
                .then((exercicio) => {
                    const sala = req.query;
                    let hashDaSala = sala;
                    if( ! hashDaSala.length > 0  ){
                        const md5 = crypto.createHash('md5');
                        hashDaSala = md5.update(usuario.email).digest('hex');
                    }
                    const quantidade_exercicio = exercicio.questoes.length;
                    res.render('sala/professor', {usuario, exercicio, sala : hashDaSala, quantidade_exercicio, email : usuario.email});
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

                    const sala = req.query;
                    let hashDaSala = sala;
                    if( ! hashDaSala.length > 0  ){
                        const md5 = crypto.createHash('md5');
                        hashDaSala = md5.update(exercicio.quem).digest('hex');
                    }
                    const quantidade_exercicio = exercicio.questoes.length;
                    res.render('sala/aluno', {usuario, exercicio, quantidade_exercicio, questoes : exercicio.questoes, sala : hashDaSala, email : usuario.email});
                })
            ;
        },
        responder(req, res){
            const { resposta } = req.body;
            const resposta_A = resposta.split("&");

            const numero = resposta_A.shift();
            const resposta_aluno = resposta_A.shift();
            const id = resposta_A.shift();
            const questao = resposta_A.shift();

            Exercicio.findById(id)
                .then((exercicio) => {
                    let acertou = 0;
                    let message = "Resposta Incorreta";
                    const { questoes } = exercicio;
                    const questao_corrente = questoes.find((qst) => {
                        return qst._id.toString() === questao;
                    });

                    if(questao_corrente.correta == resposta_aluno){
                        acertou = 1;
                        message = "Resposta Correta";    
                    }
                    return res.json({ status: "success", message: message, questao : numero, resposta : acertou });
                })
            ;
        }
    };
    return SalaController;
}