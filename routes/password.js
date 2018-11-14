module.exports = (app) => {
    const { passwordreset } = app.controllers;
    app.get('/password', passwordreset.index);
    app.post('/password-send', passwordreset.sendMail);
    app.get('/:token/resetar', passwordreset.changePassword);
    app.post('/reset', passwordreset.reset);
}