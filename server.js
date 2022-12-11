var express = require('express');
var compression = require('compression')
var expressStaticGzip = require('express-static-gzip');
var sslRedirect = require("heroku-ssl-redirect").default;



var path = require('path');
var http = require('http');
var app = express();
app.use(sslRedirect());
app.use(compression())
app.use(
    expressStaticGzip(path.join(__dirname, "build"), {
        enableBrotli: true, // only if you have brotli files too
    })
);
app.use(express.static(path.join(__dirname, 'build')));

// app.use(formidable());
app.get('*', function (req, res) {
    res.sendFile(path.join(__dirname, 'build/index.html'));
});

// require('./server/conf?ig/route.js')(app);

//Set Port
var port = process.env.PORT || '2000';
app.set('port', port);
var server = http.createServer(app, function (req, res) {

});
server.listen(port)
console.log('Running on localhost:' + port);
