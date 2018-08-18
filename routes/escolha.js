module.exports = (app) => {
    const { escolha } = app.controllers;
    app.get('/escolha', escolha.index);
    app.post('/escolha', escolha.rotear)
}