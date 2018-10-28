var moment = require('moment');
module.exports = (app) => {
    const Estatistica = app.models.estatistica;
    const EstatisticaController = {
        index(req, res){
            const { _id } = req.session.professor;
            const { usuario } = req.session;

            Estatistica.find( { professor : _id } )
                .then( (estatisticas) => {
                    res.render('estatistica/index', {usuario, estatisticas, moment});
                }).catch( (e) => console.log(e) )
            ;
        },
        show(req, res){
            const { _id } = req.session.professor;
            const { usuario } = req.session;
            const estatisticaID = req.params.id;
            Estatistica.findById( { _id : estatisticaID } )
                .then((estatistica) => {
                    const respostas = estatistica.respostas;
                    res.render('estatistica/show', {usuario, estatistica, respostas});
                })
            ;
        },
        destroy(req, res){
            const { id } = req.params;
            Estatistica.deleteOne({ _id : id })
                    .then( () =>  res.redirect(`/estatisticas`))
                    .catch( (e) => { console.log(e); res.redirect('/') })
        }
    };
    return EstatisticaController;
}