const autenticar = require ( '../middlewares/autenticador' );
const professorMiddleware = require ( '../middlewares/professor' );

module.exports = (app) => {
    const { professor } = app.controllers;
    app.get('/professor', autenticar, professorMiddleware, professor.index);
}