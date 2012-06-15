
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , conf = require('./conf')
  , fs = require('fs');

var app = module.exports = express.createServer();

var logfile = fs.createWriteStream('./log/zenoconsulting.biz.log', {flags: 'a+'});

// Configuration

app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.bodyParser());
  app.use(express.logger({stream:logfile}));
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure('production', function(){
  app.use(express.errorHandler());
});

// Routes

app.get('/', routes.index);

app.listen(conf.port, function(){
  console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
});
