const autenticar = require ( '../middlewares/autenticador' );
const professorMiddleware = require ( '../middlewares/professor' );
const alunoMiddleware = require ( '../middlewares/aluno' );

module.exports = (app) => {
    const { sala } = app.controllers;
    app.get('/salas', autenticar, professorMiddleware, sala.index);
    app.get('/sala/criar', autenticar, professorMiddleware, sala.create);
    app.post('/sala', autenticar, professorMiddleware, sala.save);
    app.get('/sala/:id/editar', autenticar, professorMiddleware, sala.edit);
    app.put('/sala/:id', autenticar, professorMiddleware, sala.update);
    app.delete('/sala/:id/', autenticar, professorMiddleware, sala.destroy);

    app.get('/sala/professor', autenticar, professorMiddleware, sala.professor);
    app.post('/sala/iniciar', autenticar, professorMiddleware, sala.iniciar);
    app.get('/sala/:id/finalizar', autenticar, professorMiddleware, sala.finalizar);
    app.post('/sala/entrar', autenticar, alunoMiddleware, sala.entrar);
    app.get('/sala/:professor/aluno', autenticar, alunoMiddleware, sala.aluno);
    app.post('/aluno/responder', autenticar, alunoMiddleware, sala.responder);
    app.post('/aluno/salvar', autenticar, alunoMiddleware, sala.salvar);
    app.post('/aluno/gera-resultado', autenticar, alunoMiddleware, sala.geraResultadoFinal);
}