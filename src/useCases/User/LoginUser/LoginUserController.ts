import { Request, Response } from "express";
import { LoginUserUseCase } from "./LoginUserUseCase";

export class LoginUserController {
    constructor(
        private loginUserUseCase: LoginUserUseCase,
    ){}

    async handle(req: Request, res: Response): Promise<Response> {
        const header = 'LOGIN USER'; 
       const {
            email,
            password
       } = req.body;

       try {
           console.log(`${header} | Inicio`);
            const result = await this.loginUserUseCase.execute({
                email,
                password    
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