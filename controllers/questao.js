const { Types: { ObjectId } } = require ( 'mongoose' );

module.exports = (app) => {
    const Exercicio = app.models.exercicio;
    const QuestaoController = {
        index(req, res){
            const usuario = req.session;
            res.render('questao/index');
        },
        create(req, res){
            const id = req.params.id;
            
            Exercicio.findOne( { _id : id } )
                .then((exercicio) => {
                    const quantidade_exercicio = exercicio.questoes.length;
                    res.render('questao/create', { id, quantidade_exercicio });
                }).catch( (e) => { console.log(e); res.redirect('/'); });
        },
        save(req, res){
            const { questoes , exercicio } = req.body;

            const { _questoes } = questoes;
            const questao = _questoes.shift();
            const { _enunciado, _resposta, _opcoes } = questao;                

            const set = { 
                $push : { 
                    questoes : { questao : _enunciado, opcoes : _opcoes, correta : _resposta, exercicio : exercicio }
                }
            };

            Exercicio.findByIdAndUpdate(exercicio, set)
                 .then(() => res.json({ status: "success", message: "Questão salva com sucesso!" }))
                 .catch((e) => res.json({ status: "error", message: `Ocorreu um erro ao salvar questao ${e}` }))
            ;            
        },
        edit(req, res){
            const exercicioId = req.params.exercicio;
            const id = req.params.id;

            Exercicio.findById( exercicioId )
                .then( (exercicio) => {
                    const { questoes } = exercicio;
                    const questao = questoes.find((qt) => {
                        return qt._id.toString() === id;
                    });
                    const quantidade_exercicio = questao.opcoes.length;
                    res.render('questao/edit', {questao, quantidade_exercicio});
                })
            ;
        },
        update(req, res){
            const id = req.params.id;
            const { questao } = req.body;
            const where = { _id : questao.exercicio, 'questoes._id': id };

            const { enunciado, opcoes } = questao;
            const resposta_value = questao.resposta;
            const letra = resposta_value.replace('opcao', '');
            const alfabeto = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'X', 'W', 'Y', 'Z'];
            const numero = alfabeto.indexOf(letra);           
            const resposta = numero;

            const questaoDoc = { questao : enunciado, opcoes : opcoes, correta : resposta, exercicio: questao.exercicio };
            const set = { $set: { 'questoes.$': questaoDoc } };
            
            Exercicio.update( where, set )
                  .then( (exercicio) => {
                        res.redirect(`/exercicio/${questao.exercicio}/mostrar`) 
                    })
                  .catch( (e) => { console.log(e); res.redirect('/') });
            ;
        },
        destroy(req, res){
            const {id, exercicio} = req.params;
            const where = {  _id : exercicio };
            const set = {
                $pull: {
                    questoes : { _id: ObjectId(id) }
                }
            };
            Exercicio.update(where, set)
                .then( () => res.redirect(`/exercicio/${exercicio}/mostrar`) )
                .catch( () => res.redirect('/') )
            ;
        },
        converteNumero(letra){
            const alfabeto = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'X', 'W', 'Y', 'Z'];
            return alfabeto.indexOf(letra);
        }
    };
    return QuestaoController;
}