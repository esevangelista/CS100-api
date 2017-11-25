import { Router } from 'express';
import  * as Ctrl from './controller';
import * as Util from './../user/controller'
const router = Router();
router.get('/friend/', async (req, res) => {
  try {
    const friends = req.session.user.friends;

    res.status(200).json({
      status: 200,
      message: 'Successfully fetched friends of user',
      data: friends
    });
  } catch (status) {
    let message = '';
    switch (status) {
      case 404:
        message = 'Friends not found';
        break;
      case 500:
        message = 'Internal server error';
        break;
    }
    res.status(status).json({ status, message });
  }
});

router.get('/friendCount/',async (req,res) => {
  try {
    const _id = req.session.user._id
    const friends = await Util.getUser(_id);

    res.status(200).json({
      status: 200,
      message: 'Successfully fetched number of friends user has ',
      data: friends.length
    });
  } catch (status) {
    let message = '';
    switch (status) {
      case 404:
        message = 'Friends not found';
        break;
      case 500:
        message = 'Internal server error';
        break;
    }
    res.status(status).json({ status, message });
  }
});

router.get('/request/', async (req, res) => {
  try {
    const requestsFrom = req.session.user.requests;
    res.status(200).json({
      status: 200,
      message: 'Successfully fetched requests for user',
      data: requestsFrom
    });
  } catch (status) {
    let message = '';
    switch (status) {
      case 404:
        message = 'Not found';
        break;
      case 500:
        message = 'Internal server error';
        break;
    }
    res.status(status).json({ status, message });
  }
});

router.get('/suggested/', async (req, res) => {
  try {
    const users = await Ctrl.suggestUser();
    res.status(200).json({
      status: 200,
      message: 'Successfully fetched random users',
      data: users
    });
  } catch (status) {
    let message = '';
    switch (status) {
      case 404:
        message = 'Not found';
        break;
      case 500:
        message = 'Internal server error';
        break;
    }
    res.status(status).json({ status, message });
  }
});


router.put('/accept/:_id', async (req, res) => {
  try{
    const self = req.session.user._id;
    await Ctrl.acceptRequest(self,req.params);
    const user = await Util.getUser(req.params);
    res.status(200).json({
       status: 200,
       message: 'Successfully accepted friend request of user',
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
    res.status(status).json({ status, message});
  }
});


router.put('/add/:_id', async (req, res) => {
  try{
    const self = req.session.user._id;
    await Ctrl.checkUser( self, req.params);
    await Ctrl.addFriend(self,req.params);
    const user = await Util.getUser(req.params);
    res.status(200).json({
       status: 200,
       message: 'Successfully added user',
       data: user
    });
  } catch (status) {
    let message = '';
    switch (status) {
      case 409:
        message = 'CONFLICT';
        break;

      case 500:
        message = 'Internal server error';
        break;
    }
    res.status(status).json({ status, message});
  }
});

router.delete('/reject/:_id', async (req, res) => {
  try{
    const self = req.session.user._id;
    await Ctrl.rejectRequest(self,req.params);
    const user = await Util.getUser(req.params);
    res.status(200).json({
       status: 200,
       message: 'Successfully rejected request from  user',
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
    res.status(status).json({ status, message});
  }
});


export default router;