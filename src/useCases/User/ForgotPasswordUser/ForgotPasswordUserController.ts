import { Request, Response } from "express";
import { ForgotPasswordUserUseCase } from "./ForgotPasswordUserUseCase";

export class ForgotPasswordUserController {
    constructor(
        private forgotPasswordUserUseCase: ForgotPasswordUserUseCase,
    ){}

    async handle(req: Request, res: Response): Promise<Response> {
        const header = 'FORGOT PASSWORD USER'; 
       const {
            email
       } = req.body;

       try {
           console.log(`${header} | Inicio`);
            const result = await this.forgotPasswordUserUseCase.execute({
                email    
           });
           console.log(`${header} | Resultado: ${result}`);
           return res.status(201).json({ result });
       } catch (err) {
           console.log(`${header} | Error: ${err}`);
           return res.status(400).json({
               message: err || 'Unexpected error.'
           });
       }
    }
} 