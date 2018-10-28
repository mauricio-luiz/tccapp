const autenticar = require ( '../middlewares/autenticador' );
const professorMiddleware = require ( '../middlewares/professor' );

module.exports = (app) => {
    const { estatistica } = app.controllers;
    app.get('/estatisticas', autenticar, professorMiddleware, estatistica.index);
    app.get('/estatistica/:id/mostrar', autenticar, professorMiddleware, estatistica.show);
    app.delete('/estatistica/:id', autenticar, professorMiddleware, estatistica.destroy);
}