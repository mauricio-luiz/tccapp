const autenticar = require ( '../middlewares/autenticador' );
const alunoMiddleware = require ( '../middlewares/aluno' );

module.exports = (app) => {
    const { resultado } = app.controllers;
    app.get('/meus-quizzes', autenticar, alunoMiddleware, resultado.index);
    app.get('/resultado/:id/mostrar', autenticar, alunoMiddleware, resultado.show);
    app.delete('/resultado/:id', autenticar, alunoMiddleware, resultado.destroy);
}