

import { Router } from 'express';
import  * as Ctrl from './controller';
import * as Util from './../user/controller';
import fileupload from 'express-fileupload';
import shortid from 'shortid';
const router = Router();

router.use(fileupload()); // express-fileupload


router.post('/post', async (req, res) => {
  try{

    var _id;
    req.body.uuid = shortid.generate();

    if (req.files)req.body.imgurl = await Ctrl.attachImage(req.body.uuid,'/images/',req.files);
    
    const _id = await Ctrl.createPost(req.session.user._id,req.body);
    const post = await Ctrl.getPost({ _id });

    res.status(200).json({
       status: 200,
       message: 'Successfully created post',
       data: post
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