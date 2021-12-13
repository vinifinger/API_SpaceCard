import { Router, Request, Response, NextFunction } from 'express';
import { readUserController } from '../useCases/User/ReadUser';
import { updateUserController } from '../useCases/User/UpdateUser';
import { readUserByHashController } from '../useCases/User/ReadUserByHash';
import { deleteUserController } from '../useCases/User/DeleteUser';
import { body, ValidationChain, validationResult } from 'express-validator';
import uploads from '../utils/upload';
const userRoutes = Router();

// userRoutes.post('/v1/car', (request: Request, response: Response) => {
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

userRoutes.get('/v1/user', (request: Request, response: Response) => {
    return readUserController.handle(request, response);
});

userRoutes.get('/v1/user/:hash', (request: Request, response: Response) => {
    return readUserByHashController.handle(request, response);
});

userRoutes.patch('/v1/user/:hash', 
    uploads.single('image'),
    validate([
        body('name').optional().isString(),
        body('surname').optional().isString(),
        body('bio').optional().isString(),
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
        body('end_cep').optional().isPostalCode('BR')
    ]),
    (request: Request, response: Response) => {
        const errors = validationResult(request);
        if (!errors.isEmpty()) {
            return response.status(400).json({ errors: errors.array() });
        }

        return updateUserController.handle(request, response);
});

userRoutes.delete('/v1/user/:hash', (request: Request, response: Response) => {
    return deleteUserController.handle(request, response);
});

export { userRoutes };