module.exports = (app) => {
    const { professor } = app.controllers;
    app.get('/professor', professor.index);
}