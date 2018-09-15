const autenticar = require ( '../middlewares/autenticador' );

module.exports = (app) => {
    const { disciplina } = app.controllers;
    app.get('/disciplinas', autenticar, disciplina.index);
    app.get('/disciplina/criar', autenticar, disciplina.create);
    app.get('/disciplina/:id/editar', autenticar, disciplina.edit);
    app.post('/disciplina', autenticar, disciplina.save);
    app.put('/disciplina/:id', autenticar, disciplina.update);
    app.delete('/disciplina/:id', autenticar, disciplina.destroy);
}