import { HTTP_INTERNAL_SERVER_ERROR, HTTP_SUCCESS } from '../types/http-status';

const sayHello = (req: any, res: any, next: any) => {
    try {
        res.success(null, 'Hello dari aplikasi backend', HTTP_SUCCESS);
    } catch (error) {
        res.error('error', HTTP_INTERNAL_SERVER_ERROR, error);
        next(error as Error);
    }
};

export default sayHello;
