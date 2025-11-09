import { Router } from 'express';
import sayHello from '../controllers/hello.controller';

const helloUser = Router();
// OpenAPI annotation for swagger-jsdoc
/**
 * @openapi
 * /:
 *   get:
 *     summary: Say hello
 *     tags:
 *       - Hello
 *     responses:
 *       200:
 *         description: Greeting response
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                 message:
 *                   type: string
 */
// wrap the handler to avoid TypeScript contextual typing forcing `res` to Express.Response
helloUser.get('/', (req, res, next) => sayHello(req, res, next));

export default helloUser;
