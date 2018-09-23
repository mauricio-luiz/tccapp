const md5 = require('md5');

module.exports = (app) => {
    const Usuario = app.models.usuario;
    const Professor = app.models.professor;
    const Aluno = app.models.aluno;
    const HomeController = {
        index(req, res){
            res.render('home/index');
        },
        login(req, res){
            const { usuario } = req.body;
            const {email}  = usuario;
            const password = md5(usuario.password);
            const where = { email, password };
            Usuario.find(where)
            .then((usuario) => {
                const usuarioDoc = usuario.shift();
                if(usuarioDoc.tipo == 'p'){
                    req.session.usuario = usuarioDoc;
                    Professor.findOne( { usuario : usuarioDoc._id }).exec( (err, professor) => {
                        req.session.professor = professor;
                        res.redirect('/professor');
                    });
                }else if (usuarioDoc.tipo == 'a'){
                    req.session.usuario = usuarioDoc;
                    Aluno.findOne( { usuario : usuarioDoc._id }).exec( (err, aluno) => {
                        req.session.aluno = aluno;
                        res.redirect('/aluno');
                    }); 
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
        aluno(req, res){
            res.render('home/aluno');
        },
        registrarProfessor(req, res){
            const { usuario } = req.body;
            const {nome, email}  = usuario;
            const password = md5(usuario.password);
            const where = { email, password};
            const tipo = 'p';
            const set = {
                $setOnInsert: { nome : nome, email, password, tipo }
            };
            const options = {
                upsert : true, runValidator :true, new : true
            };
            Usuario.findOneAndUpdate(where, set, options)
                .select('nome email password')
                .then((usuario) => {
                    const professorDoc = new Professor({ usuario : usuario._id, disciplinas : [] });
                    professorDoc.save( (err, professor) => {
                        req.session.usuario = usuario;
                        req.session.professor = professor;
                        console.log('req.session', req.session);
                        res.redirect('/professor');
                    });
                })
                .catch( (e) => { 
                    console.log(e);
                    res.redirect('/registrar/professor', {message : e.message});
                });
        },
        registrarAluno(req, res){
            const { usuario } = req.body;
            const {nome, email}  = usuario;
            const password = md5(usuario.password);
            const where = { email, password};
            const tipo = 'a';
            const set = {
                $setOnInsert: { nome : nome, email, password, tipo }
            };
            const options = {
                upsert : true, runValidator :true, new : true
            };
            Usuario.findOneAndUpdate(where, set, options)
                .select('nome email password')
                .then((usuario) => {
                    const alunoDoc = new Aluno({ usuario : usuario._id , cadernos : [] });
                    alunoDoc.save( (err, aluno) => {
                        req.session.usuario = usuario;
                        req.session.aluno = aluno;
                        res.redirect('/aluno');
                    });
                })
                .catch( (e) => { 
                    console.log(e);
                    res.redirect('/registrar/aluno', {message : e.message});
                });
        }
    }
    return HomeController;
}