const autenticar = require ( '../middlewares/autenticador' );

module.exports = (app) => {
    const { exercicio } = app.controllers;
    app.get('/exercicio', autenticar, exercicio.index);
    app.get('/exercicio/criar', autenticar, exercicio.create);
    app.post('/exercicio/salvar', autenticar, exercicio.save);
    app.get('/exercicio/:id/editar', autenticar, exercicio.edit);
    app.put('/exercicio/mostrar/:id', autenticar, exercicio.update);
    app.delete('/exercicio/:id', autenticar, exercicio.destroy);
}