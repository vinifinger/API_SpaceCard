import { Router, Request, Response, NextFunction } from 'express';
import uploads from '../utils/upload';
import { createUserController } from '../useCases/User/CreateUser';
import { readUserController } from '../useCases/User/ReadUser';
import { readUserByUsernameController } from '../useCases/User/ReadUserByUsername';
import { loginUserController } from '../useCases/User/LoginUser';
import { forgotPasswordUserController } from '../useCases/User/ForgotPasswordUser';
import { resetPasswordUserController } from '../useCases/User/ResetPasswordUser';
import { body, ValidationChain, validationResult } from 'express-validator';
const publicRoutes = Router();

// publicRoutes.post('/v1/car', (request: Request, response: Response) => {
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

publicRoutes.post('/user',
    uploads.single('image'),
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

publicRoutes.get('/user', (request: Request, response: Response) => {
    return readUserController.handle(request, response);
});

publicRoutes.get('/user/:username', (request: Request, response: Response) => {
    return readUserByUsernameController.handle(request, response);
});

publicRoutes.post('/user/login', 
    validate([
        body('email').normalizeEmail().isEmail(),
        body('password').isString()
    ]),
    (request: Request, response: Response) => {
        const errors = validationResult(request);
        if (!errors.isEmpty()) {
            return response.status(400).json({ errors: errors.array() });
        }
    
        return loginUserController.handle(request, response);
});

publicRoutes.post('/user/forgot', 
    validate([
        body('email').normalizeEmail().isEmail()
    ]),
    (request: Request, response: Response) => {
        const errors = validationResult(request);
        if (!errors.isEmpty()) {
            return response.status(400).json({ errors: errors.array() });
        }
        
        return forgotPasswordUserController.handle(request, response);
});

publicRoutes.post('/user/resetpassword/:token', 
    validate([
        body('password').isStrongPassword()
    ]),
    (request: Request, response: Response) => {
        const errors = validationResult(request);
        if (!errors.isEmpty()) {
            return response.status(400).json({ errors: errors.array() });
        }

        return resetPasswordUserController.handle(request, response);
});
export { publicRoutes };