const autenticar = require ( '../middlewares/autenticador' );

module.exports = (app) => {
    const { exercicio } = app.controllers;
    app.get('/exercicios/:id/disciplina', autenticar, exercicio.index);
    app.get('/exercicio/:id/criar', autenticar, exercicio.create);
    app.post('/exercicio', autenticar, exercicio.save);
    app.get('/exercicio/:id/editar', autenticar, exercicio.edit);
    app.put('/exercicio/:id', autenticar, exercicio.update);
    app.delete('/exercicio/:id', autenticar, exercicio.destroy);
    app.get('/exercicio/:id/mostrar', autenticar, exercicio.show)
}