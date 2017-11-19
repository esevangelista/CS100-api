import { Router } from 'express';
import  * as Ctrl from './controller';
import * as Util from './../user/controller';
import fileupload from 'express-fileupload';
import shortid from 'shortid';

const router = Router();

router.use(fileupload()); // express-fileupload


router.get('/comment/:Pid/:_id', async (req, res) => {
  try {
    const comment = await Ctrl.getComment(req.params);
    res.status(200).json({
      status: 200,
      message: 'Successfully fetched comment',
      data: comment
    });
  } catch (status) {
    let message = '';
    switch (status) {
      case 404:
        message = 'Comment not found';
        break;
      case 500:
        message = 'Internal server error';
        break;
    }
    res.status(status).json({ status, message });
  }
});

router.delete('/comment/:Pid/:_id', async (req, res) => {
  try {
    await Ctrl.deleteComment(req.params);
    res.status(200).json({
      status: 200,
      message: 'Successfully deleted comment'
    });
  } catch (status) {
    let message = '';
    switch (status) {
      case 404:
        message = 'Comment not found';
        break;
      case 500:
        message = 'Internal server error';
        break;
    }
    res.status(status).json({ status, message });
  }
});


router.post('/comment/:Pid', async (req, res) => {
  try{

    req.body.uuid = shortid.generate();
    const _id = await Ctrl.createComment(req.session.user._id,req.body,req.params);
    req.params._id = _id;
    const comment = await Ctrl.getComment(req.params);

    res.status(200).json({
       status: 200,
       message: 'Successfully created comment',
       data: comment
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