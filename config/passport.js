var config = require('./config')();
var passport = require('passport');
var GitHubStrategy = require('passport-github').Strategy;
var mongoose = require('mongoose');

module.exports = function(){
  var Usuario = mongoose.model('Usuario');

  var gitHubCallBack = 'http://' + config.domain + ':' + config.port + '/auth/github/callback';

  passport.use(new GitHubStrategy({
    clientID: config.clientID,
    clientSecret: config.clientSecret,
    callbackURL: gitHubCallBack
  }, function(accessToken, refreshToken, profile, done){
    Usuario.findOrCreate(
      {
        "login" : profile.username
      },{
        "nome" : profile.username
      },
      function(error, usuario){
        if(error){
          console.log(error)
          return done(error);
        }

        return done(null, usuario);
      }
    );
  }));

  passport.serializeUser(function(usuario, done){
    done(null, usuario._id);
  });

  passport.deserializeUser(function(id, done){
    Usuario.findById(id).exec()
    .then(function(usuario){
      done(null, usuario);
    });
  });
}
