const crypto = require('crypto');
module.exports = (app) => {
    const Exercicio = app.models.exercicio;
    const Resultado = app.models.resultado;
    const SalaController = {
        professor(req, res){
            const { id } = req.params;
            const usuario = req.session.usuario;           
            Exercicio.findOneAndUpdate( {_id : id }, {status : true}, { new : true} )
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
            const { email, caderno } = req.body.sala;
            Exercicio.findOne({ quem: email, status: true }, (err, exercicio) => {
                if(err) return handleError(err);

                if(exercicio != null){
                    const exercicioId = exercicio._id;
                    res.redirect(`${exercicioId}/${caderno}/aluno`);
                }else{
                    res.redirect(`/caderno/${caderno}/exercicio`);
                }
            });
        },
        aluno(req, res){
            const { id, caderno } = req.params;
            const usuario = req.session.usuario;
            Exercicio.findById( { _id : id}, 'nome quem questoes')
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
                    res.render('sala/aluno', {
                        usuario,
                        exercicio,
                        quantidade_exercicio,
                        questoes : exercicio.questoes,
                        sala : hashDaSala,
                        email : usuario.email,
                        caderno : caderno
                    });
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
        },
        salvar(req, res){
            const { selecionado, acerto, caderno } = req.body;
            const selecionado_A = selecionado.split("&");
            const { usuario } = req.session;

            const numero = selecionado_A.shift();
            const resposta_aluno = selecionado_A.shift();
            const exercicioReferencia = selecionado_A.shift();
            const questaoId = selecionado_A.shift();

            Exercicio.findById(exercicioReferencia)
                .then((exercicio) => {

                    const { questoes } = exercicio;
                    const total_questoes = (questoes.length) - 1;
                    const questao_corrente = questoes.find((qst) => {
                        return qst._id.toString() === questaoId;
                    });

                    const resposta = {
                        questao : questao_corrente.questao,
                        opcoes : questao_corrente.opcoes,
                        numero : numero,
                        acertou : acerto,
                        marcada : resposta_aluno
                    };
                    const resultado = {
                        aluno : usuario._id,
                        exercicio : exercicio.nome,
                        exercicioReferencia : exercicioReferencia,
                        nome : usuario.nome,
                        caderno : caderno,
                        questoes : []
                    };

                    const where = { aluno : usuario._id, caderno, exercicioReferencia};
                    const options = { upsert : true, runValidator : true, new : true };
                    const set = { $setOnInsert: resultado };

                    Resultado.findOneAndUpdate(where, set, options)
                        .then((resultado) => {
                            resultado.questoes.push(resposta);
                            resultado.save( (err) => {
                                if(err) throw err;
                            });
                            const terminou = total_questoes == parseInt(numero) ? true : false;
                            return res.json({ status: "success", message : 'resposta salva com sucesso', resultado : resultado, terminou : terminou });
                        })
                        .catch( (e) => { 
                            console.log(e);
                            res.redirect('/registrar/aluno', {message : e.message});
                        });
                })
            ;
        }

    };
    return SalaController;
}