import { StatusCodes } from 'http-status-codes';
import { User } from '../../../generated/prisma/client';
import { prisma } from '../../lib/prisma';
import AppError from '../../utils/AppError.utils';
import UserConstants from '../user/user.constant';

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
    if (payload?.parentId) {
        const parent = await prisma.comment.findUnique({
            where: {
                id: payload?.parentId,
            },
        });
        if (!parent) {
            throw new AppError(StatusCodes.NOT_FOUND, 'Parent not found!');
        }
    }

    const result = await prisma.comment.create({
        data: payload,
    });
    return result;
};

const getCommentById = async (id: string) => {
    const comment = await prisma.comment.findUnique({
        where: {
            id,
        },
        include: {
            post: {
                select: {
                    id: true,
                    title: true,
                },
            },
        },
    });
    return comment;
};

const getCommentsByAuthor = async (authorId: string) => {
    const comments = await prisma.comment.findMany({
        where: {
            authorId,
        },
        include: {
            post: {
                select: {
                    id: true,
                    title: true,
                },
            },
        },
    });
    return comments;
};
const deleteComment = async (id: string, user: Partial<User>) => {
    let comment = await prisma.comment.findUnique({
        where: {
            id,
            authorId: user?.id,
        },
    });

    if (user?.role === UserConstants.Roles.ADMIN) {
        comment = await prisma.comment.findUnique({
            where: {
                id,
            },
        });
    }
    if (!comment) {
        throw new AppError(StatusCodes.NOT_FOUND, 'Comment not found!');
    }
    if (user?.role !== UserConstants.Roles.ADMIN && user?.id !== comment?.authorId) {
        throw new AppError(StatusCodes.BAD_REQUEST, 'Not allowed to delete this comment!');
    }
    const deletedComment = await prisma.comment.delete({
        where: {
            id,
        },
        select: { id: true },
    });
    return deletedComment;
};

const commentServices = {
    createComment,
    getCommentById,
    getCommentsByAuthor,
    deleteComment,
};

export default commentServices;
