

import { Router } from 'express';
import  * as Ctrl from './controller';
import * as Util from './../user/controller';
import fileupload from 'express-fileupload';
const router = Router();

router.use(fileupload()); // express-fileupload

// unfinished
router.post('/upload', async (req, res) => {
  try{
    const file = await Util.uploadPhoto(req.session.user._id,'/images/',req.files);
    res.status(200).json({
       status: 200,
       message: 'Successfully uploaded image',
       data: file
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


router.post('/post', async (req, res) => {
  try{
    const _id = await Ctrl.createPost(req.body);
    const post = await Ctrl.getPost({ _id });
    res.status(200).json({
       status: 200,
       message: 'Successfully created post',
       data: posr
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