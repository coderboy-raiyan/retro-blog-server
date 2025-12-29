import { Router } from 'express';
import PostRouter from '../modules/post/post.router';

const router = Router();

const routes = [
    {
        path: '/posts',
        route: PostRouter,
    },
];

routes.forEach(({ path, route }) => {
    router.use(path, route);
});

export default router;
