import { Router } from 'express';
import auth from '../../middlewares/auth.middleware';
import UserConstants from '../user/user.constant';
import postControllers from './post.controller';

const postRouter = Router();
const { USER } = UserConstants.Roles;

postRouter.post('/', auth(USER), postControllers.createPost);
postRouter.get('/:id', postControllers.getPostById);
postRouter.get('/', postControllers.getAllPosts);

export default postRouter;
