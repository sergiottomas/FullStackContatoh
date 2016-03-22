var passport = require('passport');

module.exports = function(app){
  app.get('/auth/github', passport.authenticate('github'));
  app.get('/auth/github/callback', passport.authenticate('github', {
    successRedirect: '/'
  }));
  app.get('/logout', function(req, res){
    req.logOut();
    res.redirect('/');
  });
  app.get('/', function(req, res, next){
    if(req.isAuthenticated()){
      //allow another routes be a processs
      return next();
    } else {
      //render auth.ejs
      res.render("auth");
    }
  });
}
