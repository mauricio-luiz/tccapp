module.exports = (req, res, next) =>{
    if(req.session.usuario.tipo != 'a'){
        req.session.destroy();
        return res.redirect('/');
    }
    return next();
}