'use strict'
import express from 'express';
import bodyParser from 'body-parser';
import logger from 'morgan';
import session from 'express-session';
import routes from './routes';
import DB from './database/index';
import path from 'path';
const app = express();
const port = process.env.PORT || 3001;

// body parsing
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(logger('dev'));

// for CORS
app.use(function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');

  res.setHeader('Cache-Control', 'no-cache');
  next();
});

/* for express-session */
app.use(
  session({
    secret: 'cs100',
    resave: true,
    saveUninitialized: true
  })
);

app.use('/api', routes);
app.use('/profile-picture',express.static(path.join(__dirname, './entities/signup/profile-picture')));
app.use('/post-images',express.static(path.join(__dirname, './entities/post/images')));

const server = app.listen(port, (err) => {
  if (err) console.log(err);
  else console.log(`\nCMSC 100 App server is running at port : ${port}`); 
});

export default server;
