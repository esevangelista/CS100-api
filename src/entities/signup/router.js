
import { Router } from 'express';
import  * as Ctrl from './controller';
import * as Util from './../user/controller';
const router = Router();

// create account
router.post('/signup', async (req, res) => {
  try{
    await Ctrl.checkEmail(req.body.Email);
    const _id = await Ctrl.createUser(req.body);
    const user = await Util.getUser({ _id });
    req.session.user = user;
    res.status(200).json({
       status: 200,
       message: 'Successfully created user',
       data: user
    });
  } catch (status) {
    let message = '';
    switch (status) {
      case 409:
        message = 'Conflict';
        break;

      case 500:
        message = 'Internal server error';
        break;
    }
    res.status(status).json({ status, message});
  }
});

export default router;