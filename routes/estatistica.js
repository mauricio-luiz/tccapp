const autenticar = require ( '../middlewares/autenticador' );
const professorMiddleware = require ( '../middlewares/professor' );

module.exports = (app) => {
    const { estatistica } = app.controllers;
    app.get('/estatistica/:id/mostrar', autenticar, professorMiddleware, estatistica.show);
}