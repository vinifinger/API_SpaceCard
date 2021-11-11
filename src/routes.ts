import { Router, Request, Response, NextFunction } from 'express';
import { createUserController } from './useCases/User/CreateUser';
import { readUserController } from './useCases/User/ReadUser';
import { updateUserController } from './useCases/User/UpdateUser';
import { readUserByHashController } from './useCases/User/ReadUserByHash';
import { loginUserController } from './useCases/User/LoginUser';
import { deleteUserController } from './useCases/User/DeleteUser';
import { forgotPasswordUserController } from './useCases/User/ForgotPasswordUser';
import { resetPasswordUserController } from './useCases/User/ResetPasswordUser';
import { body, ValidationChain, validationResult } from 'express-validator';
const routes = Router();

// routes.post('/v1/car', (request: Request, response: Response) => {
//     return createMovieController.handle(request, response);
// });

// User ----------
const validate = (validations: ValidationChain[]) => {
    return async (req: Request, res: Response, next: NextFunction) => {
      for (let validation of validations) {
        await validation.run(req);
        // if (result.errors) console.log(result);
      }
  
      const errors = validationResult(req);
      if (errors.isEmpty()) {
        return next();
      }
  
      res.status(400).json({ errors: errors.array() });
    };
};

routes.post('/user',
    validate([
        body('name').isString(),
        body('surname').isString(),
        body('email').normalizeEmail().isEmail(),
        body('bio').optional().isString(),
        body('username').isString(),
        body('password').isStrongPassword(),
        body('facebook').optional().isURL(),
        body('linkedin').optional().isURL(),
        body('twitter').optional().isURL(),
        body('telephone').optional().isMobilePhone(['pt-BR']),
        body('instagram').optional().isURL(),
        body('whatsapp').optional().isURL(),
        body('telegram').optional().isURL(),
        body('tiktok').optional().isURL(),
        body('spotify').optional().isURL(),
        body('youtube').optional().isURL(),
        body('wildcard_1').optional().isURL(),
        body('wildcard_2').optional().isURL(),
        body('wildcard_3').optional().isURL(),
        body('end_state').optional(),
        body('end_city').optional(),
        body('end_number').optional(),
        body('end_district').optional(),
        body('end_cep').optional()
    ]),
    (request: Request, response: Response) => {
        const errors = validationResult(request);
        if (!errors.isEmpty()) {
            return response.status(400).json({ errors: errors.array() });
        }

        return createUserController.handle(request, response);
});

routes.get('/v1/user', (request: Request, response: Response) => {
    return readUserController.handle(request, response);
});

routes.get('/v1/user/:hash', (request: Request, response: Response) => {
    return readUserByHashController.handle(request, response);
});

routes.patch('/v1/user/:hash', (request: Request, response: Response) => {
    return updateUserController.handle(request, response);
});

routes.delete('/v1/user/:hash', (request: Request, response: Response) => {
    return deleteUserController.handle(request, response);
});

routes.post('/user/login', (request: Request, response: Response) => {
    return loginUserController.handle(request, response);
});

routes.post('/user/forgot', (request: Request, response: Response) => {
    return forgotPasswordUserController.handle(request, response);
});

routes.post('/auth/user/resetpassword/:token', (request: Request, response: Response) => {
    return resetPasswordUserController.handle(request, response);
});
export { routes };