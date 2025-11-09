import { SignUpRequest } from '../../request/sign-up.request';
import { Request, Response, NextFunction } from 'express';
import { SignUpService } from '../../service/sign-up.service';

const signUpService = new SignUpService();
const signUp = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const requestSafe = SignUpRequest(req);
        if (!requestSafe.success) {
            return res.error('Validation error', 422, requestSafe.errors);
        }
        const signUp = await signUpService.signUp(
            requestSafe.data?.user,
            requestSafe.data?.company,
        );
        if (!signUp.success) {
            return res.error('Signup error', 422, signUp.errors);
        }
        return res.success(null, 'User signed up successfully', 201);
    } catch (error) {
        console.error('SignUp Error:', error);
        res.error(
            'Internal Server Error',
            500,
            error instanceof Error ? error.message : error,
        );
        return next(error);
    }
};

export default signUp;
