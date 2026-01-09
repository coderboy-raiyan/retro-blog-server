import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import catchAsyncError from '../../utils/catchAsyncError.utils';
import sendResponse from '../../utils/sendResponse';
import postServices from './post.service';

const createPost = catchAsyncError(async (req: Request, res: Response) => {
    const data = await postServices.createPost(req.body, req?.user);
    return sendResponse(res, {
        status: StatusCodes.CREATED,
        success: true,
        message: 'Post created successfully',
        data,
    });
});

const getAllPosts = catchAsyncError(async (req: Request, res: Response) => {
    const searchParams = new URLSearchParams((req?.query as Record<string, string>) || {});
    const data = await postServices.getAllPosts(searchParams);
    return sendResponse(res, {
        status: StatusCodes.OK,
        success: true,
        message: 'Posts retrieved successfully',
        data,
    });
});

const getPostById = catchAsyncError(async (req: Request, res: Response) => {
    const data = await postServices.getPostById(req?.params?.id);
    return sendResponse(res, {
        status: StatusCodes.OK,
        success: true,
        message: 'Post retrieved successfully',
        data,
    });
});
const getMyPosts = catchAsyncError(async (req: Request, res: Response) => {
    const data = await postServices.getMyPosts(req?.user);
    return sendResponse(res, {
        status: StatusCodes.OK,
        success: true,
        message: 'Posts retrieved successfully',
        data,
    });
});
const updatePost = catchAsyncError(async (req: Request, res: Response) => {
    const data = await postServices.updatePost(req?.params?.id, req?.body, req?.user);
    return sendResponse(res, {
        status: StatusCodes.OK,
        success: true,
        message: 'Post updated successfully',
        data,
    });
});
const deletePost = catchAsyncError(async (req: Request, res: Response) => {
    const data = await postServices.deletePost(req?.params?.id, req?.user);
    return sendResponse(res, {
        status: StatusCodes.OK,
        success: true,
        message: 'Post deleted successfully',
        data,
    });
});
const getStats = catchAsyncError(async (req: Request, res: Response) => {
    const data = await postServices.getStats();
    return sendResponse(res, {
        status: StatusCodes.OK,
        success: true,
        message: 'Post stats retrieved successfully',
        data,
    });
});

const postControllers = {
    createPost,
    getAllPosts,
    getPostById,
    getMyPosts,
    updatePost,
    deletePost,
    getStats,
};

export default postControllers;
