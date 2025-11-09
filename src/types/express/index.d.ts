import 'express';

declare global {
    namespace Express {
        interface Response {
            success: (data?: any, message?: string, status?: number) => void;
            error: (message?: string, status?: number, errors?: any) => void;
        }
    }
}
