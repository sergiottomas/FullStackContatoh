var passport = require('passport');
var GitHubStrategy = require('passport-github').Strategy;

//call mongoose module for get express modules
var mongoose = require('mongoose');

module.exports = function(){
  var Usuario = mongoose.model('Usuario');

  passport.use(new GitHubStrategy({
    clientID: 'cce072bd6662a42a7430',
    clientSecret: '4cdcaf6ac69578682b8df37dafc4121e665818fb',
    callbackURL: 'http://localhost:3000/auth/github/callback'
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
