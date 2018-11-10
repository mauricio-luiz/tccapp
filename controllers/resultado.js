var moment = require('moment');

module.exports = (app) => {
    const Resultado = app.models.resultado;

    const mensagemSucesso = 'Item Cadastrado com sucesso!';
    const mensagemError = 'Ocorreu um erro! Detalhes: ';
    const mensagemAtualiza = 'Item Atualizado com sucesso!';
    const mensagemDelete = 'Item Deletado com sucesso!';

    const ResultadoController = {
        index(req, res){
            const { usuario } = req.session;

            Resultado.find( { aluno : usuario._id } )
                .then( (resultados) => {

                    res.render('resultado/index', { usuario, resultados });
                }).catch( (e) => console.log(e) )
            ;
        },
        async show(req, res){
            const { usuario } = req.session;
            const { id } = req.params;

            resultados = await Resultado.find({}, {acertos : 1, tempo : 1}).sort('acertos, tempo').exec();

            console.log('resultados', resultados);

            Resultado.findById(id)
                .then( (resultado) => {

                    let posicao = 0;
                    resultados.forEach((element, index) => {                    
                        if(element._id.toString() == resultado._id) posicao = index+1;
                    });

                    res.render('resultado/show', {moment, usuario, resultado : resultado, questoes : resultado.questoes, posicao });
                }).catch( (e) => console.log(e) )
            ;
        },
        destroy(req, res){
            const { id } = req.params;
            Resultado.deleteOne({ _id : id })
                    .then( () => {
                        req.session.sessionFlash = {
                            type: 'success',
                            message: `${mensagemDelete}`
                        }
                        res.redirect(`/meus-quizzes`)
                    })
                    .catch( (e) => {
                        req.session.sessionFlash = {
                            type: 'error',
                            message: `${mensagemError} ${e}`
                        }
                        res.redirect('/') 
                    })
        }
    };
    return ResultadoController;
}