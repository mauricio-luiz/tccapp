module.exports = (app) => {
    const Resultado = app.models.resultado;
    const Exercicio = app.models.exercicio;
    const EstatisticaController = {
        show(req, res){
            const usuario = req.session;
            const { id } = req.params;

            Exercicio.findById( {_id : id} )
                .then( (exercicio) => {
                    Resultado.find({ exercicioReferencia : exercicio._id })
                    .then( (resultados) => {
                        res.render('estatistica/show', { resultados : resultados, exercicio : exercicio });
                    }).catch( (e) => console.log(e) )
                })
            ;
        }
    };
    return EstatisticaController;
}