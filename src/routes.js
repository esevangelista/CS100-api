'use strict';
import { Router } from 'express';
import session from 'express-session';
import userRouter from './entities/user/router';
import authRouter from './entities/auth/router';

const router = Router();


/* for express-session */
router.use(
  session({
    secret: 'cs100',
    resave: true,
    saveUninitialized: true
  })
);


router.use(userRouter);
router.use(authRouter);

router.get('/', function(req, res) {
  res.json({message: ' access http://localhost:3001/api/<route>'});
});

export default router