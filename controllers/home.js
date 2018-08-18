module.exports = (app) => {
    const HomeController = {
        index(req, res){
            res.render('home/index');
        },
        login(req, res){
            const { usuario } = req.body;
            const {email, password}  = usuario;
            if(email && password){
                usuario.contatos = [];
                res.redirect('/escolha');
            }else{
                res.redirect('/');
            }
        },
        logout(req,res){
            req.session.destroy();
            res.redirect('/');
        }
    }
    return HomeController;
}