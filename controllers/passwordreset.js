const moment = require('moment');
const nodemailer = require('nodemailer');
const querystring = require('querystring');
const { google } = require("googleapis");
const OAuth2 = google.auth.OAuth2;
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

            const oauth2Client = new OAuth2(
                "180534864821-abg9ifc63saq63hrfms50lhfc86hhggf.apps.googleusercontent.com", // ClientID
                "mVbSX7L4Gx5lqx04bdIQrkuD", // Client Secret
                "https://developers.google.com/oauthplayground" // Redirect URL
           );

            oauth2Client.setCredentials({
                refresh_token: "1/oY-EyCGFT21K0u9S_-LIh9pdf1YW7PMo1gSMDhrxybc"
            });

            const accessToken = oauth2Client.refreshAccessToken()
            .then(res => res.credentials.access_token);

            const smtpTransport = nodemailer.createTransport({
                service: "gmail",
                auth: {
                        type: "OAuth2",
                        user: "mauriciojunio@gmail.com", 
                        clientId: "180534864821-abg9ifc63saq63hrfms50lhfc86hhggf.apps.googleusercontent.com",
                        clientSecret: "mVbSX7L4Gx5lqx04bdIQrkuD",
                        refreshToken: "1/oY-EyCGFT21K0u9S_-LIh9pdf1YW7PMo1gSMDhrxybc",
                        accessToken: accessToken
                }
            });

            Usuario.findOneAndUpdate({ email : email }, {token : token})
            .select('nome email password tipo')
            .then((usuario) => {
                   
                let mailOptions = {
                    from: '"QUIZZES TCC" <mauriciojnio@gmail.com>',
                    to: email,
                    subject: 'Esqueceu a senha',
                    html: `Esqueceu a sua senha? Não tem problema. <br> Crie uma nova clicando no link abaixo: <br> <a href="${url}">${url}</a>`
                };
                
                smtpTransport.sendMail(mailOptions, (error, info) => {
                    console.log('Error', error);
                    if (error) {
                        return console.log(error);
                    }
                    console.log('Message sent: %s', info.messageId);
                    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
                    smtpTransport.close();
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