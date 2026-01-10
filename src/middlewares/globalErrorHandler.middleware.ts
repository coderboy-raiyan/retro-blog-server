/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { Prisma } from '../../generated/prisma/client';
import config from '../config';

function globalErrorHandler(error: any, req: Request, res: Response, next: NextFunction) {
    let statusCode = StatusCodes.INTERNAL_SERVER_ERROR;
    let message = 'Internal Server Error!';

    // Validation errors - Missing or incorrect field types
    if (error instanceof Prisma.PrismaClientValidationError) {
        statusCode = StatusCodes.BAD_REQUEST;
        message = 'You provided incorrect field type or missing fields';
    }
    // Known request errors from Prisma with specific error codes
    else if (error instanceof Prisma.PrismaClientKnownRequestError) {
        // Connection & Database errors (P1xxx)
        if (error?.code === 'P1000') {
            statusCode = StatusCodes.UNAUTHORIZED;
            message = 'Database authentication failed - invalid credentials';
        } else if (error?.code === 'P1001') {
            statusCode = StatusCodes.SERVICE_UNAVAILABLE;
            message = 'Cannot reach database server - please check if the database is running';
        } else if (error?.code === 'P1002') {
            statusCode = StatusCodes.REQUEST_TIMEOUT;
            message = 'Database server connection timed out - please try again';
        } else if (error?.code === 'P1003') {
            statusCode = StatusCodes.NOT_FOUND;
            message = 'Database does not exist';
        } else if (error?.code === 'P1008') {
            statusCode = StatusCodes.REQUEST_TIMEOUT;
            message = 'Database operation timed out';
        } else if (error?.code === 'P1010') {
            statusCode = StatusCodes.FORBIDDEN;
            message = 'Access denied for the database user';
        } else if (error?.code === 'P1017') {
            statusCode = StatusCodes.SERVICE_UNAVAILABLE;
            message = 'Database server has closed the connection';
        }

        // Query & Data errors (P2xxx)
        else if (error?.code === 'P2000') {
            statusCode = StatusCodes.BAD_REQUEST;
            message = 'The provided value is too long for the column type';
        } else if (error?.code === 'P2001') {
            statusCode = StatusCodes.NOT_FOUND;
            message = 'Record does not exist in the database';
        } else if (error?.code === 'P2002') {
            statusCode = StatusCodes.CONFLICT;
            message = 'Unique constraint violation - duplicate value exists';
        } else if (error?.code === 'P2003') {
            statusCode = StatusCodes.BAD_REQUEST;
            message = 'Foreign key constraint failed - referenced record does not exist';
        } else if (error?.code === 'P2004') {
            statusCode = StatusCodes.BAD_REQUEST;
            message = 'Database constraint failed';
        } else if (error?.code === 'P2005') {
            statusCode = StatusCodes.INTERNAL_SERVER_ERROR;
            message = 'Stored value is invalid for the field type';
        } else if (error?.code === 'P2006') {
            statusCode = StatusCodes.BAD_REQUEST;
            message = 'Provided value is invalid for the field type';
        } else if (error?.code === 'P2007') {
            statusCode = StatusCodes.BAD_REQUEST;
            message = 'Data validation error';
        } else if (error?.code === 'P2008') {
            statusCode = StatusCodes.BAD_REQUEST;
            message = 'Failed to parse query';
        } else if (error?.code === 'P2009') {
            statusCode = StatusCodes.BAD_REQUEST;
            message = 'Failed to validate query';
        } else if (error?.code === 'P2010') {
            statusCode = StatusCodes.INTERNAL_SERVER_ERROR;
            message = 'Raw query execution failed';
        } else if (error?.code === 'P2011') {
            statusCode = StatusCodes.BAD_REQUEST;
            message = 'Null constraint violation - cannot insert null value';
        } else if (error?.code === 'P2012') {
            statusCode = StatusCodes.BAD_REQUEST;
            message = 'Missing required value';
        } else if (error?.code === 'P2013') {
            statusCode = StatusCodes.BAD_REQUEST;
            message = 'Missing required argument for field';
        } else if (error?.code === 'P2014') {
            statusCode = StatusCodes.BAD_REQUEST;
            message = 'Required relation violation - the change would break a relation';
        } else if (error?.code === 'P2015') {
            statusCode = StatusCodes.NOT_FOUND;
            message = 'Related record not found';
        } else if (error?.code === 'P2016') {
            statusCode = StatusCodes.BAD_REQUEST;
            message = 'Query interpretation error';
        } else if (error?.code === 'P2017') {
            statusCode = StatusCodes.BAD_REQUEST;
            message = 'Records are not connected in the relation';
        } else if (error?.code === 'P2018') {
            statusCode = StatusCodes.NOT_FOUND;
            message = 'Required connected records were not found';
        } else if (error?.code === 'P2019') {
            statusCode = StatusCodes.BAD_REQUEST;
            message = 'Input error - invalid data provided';
        } else if (error?.code === 'P2020') {
            statusCode = StatusCodes.BAD_REQUEST;
            message = 'Value out of range for the field type';
        } else if (error?.code === 'P2021') {
            statusCode = StatusCodes.NOT_FOUND;
            message = 'Table does not exist in the database';
        } else if (error?.code === 'P2022') {
            statusCode = StatusCodes.NOT_FOUND;
            message = 'Column does not exist in the database';
        } else if (error?.code === 'P2023') {
            statusCode = StatusCodes.INTERNAL_SERVER_ERROR;
            message = 'Inconsistent column data';
        } else if (error?.code === 'P2024') {
            statusCode = StatusCodes.REQUEST_TIMEOUT;
            message = 'Connection pool timeout - failed to acquire database connection';
        } else if (error?.code === 'P2025') {
            statusCode = StatusCodes.NOT_FOUND;
            message = 'Record not found - operation depends on one or more missing records';
        } else if (error?.code === 'P2026') {
            statusCode = StatusCodes.NOT_IMPLEMENTED;
            message = 'Database provider does not support this feature';
        } else if (error?.code === 'P2027') {
            statusCode = StatusCodes.INTERNAL_SERVER_ERROR;
            message = 'Multiple database errors occurred during query execution';
        } else if (error?.code === 'P2028') {
            statusCode = StatusCodes.INTERNAL_SERVER_ERROR;
            message = 'Transaction API error';
        } else if (error?.code === 'P2034') {
            statusCode = StatusCodes.CONFLICT;
            message = 'Transaction failed due to write conflict or deadlock - please retry';
        }
    }
    // Unknown request errors without error codes
    else if (error instanceof Prisma.PrismaClientUnknownRequestError) {
        message = 'Unknown database error occurred during query execution';
    }
    // Initialization errors
    else if (error instanceof Prisma.PrismaClientInitializationError) {
        statusCode = StatusCodes.SERVICE_UNAVAILABLE;
        message = 'Failed to initialize database connection';
    }
    // Rust panic errors
    else if (error instanceof Prisma.PrismaClientRustPanicError) {
        statusCode = StatusCodes.INTERNAL_SERVER_ERROR;
        message = 'Database engine crashed - please restart the application';
    }

    return res.status(statusCode).json({
        success: false,
        message,
        error,
        stack: config.NODE_ENV !== 'production' ? error?.stack : null,
    });
}

export default globalErrorHandler;
