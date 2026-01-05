import { Router } from 'express';
import commentRouter from '../modules/comment/comment.router';
import postRouter from '../modules/post/post.router';

const router = Router();

const routes = [
    {
        path: '/posts',
        route: postRouter,
    },
    {
        path: '/comments',
        route: commentRouter,
    },
];

routes.forEach(({ path, route }) => {
    router.use(path, route);
});

export default router;
