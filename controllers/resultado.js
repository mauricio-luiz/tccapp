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
        show(req, res){
            const { usuario } = req.session;
            const { id } = req.params;

            Resultado.findById(id)
                .then( (resultado) => {                    
                    res.render('resultado/show', {moment, usuario, resultado : resultado, questoes : resultado.questoes });
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