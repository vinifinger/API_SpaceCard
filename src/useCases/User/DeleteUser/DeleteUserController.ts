import { Request, Response } from "express";
import { DeleteUserUseCase } from "./DeleteUserUseCase";

export class DeleteUserController {
    constructor(
        private deleteUserUseCase: DeleteUserUseCase,
    ){}

    async handle(req: Request, res: Response): Promise<Response> {
        const header = 'DELETE USER';
        const hash = req.params.hash ? req.params.hash.toString() : '';

       try {
            const result = await this.deleteUserUseCase.execute({
                hash
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