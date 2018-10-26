const { Types: { ObjectId } } = require ( 'mongoose' );

module.exports = (app) => {
    const Quiz = app.models.quiz;
    const QuestaoController = {
        index(req, res){
            const usuario = req.session;
            res.render('questao/index');
        },       
        save(req, res){
            const usuario = req.session;
            const { id } = req.body;
            const postQuestao = req.body.questao;

            const questao = { enunciado : postQuestao._enunciado, resposta : postQuestao._resposta, opcoes : postQuestao._opcoes };
            const set = { $push : { questoes : questao } };
            const options = {
               runValidator :true, new : true
            };

            Quiz.findByIdAndUpdate(id, set, options)
                 .then((quiz) => res.json({ status: "success", message: "Quiz salvo com sucesso!", quiz : quiz  }))
                 .catch((e) => res.json({ status: "error", message: `Ocorreu um erro ao salvar questao ${e}` }))
            ;  
        },
        edit(req, res){
            const { quiz, id } = req.params;
            Quiz.findById( { _id : quiz })
                .then( (quizEncontrado) => { 
                    const { questoes } = quizEncontrado;
                    const questao = questoes.find((qt) => {
                        return qt._id.toString() === id;
                    });
                    res.json({ status: "success", message: "Questão encontrada", questao : questao  });
                }).catch((e) => res.json({ status: "error", message: `Ocorreu um erro ao buscar questao ${e}` }));
            ;
        },
        update(req, res){
            const id = req.body.id;
            const postQuestao = req.body.questao;
            const idQuestao = req.body.id_questao;
           
            const where = { "_id" : ObjectId(id), "questoes._id" : ObjectId(idQuestao) };
            const questao = { _id : ObjectId(idQuestao), enunciado : postQuestao._enunciado, resposta : postQuestao._resposta, opcoes : postQuestao._opcoes };
        
            const set = { $set : { "questoes.$" : questao } };
            const options = {
                runValidator :true, new : true
             };

            Quiz.findOneAndUpdate(where, set, options)
                 .then( (quiz) =>{
                    res.json({ status: "success", message: "Quiz salvo com sucesso!", quiz : quiz  });
                 })
                 .catch((e) => res.json({ status: "error", message: `Ocorreu um erro ao salvar questao ${e}` }))
            ;
        },
        destroy(req, res){
            const dados = req.params.id;

            const separaDados = dados.split('&');
            const questao = separaDados.shift();
            const quiz = separaDados.shift();

            const where = {  _id : quiz };           

            const set = {
                $pull: {
                    questoes : { _id: ObjectId(questao) }
                }
            };
            Quiz.update(where, set)
                .then( () => res.redirect(`/quiz/${quiz}/editar`) )
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