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

const commentControllers = {
    createComment,
};

export default commentControllers;
