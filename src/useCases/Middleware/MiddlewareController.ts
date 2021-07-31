import { NextFunction, Request, Response } from "express";
import { MiddlewareUseCase } from "./MiddlewareUseCase";

export class MiddlewareController {
    constructor(
        private middlewareUseCase: MiddlewareUseCase,
    ){}

    async handle(req: Request, res: Response, next: NextFunction): Promise<Response | undefined> {
        const header = 'MIDDLEWARE';
       try {
            console.log(`${header} | Inicio`);
            const token = req.headers.token ? req.headers.token.toString() : 'undefined';
            const response = await this.middlewareUseCase.execute({
                token
           });
           console.log(`${header} | Resultado: ${response}`);
           switch(response) {
                case 0: 
                    return res.status(401).json({
                        message: 'No token provided.'
                    });

                case 1:
                    return res.status(401).json({
                        message: 'Token invalid.'
                    });

                case 2:
                    next();
                break;

                case 3: 
                    return res.status(401).json({
                        message: 'Login invalid.'
                    });

                case 4: 
                    return res.status(401).json({
                        message: 'Token in black list.'
                    });
            }
       } catch (err) {
           console.log(`${header} | Error: ${err}`);
           return res.status(400).json({
               message: err || 'Unexpected error.'
           });
       }
    }
}