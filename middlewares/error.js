exports.notFound = (req, res, next) => {
    res.status(404);
    res.render('not-found');
}

exports.serverError = (error, req, res, next) => {
    res.status(500);
    console.log(error);
    res.render('server-error', {error});
};