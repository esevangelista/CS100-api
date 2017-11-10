import { Router } from 'express';
import  * as Ctrl from './controller';

const router = Router();
//const validator = require('express-validator');

//get all users
router.get('/', async (req,res) => {
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
        message = 'Not Found';
        break;
    }
    res.status(status).json({ status, message });
  }
  try {
    await Ctrl.deleteUser();
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
router.get('/:_id', async (req, res) => {
  try {
    const user = await Ctrl.getUser(req.params._id);
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

router.delete('/:_id', async (req, res) => {

  try {

    await Ctrl.deleteUser(req.params._id);
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
// create account
router.post('/', async (req, res) => {
  try{
    const _id = await Ctrl.createUser(req.body);
    const user = await Ctrl.getUser({ _id });
    console.log(user);
    res.status(200).json({
       status: 200,
       message: 'Successfully created user',
       data: user
    });
  } catch (status) {
    let message = '';
    switch (status) {
      case 500:
        message = 'Internal server error';
        break;
    }
    res.status(status).json({ status, message});
  }
});


export default router;