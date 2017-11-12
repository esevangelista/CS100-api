import { Router } from 'express';
import  * as Ctrl from './controller';

const router = Router();

//get all users
router.get('/user', async (req,res) => {
  try {
    const users = await Ctrl.getAllUsers();
    res.status(200).json({
      status: 200,
      message: 'Successfully fetched users',
      data: users
    });
  } catch (status) {
    let message = '';
    switch (status) {
      case 500:
        message = 'Internal server error';
        break;
      case 404:
        message = 'Users not Found';
        break;
    }
    res.status(status).json({ status, message });
  }
});


router.delete('/user/:_id', async (req, res) => {

  try {
    await Ctrl.deleteUser(req.params);
    res.status(200).json({
      status: 200,
      message: 'Successfully deleted user'
    });
  } catch (status) {
    let message = '';
    switch (status) {
      case 404:
        message = 'User not found';
        break;
      case 500:
        message = 'Internal server error';
        break;
    }
    res.status(status).json({ status, message });
  }
});

//get user 
router.get('/user/:_id', async (req, res) => {
  try {
    const user = await Ctrl.getUser(req.params);
    res.status(200).json({
      status: 200,
      message: 'Successfully fetched user',
      data: user
    });
  } catch (status) {
    let message = '';
    switch (status) {
      case 404:
        message = 'User not found';
        break;
      case 500:
        message = 'Internal server error';
        break;
    }
    res.status(status).json({ status, message });
  }
});

// create account
router.post('/user', async (req, res) => {
  try{
    await Ctrl.checkEmail(req.body.Email);
    const _id = await Ctrl.createUser(req.body);
    const user = await Ctrl.getUser({ _id });
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

router.put('/user/:_id', async (req, res) => {
  try{
    const _id = await Ctrl.updateUser(req.params, req.body);
    const user = await Ctrl.getUser(req.params);
    res.status(200).json({
       status: 200,
       message: 'Successfully updated user',
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