module.exports = (app) => {
    const { home } = app.controllers;
    app.get('/', home.index);
    app.post('/entrar', home.login);
    app.get('/registrar/professor', home.professor);
    app.post('/registrar', home.register);
    app.get('/sair', home.logout);
}