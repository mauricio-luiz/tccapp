module.exports = (req, res, next) =>{
    if(req.session.usuario.tipo != 'p'){
        req.session.destroy();
        return res.redirect('/');
    }
    return next();
}