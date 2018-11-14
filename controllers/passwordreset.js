const moment = require('moment');
const nodemailer = require('nodemailer');
const querystring = require('querystring');
const sparkPostTransport = require('nodemailer-sparkpost-transport');
require('dotenv').config();
const md5 = require('md5');

module.exports = (app) => {
    const Usuario = app.models.usuario;

    const PasswordResetController = {
        index(req, res){            
            res.render('password/index');
        },
        sendMail(req, res){

            const { email } = req.body.usuario;
            let token = Buffer.from(moment().format('MMMM Do YYYY, h:mm:ss a')).toString('base64');
            const url = process.env.MONGODB_URI || process.env.MONGOHQ_URL ? 
            `https://tcconline.herokuapp.com/${token}/resetar` : `http://192.168.10.10:3000/${token}/resetar`;

            if(process.env.SPARKPOST_API_KEY){
                console.log('transport com sparkpost');
                var transporter = nodemailer.createTransport(sparkPostTransport({
                    'sparkPostApiKey': process.env.SPARKPOST_API_KEY,
                    'sparkPostApiUrl' : process.env.SPARKPOST_API_URL,
                    'sparkPostSandboxDomain' : process.env.SPARKPOST_SANDBOX_DOMAIN,
                    'sparkPostSmtpHost' : proccess.env.SPARKPOST_SMTP_HOST,
                    'sparkPostSmtpPassword' : process.env.SPARKPOST_SMTP_PASSWORD,
                    'sparkPostSmtpPort' : proccess.env.SPARKPOST_SMTP_PORT,
                    'sparkPostSmtpUsername' : process.env.SPARKPOST_SMTP_USERNAME
                }));
            }else{
                console.log('transport com nodemailer')
                var transporter = nodemailer.createTransport({
                    host: process.env.HOST,
                    port: process.env.PORT,
                    secure: false, 
                    auth: {
                        user: process.env.EMAIL,
                        pass: process.env.PASS
                    }
                });
            }

            Usuario.findOneAndUpdate({ email : email }, {token : token})
            .select('nome email password tipo')
            .then((usuario) => {
                   
                let mailOptions = {
                    from: '"QUIZZES TCC" <mauriciojnio@gmail.com>',
                    to: email,
                    subject: 'Esqueceu a senha',
                    html: `Esqueceu a sua senha? Não tem problema. <br> Crie uma nova clicando no link abaixo: <br> <a href="${url}">${url}</a>`
                };
                
                transporter.sendMail(mailOptions, (error, info) => {
                    console.log('Error', error);
                    if (error) {
                        return console.log(error);
                    }
                    console.log('Message sent: %s', info.messageId);
                    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
                });

                req.session.sessionFlash = {
                    type: 'success',
                    message: `Email enviado com sucesso`
                }
                res.redirect('/');
            })
            .catch( (e) => {
                console.log(e);
                req.session.sessionFlash = {
                    type: 'error',
                    message: `Usuario não encontrado na base de dados`
                }
                res.redirect('/password');
            });
        },
        changePassword(req, res){
            const { token }  = req.params;
            Usuario.find({ token : token })
            .then((usr) => {
                console.log(usr.length == 0);
                if( usr.length == 0 ) {
                    res.status(404);
                    res.render('not-found');
                    return;
                }
                res.render('password/reset', {token : token, message : req.query });
            })
            .catch( (e) => {                
                res.status(404)
            });
        },
        reset(req, res){

            const { usuario } = req.body;
            const {token, password_confirmation}  = usuario;
            const password = md5(usuario.password);
            const url = process.env.MONGODB_URI || process.env.MONGOHQ_URL ? 
            `https://tcconline.herokuapp.com/${token}/resetar` : `http://192.168.10.10:3000/${token}/resetar`;

            if(md5(password_confirmation) != password){
                const message = querystring.stringify({
                        password : 'Senhas não conicidem. Tente novamente!'                    
                    }
                );
                res.redirect(`${url}?${message}`);
                return;
            }

            Usuario.findOneAndUpdate({ token : token, token : '', password: password })
            .then((usr) => {
                req.session.sessionFlash = {
                    type: 'success',
                    message: `Senha alterada com sucesso`
                }
                res.redirect('/');
            })
            .catch( (e) => {
                console.log(e);
                req.session.sessionFlash = {
                    type: 'error',
                    message: `Usuario não encontrado na base de dados`
                }
                res.redirect('/');
            });
        }

    };
    return PasswordResetController;
}