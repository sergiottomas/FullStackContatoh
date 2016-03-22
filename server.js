var http = require('http');
var express = require('express');
var app = express();
var config = require('./config/config')();

require('./config/express')(app);
require('./config/passport')();
require('./config/database.js')(config.db);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listen on port ' + app.get('port'));
});
