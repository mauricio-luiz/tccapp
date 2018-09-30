const autenticar = require ( '../middlewares/autenticador' );
const alunoMiddleware = require ( '../middlewares/aluno' );

module.exports = (app) => {
    const { caderno } = app.controllers;
    app.get('/cadernos', autenticar, alunoMiddleware, caderno.index);
    app.get('/caderno/criar', autenticar, alunoMiddleware, caderno.create);
    app.get('/caderno/:id/exercicio', autenticar, alunoMiddleware, caderno.exercicio);
    app.get('/caderno/:id/mostrar', autenticar, alunoMiddleware, caderno.show);
    app.get('/caderno/:id/editar', autenticar, alunoMiddleware, caderno.edit);
    app.post('/caderno', autenticar, alunoMiddleware, caderno.save);
    app.put('/caderno/:id', autenticar, alunoMiddleware, caderno.update);
    app.delete('/caderno/:id', autenticar, alunoMiddleware, caderno.destroy);
}