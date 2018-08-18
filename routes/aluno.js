const autenticar = require ( '../middlewares/autenticador' );

module.exports = (app) => {
    const { aluno } = app.controllers;
    app.get('/aluno', autenticar, aluno.index);
}