const autenticar = require ( '../middlewares/autenticador' );

module.exports = (app) => {
    const { sala } = app.controllers;
    app.get('/salas', autenticar, sala.index);
    app.get('/sala/criar', autenticar, sala.create);
    app.get('/sala/:id/editar', autenticar, sala.edit);
    app.post('/sala', autenticar, sala.save);
    app.put('/sala/:id', autenticar, sala.update);
    app.delete('/sala/:id', autenticar, sala.destroy);
}