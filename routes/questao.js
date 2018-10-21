const autenticar = require ( '../middlewares/autenticador' );
const professorMiddleware = require ( '../middlewares/professor' );

module.exports = (app) => {
    const { questao } = app.controllers;
    app.post('/questao/salvar', autenticar, professorMiddleware, questao.save);
    app.get('/questao/:quiz/:id/editar', autenticar, professorMiddleware, questao.edit);
    app.post('/questao/atualizar', autenticar, professorMiddleware, questao.update);
    app.delete('/questao/:id', autenticar, professorMiddleware, questao.destroy);
}