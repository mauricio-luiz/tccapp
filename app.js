const express = require('express');
const path = require('path');
const http = require('http');
const socketIO = require('socket.io');
const consign = require('consign');
const bodyParser = require('body-parser');
const cookie = require('cookie');
const expressSession = require('express-session');
const methodOverride = require('method-override');
const config = require('./config');
const mongoose = require('mongoose');
const bluebird = require('bluebird');
const error = require('./middlewares/error');
var flash = require('express-flash-messages');

const app = express();
const server = http.Server(app);
const io = socketIO(server);
const store = new expressSession.MemoryStore();

mongoose.Promise = bluebird;
var uristring = process.env.MONGODB_URI ||
                process.env.MONGOHQ_URL ||
                'mongodb://localhost:27017/tcc';

var theport = process.env.PORT || 3000;

mongoose.connect(uristring, function (err, res) {
  if (err) {
    console.log ('ERROR connecting to: ' + uristring + '. ' + err);
  } else {
    console.log ('Succeeded connected to: ' + uristring);
  }
});

var db = mongoose.connect(uristring, { useNewUrlParser: true });
global.db = mongoose.connection;

app.set('views', path.join(__dirname, 'views'));
app.use(flash())
app.set('view engine', 'ejs');
app.use(expressSession({
  store,
  name : config.sessionKey,
  secret : config.sessionSecret 
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, 'public')));

io.use((socket, next) => {
  const cookieData = socket.request.headers.cookie;
  const cookieObj = cookie.parse(cookieData);
  const sessionHash = cookieObj[config.sessionKey] || '';
  const sessionID = sessionHash.split('.')[0].slice(2);
  store.all( ( err, session) => {
    const currentSession = session[sessionID];
    if(err || !currentSession){
      return next(new Error('Acesso Negado!'));
    }
    socket.handshake.session = currentSession;
    return next();
  });
});

app.use(function(req, res, next){  
  res.locals.sessionFlash = req.session.sessionFlash;
  delete req.session.sessionFlash;
  next();
});

consign({})
  .include('models')
  .then('controllers')
  .then('routes')
  .then('events')
  .into(app, io)
;

app.use(error.notFound);
app.use(error.serverError);

server.listen(theport, () => {
  console.log('tcc app no ar');
})