'use strict';
import { Router } from 'express';
import session from 'express-session';
import userRouter from './entities/user/router';


const router = Router();


/* for express-session */
router.use(
  session({
    secret: 'cs100',
    resave: true,
    saveUninitialized: true
  })
);


router.use('/users',userRouter);


router.get('/', function(req, res) {
  res.json({message: ' access http://localhost:3001/api/<route>'});
});

module.exports = router;