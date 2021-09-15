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
        facebook,
        linkedin,
        twitter,
        telephone,
        instagram,
        whatsapp,
        telegram,
        tiktok,
        spotify,
        youtube,
        wildcard_1,
        wildcard_2,
        wildcard_3,
        end_state,
        end_city,
        end_number,
        end_district,
        end_cep
        } = req.body;

       try {
            const result = await this.createUserUseCase.execute({
                name,
                surname,
                email,
                bio,
                username,
                password,
                facebook,
                linkedin,
                twitter,
                telephone,
                instagram,
                whatsapp,
                telegram,
                tiktok,
                spotify,
                youtube,
                wildcard_1,
                wildcard_2,
                wildcard_3,
                end_state,
                end_city,
                end_number,
                end_district,
                end_cep
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