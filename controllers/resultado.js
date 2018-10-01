module.exports = (app) => {
    const Resultado = app.models.resultado;
    const ResultadoController = {
        show(req, res){
            const usuario = req.session;
            const { id } = req.params;

            Resultado.findById(id)
                .then( (resultado) => {
                    res.render('resultado/show', { resultado : resultado, questoes : resultado.questoes });
                }).catch( (e) => console.log(e) )
            ;
        }
    };
    return ResultadoController;
}