import { Request, Response } from "express";
import { UpdateUserUseCase } from "./UpdateUserUseCase";

export class UpdateUserController {
    constructor(
        private updateUserUseCase: UpdateUserUseCase,
    ){}

    async handle(req: Request, res: Response): Promise<Response> {
        const header = 'UPDATE USER';
        console.log(`${header} | Inicio`);
        const hash = req.params.hash ? req.params.hash.toString() : '';
        console.log(`${header} | Hash: ${hash}`);
        const {
            name,
            surname,
            bio,
            telephone,
            end_state,
            end_city,
            end_number,
            end_district,
            end_cep
        } = req.body;

        const image = req.file;

       try {
            const result = await this.updateUserUseCase.execute({
                hash,
                name,
                surname,
                bio,
                telephone,
                end_state,
                end_city,
                end_number,
                end_district,
                end_cep,
                image
           });

           return res.status(200).json({ result });
       } catch (err) {
           console.log(`${header} | Error: ${err}`);
           return res.status(400).json({
               message: err || 'Unexpected error.'
           });
       }
    }
}