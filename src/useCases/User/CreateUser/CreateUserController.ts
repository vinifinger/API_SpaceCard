import { Request, Response } from "express";
import { CreateUserUseCase } from "./CreateUserUseCase";

export class CreateUserController {
    constructor(
        private createUserUseCase: CreateUserUseCase,
    ){}

    async handle(req: Request, res: Response): Promise<Response> {
        const header = 'CREATE USER';   
        console.log(`${header} | Inicio`);
       const {
        name,
        surname,
        email,
        bio,
        username,
        password,
        telephone,
        end_state,
        end_city,
        end_number,
        end_district,
        end_cep
        } = req.body;

        const image = req.file;
       try {
            const result = await this.createUserUseCase.execute({
                name,
                surname,
                email,
                bio,
                username,
                password,
                telephone,
                end_state,
                end_city,
                end_number,
                end_district,
                end_cep,
                image
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