module.exports = (app) => {
    const { home } = app.controllers;
    app.get('/', home.index);
    app.post('/entrar', home.login);
    app.get('/registrar/professor', home.professor);
    app.get('/registrar/aluno', home.aluno);
    app.post('/registrar-professor', home.registrarProfessor);
    app.post('/registrar-aluno', home.registrarAluno);
    app.get('/sair', home.logout);
}