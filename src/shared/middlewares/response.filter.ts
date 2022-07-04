import { NextFunction, Request, Response } from 'express';
import { AppError } from './../error/AppError';

export default function (err: AppError, req: Request, res: Response, next: NextFunction) {
    res.status(err.statusCode).json({
        status: 'error',
        error: err.message,
    });
}