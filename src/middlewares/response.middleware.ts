import { Request, Response, NextFunction, RequestHandler } from 'express';

export const responseHandler: RequestHandler = (
    req: Request,
    res: any,
    next: NextFunction,
) => {
    res.success = function (data = null, message = 'Success', status = 200) {
        return res.status(status).json({ success: true, message, data });
    };

    res.error = function (message = 'Error', status = 500, errors = null) {
        return res.status(status).json({ success: false, message, errors });
    };

    next();
};
