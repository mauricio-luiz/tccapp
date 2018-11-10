const crypto = require('crypto');
const { Types: { ObjectId } } = require('mongoose');
const shortid = require('shortid');

module.exports = (app) => {
    const Resultado = app.models.resultado;
    const Professor = app.models.professor;
    const Estatistica = app.models.estatistica;
    const Quiz = app.models.quiz;

    const mensagemSucesso = 'Item Cadastrado com sucesso!';
    const mensagemError = 'Ocorreu um erro! Detalhes: ';
    const mensagemAtualiza = 'Item Atualizado com sucesso!';
    const mensagemDelete = 'Item Deletado com sucesso!';

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
            const { nome, descricao } = sala;
            
            shortid.worker(1);
            const set = { $push : { salas : { nome, descricao, online : false,  codigo : shortid.generate() } } };
            Professor.findByIdAndUpdate( _id, set )
                .then(() => { 
                    req.session.sessionFlash = {
                        type: 'success',
                        message: `${mensagemAtualiza}`
                    }
                    res.redirect('/salas') 
                })
                .catch((e) => {
                    req.session.sessionFlash = {
                        type: 'error',
                        message: `${mensagemError} ${e}`
                    }
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

                    let online = [];
                    onlines = salas.map( (sl) => {
                        return sl.online === true ? true : false;
                    });
                    const temSalaAtiva = onlines.indexOf(true) >= 0 ? true : false;
                    let salaEscolhida = null;
                    salaEscolhida = salas.find((sl) => {
                        return sl.online === true;
                    });

                    Quiz.find({ professor : professor._id }).then( (quizzes) => {
                        res.render('sala/professor', { usuario, salas, quizzes, temSalaAtiva, salaEscolhida });
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
            const { professor } = req.session;
            Professor.findById( { _id : professor._id } )
                .then((prof) => {
                    const { salas } = prof;
                    const salaEscolhida = salas.find( (sl) => {
                        return sl._id.toString() === id;
                    });
                    salaEscolhida.online = false;
                    salaEscolhida.quiz = {};
                    prof.save( (err) => {
                        if(err) console.log(err);
                        res.redirect('/professor');
                    });
                })
            ;
        },
        entrar(req,res){
            const { nome, codigo } = req.body.sala;  
            const where = { 'salas.nome' : nome, 'salas.codigo': codigo, 'salas.online' : true };
            Professor.findOne(where)
                .then((professor) => {
                   return res.redirect(`/sala/${professor._id}/aluno`)
                }).catch( (e) => {
                    return res.redirect('/aluno');
                });
            ;
        },
        aluno(req, res){
            const { professor } = req.params;
            const usuario = req.session.usuario;
            Professor.findById( {_id : professor })
                .then((prof) => {

                    const { salas } = prof;
                    const salaEscolhida = salas.find( (sl) => {
                        return  sl.online === true;
                    }); 

                    const quantidade_exercicio = salaEscolhida.quiz.questoes.length;
                    res.render('sala/aluno', {
                        usuario,
                        quiz : salaEscolhida.quiz,
                        quantidade_exercicio,
                        questoes : salaEscolhida.quiz.questoes,
                        sala : salaEscolhida._id,
                        email : usuario.email,
                        nomeSala : salaEscolhida.nome
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

            Quiz.findById(id)
                .then((quiz) => {
                    let acertou = 0;
                    let message = "Resposta Incorreta";
                    let numeroQuestao = 0;
                    const { questoes } = quiz;
                    const questao_corrente = questoes.find((qst) => {
                        numeroQuestao = numeroQuestao + 1;
                        return qst._id.toString() === questao;
                    });

                    if(questao_corrente.resposta == resposta_aluno){
                         acertou = 1;
                         message = "Resposta Correta";    
                    }

                    return res.json({ status: "success", message: message, questao : numeroQuestao, resposta : acertou });
                })
            ;
        },
        salvar(req, res){
            const { selecionado, acerto, tempo } = req.body;
            const selecionado_A = selecionado.split("&");
            const { usuario } = req.session;

            const numero = selecionado_A.shift();
            const resposta_aluno = selecionado_A.shift();
            const id = selecionado_A.shift();
            const questaoId = selecionado_A.shift();

            Quiz.findById( { _id : id})
                .then((quiz) => {

                    const { questoes } = quiz;
                    const total_questoes = questoes.length;
                    let  numeroQuestao = 0;
                    const questao_corrente = questoes.find((qst) => {
                        numeroQuestao = numeroQuestao + 1;
                        return qst._id.toString() === questaoId;
                    });                    
                    
                    const resultado = {
                        aluno : usuario._id,
                        quiz : quiz._id,
                        professor : quiz.professor,
                        nome : usuario.nome,
                        questoes : [],
                        quiz_nome : quiz.nome
                    };                   

                    const where = { aluno : usuario._id, quiz : quiz._id};
                    const options = { upsert : true, runValidator : true, new : true };
                    const set = { $setOnInsert: resultado };

                    Resultado.findOneAndUpdate(where, set, options)
                        .then((resultado) => {

                            const resposta = {
                                questao : questao_corrente.enunciado,
                                opcoes : questao_corrente.opcoes,
                                numero : numero,
                                acertou : acerto,
                                marcada : resposta_aluno,
                                justificativa : questao_corrente.justificativa,
                                tempo : resultado.tempo ? tempo - resultado.tempo : tempo
                            };

                            resultado.questoes.push(resposta);
                            resultado.tempo = tempo;
                            resultado.save( (err) => {
                                if(err) throw err;
                            });

                            const terminou = total_questoes == numeroQuestao ? true : false;
                            return res.json({ status: "success", message : 'resposta salva com sucesso', resultado : resultado, terminou : terminou });
                        })
                        .catch( (e) => { 
                            console.log(e);
                            res.redirect('/registrar/aluno', {message : e.message});
                        });
                })
            ;
        },

        geraResultadoFinal(req, res){
            const { usuario } = req.session;
            const { resultado, sala } = req.body;

            const dados = {
                professor : resultado.professor,
                sala : sala,
                quiz : resultado.quiz_nome
            }
            const where = { professor : resultado.professor, sala : sala};
            const set = { $setOnInsert: dados };
            const options = { upsert : true, runValidator : true, new : true };
            Estatistica.findOneAndUpdate(where, set, options)
                .then((estatistica) => {
                    const resposta = {
                        aluno : resultado.nome,
                        questoes : resultado.questoes
                    };
                    estatistica.respostas.push(resposta);
                    estatistica.save( (err) => {
                        if(err) throw err;
                    });                    
                    res.json({ status: "success", message : 'Estatisticas geradas com sucesso'});
                }).catch( (e) => res.json({ status: "error", message : `Ocorreu um erro ao gerar estatisticas ${e}`} ));
        }

    };
    return SalaController;
}