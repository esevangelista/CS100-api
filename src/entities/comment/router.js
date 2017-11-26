import { Router } from 'express';
import  * as Ctrl from './controller';
import * as Util from './../user/controller';
import * as postUtil from './../post/controller';
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

router.put('/comment/:Pid/:_id', async (req,res) => {
    try{
      const user = req.session.user._id;
      req.body.authorName = req.session.user.name;
      const likes = (await Ctrl.getComment(req.params)).likeCount;
      await Ctrl.checkAction(req.params,req.body,user);
      await Ctrl.likeComment(req.params,req.body,likes);
      await Ctrl.updateLikedComment(req.params,req.body,{user});
      const comment = await Ctrl.getComment(req.params);
      res.status(200).json({
         status: 200,
         message: 'Successfully performed action on comment',
         data: comment
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


router.post('/comment/:Pid', async (req, res) => {
  try{
    const self = req.session.user._id;
    req.body.authorName = req.session.user.name;
    req.body.authorImg = req.session.user.imageUrl;
    await Ctrl.createComment(self,req.body,req.params);
    const _id = req.params.Pid
    const post = await postUtil.getPost({_id});
    res.status(200).json({
       status: 200,
       message: 'Successfully created comment',
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