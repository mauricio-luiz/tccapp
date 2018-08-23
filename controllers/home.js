const md5 = require('md5');

module.exports = (app) => {
    const Professor = app.models.professor;
    const HomeController = {
        index(req, res){
            res.render('home/index');
        },
        login(req, res){
            const { usuario } = req.body;
            const {email}  = usuario;
            const password = md5(usuario.password);
            const where = { email, password };
            Professor.find(where)
            .then((professor) => {
                if(professor.length > 0){
                    req.session.usuario = professor.shift();
                    res.redirect('/professor');
                }else{
                    res.redirect('/');
                }
            })
            .catch( (e) => { 
                console.log(e);
                res.redirect('/');
            });
        },
        logout(req,res){
            req.session.destroy();
            res.redirect('/');
        },
        professor(req, res){
            res.render('home/professor');
        },
        register(req, res){
            const { usuario } = req.body;
            const {nome, email}  = usuario;
            const password = md5(usuario.password);
            const where = { email, password};
            const set = {
                $setOnInsert: { nome : nome, email, password, salas : [] }
            };
            const options = {
                upsert : true, runValidator :true, new : true
            };
            Professor.findOneAndUpdate(where, set, options)
                .select('nome email password')
                .then((professor) => {
                    req.session.usuario = professor;
                    res.redirect('/professor');
                })
                .catch( (e) => { 
                    console.log(e);
                    res.redirect('/registrar/professor', {message : e.message});
                });
        }
    }
    return HomeController;
}