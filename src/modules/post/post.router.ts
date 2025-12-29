import { Router } from 'express';
import postControllers from './post.controller';

const PostRouter = Router();

PostRouter.post('/', postControllers.createPost);
PostRouter.get('/', postControllers.getAllPosts);

export default PostRouter;
