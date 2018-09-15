const autenticar = require ( '../middlewares/autenticador' );

module.exports = (app) => {
    const { questao } = app.controllers;
    app.get('/questao/criar', autenticar, questao.create);
    app.post('/questao/salvar', autenticar, questao.save);
    app.get('/questao/:id/editar', autenticar, questao.edit);
    app.put('/questao/mostrar/:id', autenticar, questao.update);
    app.delete('/questao/:id', autenticar, questao.destroy);
}