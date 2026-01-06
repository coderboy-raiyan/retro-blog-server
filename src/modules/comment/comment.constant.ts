import { CommentStatus as PrismaCommentStatus } from '../../../generated/prisma/enums';

const CommentStatus = {
    APPROVED: 'APPROVED',
    REJECTED: 'REJECTED',
} as const satisfies Record<PrismaCommentStatus, PrismaCommentStatus>;

const commentConstants = {
    CommentStatus,
};
export default commentConstants;
