import { Request, Response } from "express";
import { authController } from "../../Auth";
import { ResetPasswordUserUseCase } from "./ResetPasswordUserUseCase";

export class ResetPasswordUserController {
    constructor(
        private resetPasswordUserUseCase: ResetPasswordUserUseCase,
    ){}

    async handle(req: Request, res: Response): Promise<Response> {
        const auth = await authController.handle(req, res);
        if (typeof auth === 'string') {
            return res.status(401).json({ message: auth});
        } 
        
        const header = 'RESET PASSWORD USER'; 
        const { email } = auth;
        const { token } = req.params;
        const { password } = req.body;


       try {
           console.log(`${header} | Inicio`);
            const result = await this.resetPasswordUserUseCase.execute({
                token,
                password,
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