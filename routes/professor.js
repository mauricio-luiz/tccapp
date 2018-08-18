const autenticar = require ( '../middlewares/autenticador' );

module.exports = (app) => {
    const { professor } = app.controllers;
    app.get('/professor', autenticar, professor.index);
}