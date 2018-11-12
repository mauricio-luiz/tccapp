const md5 = require('md5');
const querystring = require('querystring');
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
            res.render('home/professor', {message : req.query });
        },
        aluno(req, res){
            res.render('home/aluno',  {message : req.query });
        },
        registrarProfessor(req, res){
            const { usuario } = req.body;
            const {nome, email, password_confirmation}  = usuario;
            const password = md5(usuario.password);
            const where = { email, password};
            const tipo = 'p';
            const filtro = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
            
            if( ! filtro.test(email) ){
                const message = querystring.stringify({
                        nome : nome,
                        email : email,
                        emailError : 'Email com formata inválido!'
                    }
                );
                res.redirect(`/registrar/professor?${message}`);
                return;
            }

            if(md5(password_confirmation) != password){
                const message = querystring.stringify({
                        password : 'Senhas não conicidem. Tente novamente!',
                        nome : nome,
                        email : email
                    }
                );
                res.redirect(`/registrar/professor?${message}`);
                return;
            }

            const set = {
                $setOnInsert: { nome : nome, email, password, tipo }
            };
            const options = {
                upsert : true, runValidator :true, new : true
            };
            Usuario.findOneAndUpdate(where, set, options)
                .select('nome email password tipo')
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
                    const message = querystring.stringify({
                            usuario : 'Usuário já em uso',
                            nome : nome,
                            email : email
                        }
                    );
                    res.redirect(`/registrar/professor?${message}`);
                });
        },
        registrarAluno(req, res){
            const { usuario } = req.body;
            const {nome, email, password_confirmation}  = usuario;
            const password = md5(usuario.password);
            const where = { email, password};
            const tipo = 'a';
            const filtro = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
            
            if( ! filtro.test(email) ){
                const message = querystring.stringify({
                        nome : nome,
                        email : email,
                        emailError : 'Email com formata inválido!'
                    }
                );
                res.redirect(`/registrar/aluno?${message}`);
                return;
            }

            if(md5(password_confirmation) != password){
                const message = querystring.stringify({
                        password : 'Senhas não conicidem. Tente novamente!',
                        nome : nome,
                        email : email
                    }
                );
                res.redirect(`/registrar/aluno?${message}`);
                return;
            }

            const set = {
                $setOnInsert: { nome : nome, email, password, tipo }
            };
            const options = {
                upsert : true, runValidator :true, new : true
            };
            Usuario.findOneAndUpdate(where, set, options)
                .select('nome email password tipo')
                .then((usuario) => {
                    const alunoDoc = new Aluno({ usuario : usuario._id , cadernos : [] });
                    alunoDoc.save( (err, aluno) => {
                        req.session.usuario = usuario;
                        req.session.aluno = aluno;
                        res.redirect('/aluno');
                    });
                })
                .catch( (e) => { 
                    const message = querystring.stringify({
                            usuario : 'Usuário já em uso',
                            nome : nome,
                            email : email
                        }
                    );
                    res.redirect(`/registrar/aluno?${message}`);
                });
        }
    }
    return HomeController;
}