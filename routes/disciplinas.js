const autenticar = require ( '../middlewares/autenticador' );
const professorMiddleware = require ( '../middlewares/professor' );

module.exports = (app) => {
    const { disciplina } = app.controllers;
    app.get('/disciplinas', autenticar, professorMiddleware, disciplina.index);
    app.get('/disciplina/criar', autenticar, professorMiddleware, disciplina.create);
    app.get('/disciplina/:id/editar', autenticar, professorMiddleware, disciplina.edit);
    app.post('/disciplina', autenticar, professorMiddleware, disciplina.save);
    app.put('/disciplina/:id', autenticar, professorMiddleware, disciplina.update);
    app.delete('/disciplina/:id', autenticar, professorMiddleware, disciplina.destroy);
}