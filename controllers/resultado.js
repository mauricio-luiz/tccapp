module.exports = (app) => {
    const Resultado = app.models.resultado;
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
                    console.log(resultado.questoes.opcoes);
                    res.render('resultado/show', { usuario, resultado : resultado, questoes : resultado.questoes });
                }).catch( (e) => console.log(e) )
            ;
        }
    };
    return ResultadoController;
}