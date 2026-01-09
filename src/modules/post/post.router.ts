import { Router } from 'express';
import auth from '../../middlewares/auth.middleware';
import UserConstants from '../user/user.constant';
import postControllers from './post.controller';

const postRouter = Router();
const { USER, ADMIN } = UserConstants.Roles;

postRouter.post('/', auth(USER), postControllers.createPost);
postRouter.get('/stats', postControllers.getStats);
postRouter.get('/me', auth(USER, ADMIN), postControllers.getMyPosts);
postRouter.get('/:id', postControllers.getPostById);
postRouter.patch('/:id', auth(USER, ADMIN), postControllers.updatePost);
postRouter.delete('/:id', auth(USER, ADMIN), postControllers.deletePost);
postRouter.get('/', postControllers.getAllPosts);

export default postRouter;
