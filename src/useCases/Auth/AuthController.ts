import { NextFunction, Request, Response } from "express";
import { AuthUseCase } from "./AuthUseCase";

export class AuthController {
    constructor(
        private authUseCase: AuthUseCase,
    ){}

    async handle(req: Request, res: Response) {
        const header = 'AUTH';
       try {
            console.log(`${header} | Inicio`);
            const token = req.params.token ? req.params.token.toString() : 'undefined';
            const response = await this.authUseCase.execute({
                token
           });
           console.log(`${header} | Resultado: ${response}`);
           
           switch(response) {
            case 0: 
                return  'No token provided.';
            break;

            case 1:
                return 'Token invalid.';
            break;

            case 3: 
                return 'Email invalid.';
            break;

            default: 
                return response;
            break;
        }

       } catch (err) {
           console.log(`${header} | Error: ${err}`);
           return 
               message: err || 'Unexpected error.'
       }
    }
}