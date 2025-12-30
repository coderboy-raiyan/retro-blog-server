import { Request, Response } from 'express';
import postServices from './post.service';

const createPost = async (req: Request, res: Response) => {
    try {
        const data = await postServices.createPost(req.body, req?.user);
        return res.status(201).json({
            data,
        });
    } catch (error) {
        res.status(500).json({ error });
    }
};
const getAllPosts = async (req: Request, res: Response) => {
    try {
        const data = await postServices.getAllPosts();
        return res.status(201).json({
            data,
        });
    } catch (error) {
        res.status(500).json({ error });
    }
};

const postControllers = {
    createPost,
    getAllPosts,
};

export default postControllers;
