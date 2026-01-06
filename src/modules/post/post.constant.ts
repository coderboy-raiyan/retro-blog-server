import { PostStatus } from '../../../generated/prisma/enums';

const postStatus = {
    DRAFT: 'DRAFT',
    PUBLISHED: 'PUBLISHED',
    ARCHIVED: 'ARCHIVED',
} as const satisfies Record<PostStatus, PostStatus>;

const PostConstants = {
    postStatus,
};

export default PostConstants;
