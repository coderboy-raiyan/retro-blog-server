import { Response } from 'express';

type TResponse<T> = {
    success: boolean;
    status: number;
    message: string;
    data: T;
};

function sendResponse<T>(res: Response, { status, success, message, data }: TResponse<T>) {
    return res.status(status).json({
        success,
        message,
        data,
    });
}

export default sendResponse;
