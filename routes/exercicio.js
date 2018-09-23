const autenticar = require ( '../middlewares/autenticador' );
const professorMiddleware = require ( '../middlewares/professor' );

module.exports = (app) => {
    const { exercicio } = app.controllers;
    app.get('/exercicios/:id/disciplina', autenticar, professorMiddleware, exercicio.index);
    app.get('/exercicio/:id/criar', autenticar, professorMiddleware, exercicio.create);
    app.post('/exercicio', autenticar, professorMiddleware, exercicio.save);
    app.get('/exercicio/:id/editar', autenticar, professorMiddleware, exercicio.edit);
    app.put('/exercicio/:id', autenticar, professorMiddleware, exercicio.update);
    app.delete('/exercicio/:id', autenticar, professorMiddleware, exercicio.destroy);
    app.get('/exercicio/:id/mostrar', autenticar, professorMiddleware, exercicio.show)
}