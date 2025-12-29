import { Post } from '../../../generated/prisma/client';
import { prisma } from '../../lib/prisma';

const getAllPosts = async () => {
    const result = await prisma.post.findMany({});
    return result;
};

const createPost = async (payload: Omit<Post, 'id' | 'createdAt| updatedAt'>) => {
    const result = await prisma.post.create({
        data: payload,
    });
    return result;
};

const postServices = {
    createPost,
    getAllPosts,
};

export default postServices;
