const autenticar = require ( '../middlewares/autenticador' );
const alunoMiddleware = require ( '../middlewares/aluno' );

module.exports = (app) => {
    const { resultado } = app.controllers;
    app.get('/resultado/:id/mostrar', autenticar, alunoMiddleware, resultado.show);
}