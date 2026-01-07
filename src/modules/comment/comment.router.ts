import { Router } from 'express';
import auth from '../../middlewares/auth.middleware';
import UserConstants from '../user/user.constant';
import commentControllers from './comment.controller';

const commentRouter = Router();

const { USER, ADMIN } = UserConstants.Roles;

commentRouter.get('/author', auth(USER, ADMIN), commentControllers.getCommentsByAuthorId);
commentRouter.get('/:id', commentControllers.getCommentById);
commentRouter.patch('/:id', auth(USER), commentControllers.updateComment);
commentRouter.patch('/:id/moderate', auth(ADMIN), commentControllers.moderateComment);
commentRouter.delete('/:id', auth(USER, ADMIN), commentControllers.deleteComment);
commentRouter.post('/', auth(USER, ADMIN), commentControllers.createComment);

export default commentRouter;
