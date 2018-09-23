const autenticar = require ( '../middlewares/autenticador' );

module.exports = (app) => {
    const { questao } = app.controllers;
    app.get('/questoes/:id/criar', autenticar, questao.create);
    app.post('/questao/salvar', autenticar, questao.save);
    app.get('/questao/:exercicio/editar/:id/questao', autenticar, questao.edit);
    app.put('/questao/:id', autenticar, questao.update);
    app.delete('/questao/:id', autenticar, questao.destroy);
}