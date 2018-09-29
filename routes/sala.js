const autenticar = require ( '../middlewares/autenticador' );
const professorMiddleware = require ( '../middlewares/professor' );
const alunoMiddleware = require ( '../middlewares/aluno' );

module.exports = (app) => {
    const { sala } = app.controllers;
    app.get('/sala/:id/professor', autenticar, professorMiddleware, sala.professor);
    app.put('/sala/:id', autenticar, professorMiddleware, sala.finalizar);
    app.post('/sala/entrar', autenticar, alunoMiddleware, sala.entrar);
    app.get('/sala/:id/aluno', autenticar, alunoMiddleware, sala.aluno);
    app.post('/aluno/responder', autenticar, alunoMiddleware, sala.responder);
}