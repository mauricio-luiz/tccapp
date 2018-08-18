module.exports = (app) => {    
    const EscolhaController = {
        index(req, res){
            const { usuario } = req.session;
            res.render('escolha/index');
        },
        rotear(req, res){
            const { usuario } = req.session;
            const { tipo } = req.body;
            const { nome, perfil } = tipo;           

            req.session.usuario.nome = nome;
            req.session.usuario.perfil = perfil;
            
            if(perfil === "professor"){
                res.redirect('/professor');
            }else{
                res.redirect('/aluno');
            }
        }
    };
    return EscolhaController;
}