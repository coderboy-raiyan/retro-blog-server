import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

function globalErrorHandler(error: any, req: Request, res: Response, next: NextFunction) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error });
}

export default globalErrorHandler;
