/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import catchAsyncError from '../utils/catchAsyncError';
import sendResponse from '../utils/sendResponse';

const notFound = catchAsyncError((req: Request, res: Response, next: NextFunction) => {
    return sendResponse(res, {
        status: StatusCodes.NOT_FOUND,
        success: false,
        message: `Path ${req?.url} not found!`,
    });
});

export default notFound;
