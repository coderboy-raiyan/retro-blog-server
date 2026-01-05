import { Router } from 'express';
import auth from '../../middlewares/auth.middleware';
import UserConstants from '../user/user.constant';
import commentControllers from './comment.controller';

const commentRouter = Router();

const { USER, ADMIN } = UserConstants.Roles;

commentRouter.post('/', auth(USER, ADMIN), commentControllers.createComment);

export default commentRouter;
