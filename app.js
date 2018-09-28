const express = require('express');
const path = require('path');
const http = require('http');
const socketIO = require('socket.io');
const consign = require('consign');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const expressSession = require('express-session');
const methodOverride = require('method-override');
const mongoose = require('mongoose');
const bluebird = require('bluebird');
const error = require('./middlewares/error');

const app = express();
const server = http.Server(app);
const io = socketIO(server);

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

io.on('connection', (cliente) => {
  console.log('conectou');
  cliente.on('send-server', (data) => {
    console.log('send-server');
    const resposta = `<b>${data.nome}:</b> ${data.msg}<br>`;
    cliente.emit('send-client', resposta);
    cliente.broadcast.emit('send-client', resposta);
  });
});

app.use(error.notFound);
app.use(error.serverError);

server.listen(3000, () => {
  console.log('tcc app no ar');
})