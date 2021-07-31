import { Request, Response } from "express";
import { ReadUserByHashUseCase } from "./ReadUserByHashUseCase";

export class ReadUserByHashController {
    constructor(
        private readUserByHashUseCase: ReadUserByHashUseCase,
    ){}

    async handle(req: Request, res: Response): Promise<Response> {
        const header = 'READ USER BY HASH';
        const hash = req.params.hash ? req.params.hash.toString() : '';
        console.log(`${header} | Inicio`);
        console.log(`${header} | Hash: ${hash}`);
       try {
            const result = await this.readUserByHashUseCase.execute({hash});
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