const autenticar = require ( '../middlewares/autenticador' );
const alunoMiddleware = require ( '../middlewares/aluno' );

module.exports = (app) => {
    const { aluno } = app.controllers;
    app.get('/aluno', autenticar, alunoMiddleware, aluno.index);
}