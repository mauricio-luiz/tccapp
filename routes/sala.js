const autenticar = require ( '../middlewares/autenticador' );

module.exports = (app) => {
    const { sala } = app.controllers;
    app.get('/salas', autenticar, sala.index);
    app.get('/salas/criar', autenticar, sala.create);
    app.post('/salas', autenticar, sala.save);
}