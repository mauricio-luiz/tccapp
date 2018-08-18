module.exports = (app) => {
    const ExercicioController = {
        index(req, res){
            const usuario = req.session;
            res.render('exercicio/index');
        },
        create(req, res){
            const usuario = req.session;
            res.render('exercicio/create');
        },
        save(req, res){
            const usuario = req.session;
            res.render('exercicio/index');
        },
        edit(req, res){
            const usuario = req.session;
            res.render('exercicio/index');
        },
        update(req, res){
            const usuario = req.session;
            res.render('exercicio/index');
        },
        destroy(req, res){
            const usuario = req.session;
            res.render('exercicio/index');
        }
    };
    return ExercicioController;
}