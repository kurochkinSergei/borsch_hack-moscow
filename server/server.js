const fs = require('fs');
const http = require('http');
const https = require('https');

const privateKey = fs.readFileSync('sslcert/server.key', 'utf8');
const certificate = fs.readFileSync('sslcert/server.crt', 'utf8');

const credentials = { key: privateKey, cert: certificate };

const path = require('path');
const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const session = require('express-session');

// const SERVER_PORT = 8080;
const app = express();


app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(session(
  {
    resave: true,
    saveUninitialized: true,
    secret: 'super secret',
  },
));
// app.use(passport.initialize());
// app.use(passport.session());
app.use(express.static(path.join(__dirname, '../build')));

app.get('/*', (req, res) => {
  res.sendFile('index.html', { root: path.join(__dirname, '../build') });
});


const httpServer = http.createServer(app);
const httpsServer = https.createServer(credentials, app);

httpServer.listen(8080);
httpsServer.listen(8443);

// const server = app.listen(SERVER_PORT, () => {
//   console.log(`start webserver: http://localhost:${SERVER_PORT}`);
// });

// server.setTimeout(5 * 60 * 1000);


module.exports = app;
