const autenticar = require ( '../middlewares/autenticador' );
const professorMiddleware = require ( '../middlewares/professor' );

module.exports = (app) => {
    const { questao } = app.controllers;
    app.get('/questoes/:id/criar', autenticar, professorMiddleware,  questao.create);
    app.post('/questao/salvar', autenticar, professorMiddleware, questao.save);
    app.get('/questao/:exercicio/editar/:id/questao', autenticar, professorMiddleware, questao.edit);
    app.put('/questao/:id', autenticar, professorMiddleware, questao.update);
    app.delete('/questao/:exercicio/remover/:id/questao', autenticar, professorMiddleware, questao.destroy);
}