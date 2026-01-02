const postStatus = {
    DRAFT: 'DRAFT',
    PUBLISHED: 'PUBLISHED',
    ARCHIVED: 'ARCHIVED',
} as const;

const PostConstants = {
    postStatus,
};

export default PostConstants;
