module.exports = (app) => {
    const Exercicio = app.models.exercicio;
    const QuestaoController = {
        index(req, res){
            const usuario = req.session;
            res.render('questao/index');
        },
        create(req, res){
            const id = req.params.id;
            const usuario = req.session;
            
            Exercicio.findOne( { _id : id } )
            .then((exercicio) => {
                const quantidade_exercicio = exercicio.questoes.length;
                const menu_extra = [{nome : 'Finalizar Criação', url : `/questao/salvar`}];
                res.render('questao/create', {id, menu_extra, quantidade_exercicio });
            }).catch( (e) => { console.log(e); res.redirect('/'); });
        },
        save(req, res){
            const usuario = req.session;
            const { questoes , exercicio } = req.body;

            const { _questoes } = questoes;
            const questao = _questoes.shift();
            const { _enunciado, _resposta, _opcoes } = questao;

            const set = { 
                $push : { 
                    questoes : { questao : _enunciado, opcoes : _opcoes, correta : _resposta }
                }
            };

            Exercicio.findByIdAndUpdate(exercicio, set)
                 .then(() => res.json({ status: "success", message: "Questão salva com sucesso!" }))
                 .catch((e) => res.json({ status: "error", message: `Ocorreu um erro ao salvar questao ${e}` }))
            ;            
        },
        edit(req, res){
            const usuario = req.session;
            res.render('questao/index');
        },
        update(req, res){
            const usuario = req.session;
            res.render('questao/index');
        },
        destroy(req, res){
            const usuario = req.session;
            res.render('questao/index');
        }
    };
    return QuestaoController;
}