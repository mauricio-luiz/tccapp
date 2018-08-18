module.exports = (app) => {
    const { aluno } = app.controllers;
    app.get('/aluno', aluno.index);
}