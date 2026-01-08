import { StatusCodes } from 'http-status-codes';
import { Post, PostStatus, User } from '../../../generated/prisma/client';
import { EnumPostStatusFilter } from '../../../generated/prisma/models';
import { prisma } from '../../lib/prisma';
import AppError from '../../utils/AppError.utils';
import paginationSortingHelper, { TSortOrder } from '../../utils/paginationSorting.utils';
import commentConstants from '../comment/comment.constant';
import UserConstants from '../user/user.constant';

const getAllPosts = async (searchParams?: URLSearchParams) => {
    const additionalFields = [];

    if (searchParams.has('search')) {
        const search = searchParams?.get('search');
        additionalFields.push({
            OR: [
                {
                    title: {
                        contains: search,
                        mode: 'insensitive',
                    },
                },
                {
                    content: {
                        contains: search,
                        mode: 'insensitive',
                    },
                },
                {
                    tags: {
                        has: search,
                    },
                },
            ],
        });
    }

    if (searchParams.has('tags')) {
        const tags = searchParams?.get('tags')?.split(',');
        additionalFields.push({
            tags: {
                hasEvery: tags,
            },
        });
    }

    if (
        searchParams.has('isFeature') &&
        (searchParams.get('isFeature') === 'true' || searchParams.get('isFeature') === 'false')
    ) {
        const isFeature = Boolean(searchParams.get('isFeature'));
        additionalFields.push({
            isFeature: isFeature,
        });
    }

    if (
        searchParams.has('status') &&
        Object.keys(PostStatus).includes(searchParams.get('status'))
    ) {
        additionalFields.push({
            status: searchParams.get('status') as EnumPostStatusFilter<'Post'>,
        });
    }

    if (searchParams.has('authorId')) {
        additionalFields.push({
            authorId: searchParams.get('authorId'),
        });
    }

    const { skip, limit, orderBy, page } = paginationSortingHelper({
        page: searchParams?.get('page'),
        limit: searchParams?.get('limit'),
        sortBy: searchParams?.get('sortBy'),
        sortOrder: searchParams?.get('sortOrder') as TSortOrder,
    });

    const posts = await prisma.post.findMany({
        where: {
            AND: additionalFields,
        },
        skip,
        take: limit,
        orderBy,
        include: {
            _count: {
                select: { comments: true },
            },
        },
    });

    const total = await prisma.post.count({
        where: {
            AND: additionalFields,
        },
    });

    return {
        data: posts,
        pagination: {
            total,
            page,
            limit,
            totalPage: Math.ceil(total / limit),
        },
    };
};

const createPost = async (
    payload: Omit<Post, 'id' | 'createdAt' | 'updatedAt'>,
    user: Partial<User>
) => {
    const result = await prisma.post.create({
        data: {
            ...payload,
            authorId: user?.id,
        },
    });
    return result;
};

const getPostById = async (postId: string) => {
    const result = await prisma.$transaction(async tx => {
        await tx.post.update({
            where: {
                id: postId,
            },
            data: {
                views: {
                    increment: 1,
                },
            },
        });
        const post = await tx.post.findUnique({
            where: {
                id: postId,
            },
            include: {
                comments: {
                    orderBy: {
                        createdAt: 'desc',
                    },
                    where: {
                        parentId: null,
                        status: commentConstants.CommentStatus.APPROVED,
                    },
                    include: {
                        replies: {
                            where: {
                                status: commentConstants.CommentStatus.APPROVED,
                            },
                            include: {
                                replies: {
                                    where: {
                                        status: commentConstants.CommentStatus.APPROVED,
                                    },
                                },
                            },
                        },
                    },
                },
                _count: {
                    select: {
                        comments: true,
                    },
                },
            },
        });
        return post;
    });
    return result;
};

const getMyPosts = async ({ id }: Partial<User>) => {
    const posts = await prisma.post.findMany({
        where: {
            authorId: id,
        },
        orderBy: {
            createdAt: 'desc',
        },
        include: {
            _count: {
                select: {
                    comments: true,
                },
            },
        },
    });

    const total = await prisma.post.aggregate({
        where: {
            authorId: id,
        },
        _count: {
            id: true,
        },
    });

    return { posts: posts, total };
};

const updatePost = async (postId: string, data: Partial<Post>, user: Partial<User>) => {
    const post = await prisma.post.findUnique({
        where: {
            id: postId,
            authorId: user?.id,
        },
    });
    if (!post) {
        throw new AppError(StatusCodes.NOT_FOUND, 'Post not found!');
    }
    if (post?.authorId !== user?.id && user?.role !== UserConstants.Roles.ADMIN) {
        throw new AppError(StatusCodes.UNAUTHORIZED, 'You are not allowed to edit this post!');
    }
    if (user?.role !== UserConstants.Roles.ADMIN) {
        delete data?.isFeature;
    }
    const result = await prisma.post.update({
        where: {
            id: postId,
        },
        data,
    });
    return result;
};

const postServices = {
    createPost,
    getAllPosts,
    getPostById,
    getMyPosts,
    updatePost,
};

export default postServices;
