import { Router } from 'express';
import  * as Ctrl from './controller';
import * as Util from './../user/controller';
import fileupload from 'express-fileupload';
import shortid from 'shortid';
const router = Router();

router.use(fileupload()); // express-fileupload

router.get('/post', async (req,res) => {
  try {
    const posts = await Ctrl.getAllPost();
    res.status(200).json({
      status: 200,
      message: 'Successfully fetched posts',
      data: posts
    });
  } catch (status) {
    let message = '';
    switch (status) {
      case 500:
        message = 'Internal server error';
        break;
      case 404:
        message = 'Posts not Found';
        break;
    }
    res.status(status).json({ status, message });
  }
});

router.get('/post/:Cid', async (req, res) => {
  try {
    const posts = await Ctrl.getAllPostofUser(req.params);
    res.status(200).json({
      status: 200,
      message: 'Successfully fetched posts of user',
      data: posts
    });
  } catch (status) {
    let message = '';
    switch (status) {
      case 404:
        message = 'Posts not found';
        break;
      case 500:
        message = 'Internal server error';
        break;
    }
    res.status(status).json({ status, message });
  }
});

router.get('/post/:Cid/:_id', async (req, res) => {
  try {
    const post = await Ctrl.getPostofUser(req.params);
    res.status(200).json({
      status: 200,
      message: 'Successfully fetched post',
      data: post
    });
  } catch (status) {
    let message = '';
    switch (status) {
      case 404:
        message = 'Post not found';
        break;
      case 500:
        message = 'Internal server error';
        break;
    }
    res.status(status).json({ status, message });
  }
});


router.put('/post/:_id', async (req,res) => {
    try{
      const likes = (await Ctrl.getPost(req.params)).likeCount;
      const user = req.session.user._id
      await Ctrl.checkAction(req.params,req.body,user);
      await Ctrl.likePost(req.params,req.body,likes);
      await Ctrl.updateLikedPost(req.params,req.body,{user});
      const post = await Ctrl.getPost(req.params);
      res.status(200).json({
         status: 200,
         message: 'Successfully performed action on post',
         data: post
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

router.delete('/post/:_id', async (req, res) => {

  try {
    //Ctrl.unlinkImage(req.params);
    await Ctrl.deletePost(req.params);
    res.status(200).json({
      status: 200,
      message: 'Successfully deleted post'
    });
  } catch (status) {
    let message = '';
    switch (status) {
      case 404:
        message = 'Post not found';
        break;
      case 500:
        message = 'Internal server error';
        break;
    }
    res.status(status).json({ status, message });
  }
});

router.post('/post', async (req, res) => {
  try{

    var _id;
    req.body.uuid = shortid.generate();
    if (req.files) req.body.imgurl = await Ctrl.attachImage(req.body.uuid,'/images/',req.files);
    
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