const autenticar = require ( '../middlewares/autenticador' );
const professorMiddleware = require ( '../middlewares/professor' );

module.exports = (app) => {
    const { quiz } = app.controllers;
    app.get('/quizzes', autenticar, professorMiddleware, quiz.index);
    app.post('/quiz', autenticar, professorMiddleware, quiz.save);
    app.get('/quiz/:id/editar', autenticar, professorMiddleware, quiz.edit);
    app.put('/quiz/:id', autenticar, professorMiddleware, quiz.update);
    app.delete('/quiz/:id', autenticar, professorMiddleware, quiz.destroy);
    app.get('/quiz/:id/mostrar', autenticar, professorMiddleware, quiz.show)
}