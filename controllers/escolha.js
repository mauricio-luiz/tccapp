module.exports = (app) => {    
    const EscolhaController = {
        index(req, res){
            const { usuario } = req.session;
            console.log(req.session.usuario);
            res.render('escolha/index');
        },
        rotear(req, res){
            const { usuario } = req.session;
            const { tipo } = req.body;
            const { nome, perfil } = tipo;           

            console.log(perfil === "professor");
            if(perfil === "professor"){
                res.redirect('/professor');
            }else{
                res.redirect('/aluno');
            }
        }
    };
    return EscolhaController;
}