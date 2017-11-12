'use strict'
import express from 'express';
import bodyParser from 'body-parser';
import logger from 'morgan';
import session from 'express-session';
import routes from './routes';
import DB from './database/index';

const app = express();
const port = process.env.PORT || 3001;

// body parsing
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(logger('dev'));

/* for express-session */
app.use(
  session({
    secret: 'cs100',
    resave: true,
    saveUninitialized: true
  })
);

app.use('/api', routes);

const server = app.listen(port, (err) => {
  if (err) console.log(err);
  else console.log(`\nCMSC 100 App server is running at port : ${port}`); 
});

export default server;