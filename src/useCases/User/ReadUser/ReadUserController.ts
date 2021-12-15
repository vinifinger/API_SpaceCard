import { Request, Response } from "express";
import { ReadUserUseCase } from "./ReadUserUseCase";

export class ReadUserController {
    constructor(
        private readUserUseCase: ReadUserUseCase,
    ){}

    async handle(req: Request, res: Response): Promise<Response> {
        const header = 'READ USER';
        console.log(`${header} | Inicio`);
        const limit = Number(req.query.limit);
        const page = Number(req.query.page);

       try {
            const result = await this.readUserUseCase.execute({page, limit});
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