const fs = require('fs');
const http = require('http');
const https = require('https');

const privateKey = fs.readFileSync('/root/borsch_hack-moscow/server/key.pem', 'utf8');
const certificate = fs.readFileSync('/root/borsch_hack-moscow/server/cert.pem', 'utf8');

const credentials = { key: privateKey, cert: certificate };

const path = require('path');
const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const session = require('express-session');
const cors = require('cors');

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

app.use(cors({
  allowedHeaders: ['sessionId', 'Content-Type'],
  exposedHeaders: ['sessionId'],
  origin: '*',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  preflightContinue: false,
}));

app.get('/*', (req, res) => {
  res.sendFile('index.html', { root: path.join(__dirname, '../build') });
});


const httpServer = http.createServer(app);
const httpsServer = https.createServer(credentials, app);

httpServer.listen(8080);
httpsServer.listen(8443);

// const server = app.listen(() => {
//    console.log(`start webserver: https://localhost:8443`);
// });

// server.setTimeout(5 * 60 * 1000);


module.exports = app;
