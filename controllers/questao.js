module.exports = (app) => {
    const QuestaoController = {
        index(req, res){
            const usuario = req.session;
            res.render('questao/index');
        },
        create(req, res){
            const usuario = req.session;
            res.render('questao/create');
        },
        save(req, res){
            const usuario = req.session;
            res.render('questao/index');
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