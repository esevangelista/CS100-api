import { Router } from 'express';
import  * as Ctrl from './controller';
import * as Util from './../user/controller';


const router = Router();

router.post('/login', async (req, res) => {
  try {
    const _id = await Ctrl.login(req.body);
    const user = await Util.getUser({ _id });
    //req.session.user = user;
    res.status(200).json({
      status: 200,
      message: 'Successfully logged in',
      data: user
    });
  } catch (status) {
    let message = '';
    switch (status) {
      case 500:
        message = 'Internal server error while logging in';
        break;
      case 404:
        message = 'Wrong credentials';
        break;
    }
    res.status(status).json({ status, message });
  }
});

export default router;