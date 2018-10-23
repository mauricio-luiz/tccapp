const crypto = require('crypto');
const { Types: { ObjectId } } = require('mongoose');

module.exports = (app) => {
    const Exercicio = app.models.exercicio;
    const Resultado = app.models.resultado;
    const Professor = app.models.professor;
    const Quiz = app.models.quiz;
    const SalaController = {
        index(req, res){
            const { _id } = req.session.professor;
            const { usuario } = req.session;
            Professor.findById( _id )
                .then((professor) => {
                    const { salas } = professor;
                    res.render('sala/index', { salas, usuario } );
                }).catch( () => res.redirect('/'));
        },
        create(req, res){
            const { usuario } = req.session;
            res.render('sala/create', { usuario });
        },
        save(req, res){
            const { sala } = req.body;
            const { _id } = req.session.professor;
            const { nome, codigo } = sala;
            
            const set = { $push : { salas : { nome, codigo, online : false } } };
            Professor.findByIdAndUpdate( _id, set )
                .then(() => res.redirect('/salas'))
                .catch((e) => {
                    console.log(e);
                    res.redirect('/sala/criar');
                })
            ;
        },
        edit(req, res){
            const { _id } = req.session.professor;
            const { usuario } = req.session;
            const idSala = req.params.id;
            Professor.findById(_id)
                .then((professor) => {
                    const { salas } = professor;
                    const sala = salas.find((dc) => {
                        return dc._id.toString() === idSala;
                    });
                    res.render('sala/edit', {sala, usuario});
                })
            ;
        },
        update(req,res){
            const salaId = req.params.id;
            const { sala } = req.body;
            const { professor } = req.session;
            const where = { _id : professor._id, 'salas._id': salaId };
            const set = { $set: { 'salas.$': sala } };
            Professor.update(where, set)
                .then( (professor) =>{
                    res.redirect('/salas')                    
                 })
                .catch( (e) => {
                    console.log(e);
                    res.redirect('/salas')
                })
            ;
        },
        destroy(req, res){
            const salaId = req.params.id;
            const { _id } = req.session.professor;
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
        },
        professor(req, res){
            const { id } = req.params;
            const usuario = req.session.usuario;
            const { professor } = req.session;        
            Professor.findOne( {_id : professor._id } )
                .then((professor) => {
                    const {salas} = professor;
                    Quiz.find({ professor : professor._id }).then( (quizzes) => {
                        res.render('sala/professor', { usuario, salas, quizzes });
                    });
                })
            ;
        },
        iniciar(req, res){
            const { sala, quiz } = req.body;
            const { professor } = req.session;
            Quiz.findOne( { _id :  quiz } )
                .then((quiz) => {
                    const where = { _id : professor._id, 'salas._id': sala };
                    const set = { $set: { 'salas.$.online': true, 'salas.$.quiz' : quiz } };
                    const options = { new : true };
                    Professor.findOneAndUpdate(where, set, options)
                        .then( (prof) =>{
                            const { salas } = prof;
                            const salaEscolhida = salas.find( (sl) => {
                                return sl._id.toString() === sala;
                            });
                            return res.json({ status: "success", 'dados' : salaEscolhida });
                        })
                        .catch( (e) => {
                            console.log(e);
                        })
                    ;
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
            const { caderno } = req.body.sala;
            let email = req.body.sala.email.trim();
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