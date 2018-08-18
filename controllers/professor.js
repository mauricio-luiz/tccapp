module.exports = (app) => {
    const ProfessorController = {
        index(req, res){
            const {usuario} = req.session;
            console.log(usuario);
            res.render('professor/index');
        }
    };
    return ProfessorController;
}