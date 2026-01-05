import { StatusCodes } from 'http-status-codes';
import { prisma } from '../../lib/prisma';
import AppError from '../../utils/AppError.utils';

const createComment = async (payload: {
    content: string;
    parentId?: string;
    authorId: string;
    postId: string;
}) => {
    const post = await prisma.post.findUnique({
        where: {
            id: payload?.postId,
        },
    });
    if (!post) {
        throw new AppError(StatusCodes.NOT_FOUND, 'Post not found!');
    }
    const parent = await prisma.post.findUnique({
        where: {
            id: payload?.parentId,
        },
    });
    if (!parent) {
        throw new AppError(StatusCodes.NOT_FOUND, 'Parent not found!');
    }

    const result = await prisma.comment.create({
        data: payload,
    });
    return result;
};

const commentServices = {
    createComment,
};

export default commentServices;
