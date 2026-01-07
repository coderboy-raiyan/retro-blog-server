import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import catchAsyncError from '../../utils/catchAsyncError.utils';
import sendResponse from '../../utils/sendResponse';
import commentServices from './comment.service';

const createComment = catchAsyncError(async (req: Request, res: Response) => {
    const data = await commentServices.createComment({ ...req?.body, authorId: req?.user?.id });
    return sendResponse(res, {
        status: StatusCodes.CREATED,
        success: true,
        message: 'Comment created successfully',
        data,
    });
});
const getCommentById = catchAsyncError(async (req: Request, res: Response) => {
    const data = await commentServices.getCommentById(req?.params?.id);
    return sendResponse(res, {
        status: StatusCodes.OK,
        success: true,
        message: 'Comment retrieved successfully',
        data,
    });
});
const getCommentsByAuthorId = catchAsyncError(async (req: Request, res: Response) => {
    const data = await commentServices.getCommentsByAuthor(req?.user?.id);
    return sendResponse(res, {
        status: StatusCodes.OK,
        success: true,
        message: 'Author comments retrieved successfully',
        data,
    });
});
const deleteComment = catchAsyncError(async (req: Request, res: Response) => {
    const data = await commentServices.deleteComment(req?.params?.id, req?.user);
    return sendResponse(res, {
        status: StatusCodes.OK,
        success: true,
        message: 'comment deleted successfully',
        data,
    });
});
const updateComment = catchAsyncError(async (req: Request, res: Response) => {
    const data = await commentServices.updateComment(req?.params?.id, req.body, req?.user);
    return sendResponse(res, {
        status: StatusCodes.OK,
        success: true,
        message: 'comment updated successfully',
        data,
    });
});

const commentControllers = {
    createComment,
    getCommentById,
    getCommentsByAuthorId,
    deleteComment,
    updateComment,
};

export default commentControllers;
