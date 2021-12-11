import { use } from "chai";
import { Request, Response } from "express";
import { ReadUserByUsernameUseCase } from "./ReadUserByUsernameUseCase";

export class ReadUserByUsernameController {
    constructor(
        private readUserByUsernameUseCase: ReadUserByUsernameUseCase,
    ){}

    async handle(req: Request, res: Response): Promise<Response> {
        const header = 'READ USER BY USERNAME';
        const username = req.params.username ? req.params.username.toString() : '';
        console.log(`${header} | Inicio`);
        console.log(`${header} | Username: ${username}`);
       try {
            const result = await this.readUserByUsernameUseCase.execute({username});
            console.log(`${header} | Resultado: ${result}`);
            return res.status(200).json({ result });
       } catch (err) {
           console.log(`${header} | Error: ${err}`);
           return res.status(400).json({
               message: err || 'Unexpected error.'
           });
       }
    }
}