var express = require('express');
var path = require('path');
var http = require('http');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cors = require('cors');

var app = express();
var httpServer = http.Server(app);
require('./io').init(httpServer);

require('dotenv').config();
require('./config/database');

app.use(logger('dev'));
app.use(express.json());
app.use(favicon(path.join(__dirname, 'build', 'favicon.ico')));
app.use(express.static(path.join(__dirname, 'build')));
app.use(cors());

// Put API routes here, before the "catch all" route
app.use('/api/users', require('./routes/api/users'));
app.use(require('./config/auth'));

// Catch all route 
app.get('/*', function (req, res) {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

var port = process.env.PORT || 3001;

httpServer.listen(port, function () {
    console.log(`Express app running on port ${port}`)
});