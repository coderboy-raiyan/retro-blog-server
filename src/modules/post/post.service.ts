import { Post, User } from '../../../generated/prisma/client';
import { EnumPostStatusFilter, PostWhereInput } from '../../../generated/prisma/models';
import { prisma } from '../../lib/prisma';
import PostConstants from './post.constant';

const getAllPosts = async (searchParams?: URLSearchParams) => {
    const additionalFields: PostWhereInput[] = [];

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
        Object.keys(PostConstants.postStatus).includes(searchParams.get('status'))
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

    const result = await prisma.post.findMany({
        where: {
            AND: additionalFields,
        },
    });
    return result;
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

const postServices = {
    createPost,
    getAllPosts,
};

export default postServices;
