const express = require('express');
const path = require('path');
const consign = require('consign');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const expressSession = require('express-session');
const methodOverride = require('method-override');
const mongoose = require('mongoose');
const bluebird = require('bluebird');
const error = require('./middlewares/error');
const app = express();
mongoose.Promise = bluebird;
var db = mongoose.connect('mongodb://localhost:27017/tcc', { useNewUrlParser: true });
global.db = mongoose.connection;

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(cookieParser('app'));
app.use(expressSession());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, 'public')));

consign({})
  .include('models')
  .then('controllers')
  .then('routes')
  .into(app)
;

app.use(error.notFound);
app.use(error.serverError);

app.listen(3000, () => {
  console.log('tcc app no ar');
})