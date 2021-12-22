import { Request, Response } from "express";
import { CreateUserSocialMediaUseCase } from "./CreateUserSocialMediaUseCase";

export class CreateUserSocialMediaController {
    constructor(
        private createUserSocialMediaUseCase: CreateUserSocialMediaUseCase,
    ){}

    async handle(req: Request, res: Response): Promise<Response> {
        const header = 'CREATE USER SOCIAL MEDIA';   
        console.log(`${header} | Inicio`);
       const {
        facebook,
        linkedin,
        twitter,
        instagram,
        whatsapp,
        telegram,
        tiktok,
        spotify,
        youtube,
        wildcard_1,
        wildcard_2,
        wildcard_3
        } = req.body;

        const hash = req.params.hash ? req.params.hash.toString() : '';
        
        try {
            const result = await this.createUserSocialMediaUseCase.execute({
                hash,
                facebook,
                linkedin,
                twitter,
                instagram,
                whatsapp,
                telegram,
                tiktok,
                spotify,
                youtube,
                wildcard_1,
                wildcard_2,
                wildcard_3
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