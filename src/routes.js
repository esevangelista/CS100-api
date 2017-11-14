'use strict';
import { Router } from 'express';
import session from 'express-session';
import userRouter from './entities/user/router';
import authRouter from './entities/auth/router';
import signupRouter from './entities/signup/router';
const router = Router();


router.use(authRouter);
router.use(signupRouter);


// router.use((req, res, next) => {
//   if (req.session.user) {
//     return next();
//   }

//   res.status(401).json({
//     status: 401,
//     message: 'Must be logged in'
//   });
// });


router.use(userRouter);

router.get('/', function(req, res) {
  res.json({message: ' access http://localhost:3001/api/<route>'});
});

export default router