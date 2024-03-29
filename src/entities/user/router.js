import { Router } from 'express';
import  * as Ctrl from './controller';

const router = Router();

//get all users
router.get('/user', async (req,res) => {     
  try {
    const users = await Ctrl.getAllUsers(req.params);
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

//get user 
router.get('/user/search/:name', async (req, res) => {
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


router.put('/user', async (req, res) => {
  console.log(req.body);
  try{
    const self = req.session.user._id
    const user_id = await Ctrl.updateUser(self, req.body);
    const user = await Ctrl.getUser({self});
    console.log("USER: ", user);
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


router.put('/verify', async (req, res) => {
  try {
    const _id = req.session.user._id;
    await Ctrl.verify({_id},req.body); 
    res.status(200).json({
      status: 200,
      message: 'Successfully verified user'
    });
  } catch (status) {
    let message = '';
    switch (status) {
      case 500:
        message = 'Internal server error while logging in';
        break;
      case 422:
        message = 'Incorrect  Password';
        break;
    }
    res.status(status).json({ status, message });
  }
});
export default router;