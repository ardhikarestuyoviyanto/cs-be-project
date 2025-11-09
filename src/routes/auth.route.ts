import { Router } from 'express';
import signUp from '../controllers/auth/sign-up.controller';

const authRouter = Router();

/**
 * @openapi
 * /auth/sign-up:
 *   post:
 *     summary: Register new user and company
 *     tags:
 *       - Auth
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               user:
 *                 type: object
 *                 properties:
 *                   name:
 *                     type: string
 *                     example: "John Doe"
 *                   email:
 *                     type: string
 *                     format: email
 *                     example: "john@example.com"
 *                   password:
 *                     type: string
 *                     example: "secret123"
 *               company:
 *                 type: object
 *                 properties:
 *                   name:
 *                     type: string
 *                     example: "Acme Inc"
 *                   phoneNumber:
 *                     type: string
 *                     example: "08123456789"
 *                   address:
 *                     type: string
 *                     example: "Jl. Sudirman No. 10"
 *                   email:
 *                     type: string
 *                     format: email
 *                     example: "contact@acme.com"
 *     responses:
 *       201:
 *         description: User successfully registered
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: "User signed up successfully"
 *       422:
 *         description: Validation error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 errors:
 *                   type: object
 *                   example:
 *                     user.name: ["Nama wajib diisi"]
 *                     user.email: ["Format email tidak valid"]
 *                     company.phoneNumber: ["Nomor telepon wajib diisi"]
 */
authRouter.post('/sign-up', (req, res, next) => signUp(req, res, next));

export default authRouter;
