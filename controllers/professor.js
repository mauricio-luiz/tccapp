module.exports = (app) => {
    const ProfessorController = {
        index(req, res){
            const usuario = req.session;
            res.render('professor/index');
        }
    };
    return ProfessorController;
}