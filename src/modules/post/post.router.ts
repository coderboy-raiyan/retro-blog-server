import { Router } from 'express';
import auth from '../../middlewares/auth.middlware';
import UserConstants from '../user/user.constant';
import postControllers from './post.controller';

const PostRouter = Router();
const { USER } = UserConstants.Roles;

PostRouter.post('/', auth(USER), postControllers.createPost);
PostRouter.get('/:id', postControllers.getPostById);
PostRouter.get('/', postControllers.getAllPosts);

export default PostRouter;
