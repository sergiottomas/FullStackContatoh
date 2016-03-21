//authenticate modules
var cookieParser = require('cookie-parser');
var session = require('express-session');
var passport = require('passport');

//header security modele
var helmet = require('helmet');

//application required modules
var express = require('express');
var load = require('express-load');
var bodyParser = require('body-parser');

module.exports = function(app){
  //var app = express();

  //environment setup
  app.set('port', 3000);
  app.set('view engine', 'ejs');
  app.set('views', './app/views')



  //middleware
  app.use(express.static('./public'));
  app.use(bodyParser.urlencoded({extended: true}));
  app.use(bodyParser.json());
  app.use(require('method-override')());
  app.use(cookieParser());
  app.use(session({
    secret: 'homem avestruz',
    resave: true,
    saveUninitialized: true
  }));
  app.use(passport.initialize());
  app.use(passport.session());

  //securty options
  //app.use(helmet());
  app.use(helmet.hidePoweredBy({setTo: 'PHP 5.5.14'}));
  helmet.hidePoweredBy; //no see powerd by
  app.use(helmet.xframe()); //no iframe using
  app.use(helmet.xssFilter()); //no <script> injection
  app.use(helmet.nosniff()); //no allow bronser MIME Type
  app.disable('x-powerd-by');


  //object cwd represents a default app folder
  load('models', {cwd: 'app'}).then('controllers').then('routes/auth.js').then('routes').into(app);

  //if no route
  app.get('*', function(req, res){
    res.status(404).render('404');
  });

  return app;
}
