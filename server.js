var express = require('express');
var path = require('path');
var http = require('http');
// var rp = require('request-promise-native');
var favicon = require('serve-favicon');
var logger = require('morgan');

var app = express();
var httpServer = http.Server(app);
require('./io').init(httpServer);

require('dotenv').config();
require('./config/database');

app.use(logger('dev'));
app.use(express.json());
app.use(favicon(path.join(__dirname, 'build', 'favicon.ico')));
app.use(express.static(path.join(__dirname, 'build')));

// Put API routes here, before the "catch all" route
app.use('/api/users', require('./routes/api/users'));
app.use(require('./config/auth'));
app.use('/api/games', require('./routes/api/games'));

// Catch all route 
app.get('/*', function (req, res) {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

var port = process.env.PORT || 3001;

httpServer.listen(port, function () {
    console.log(`Express app running on port ${port}`)
});