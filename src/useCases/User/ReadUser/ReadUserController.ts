import { Request, Response } from "express";
import { ReadUserUseCase } from "./ReadUserUseCase";

export class ReadUserController {
    constructor(
        private readUserUseCase: ReadUserUseCase,
    ){}

    async handle(req: Request, res: Response): Promise<Response> {
        const header = 'READ USER';
        console.log(`${header} | Inicio`);
        const limit = req.query.limit ? Number(req.query.limit) : 0;
        const page = req.query.page ? Number(req.query.page) : 0;

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