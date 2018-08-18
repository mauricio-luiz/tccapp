module.exports = (app) => {
    const { exercicio } = app.controllers;
    app.get('/exercicio', exercicio.index);
    app.get('/exercicio/criar', exercicio.create);
    app.post('/exercicio/salvar', exercicio.save);
    app.get('/exercicio/:id/editar', exercicio.edit);
    app.put('/exercicio/mostrar/:id', exercicio.update);
    app.delete('/exercicio/:id', exercicio.destroy);
}