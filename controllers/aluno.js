module.exports = (app) => {
    const AlunoController = {
        index(req, res){
            const usuario = req.session;
            res.render('aluno/index');
        }
    };
    return AlunoController;
}