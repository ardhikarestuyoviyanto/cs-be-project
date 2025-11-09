import { Router } from 'express';
import helloRoute from './hello.route';
import authRouter from './auth.route';

const router = Router();
router.use('/', helloRoute);
router.use('/auth', authRouter);

export default router;
