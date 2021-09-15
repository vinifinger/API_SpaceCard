import { enc, AES } from "crypto-ts";
import { Token } from "../../../entities/Token";
import { User } from "../../../entities/User";
import { IMailerRepository } from "../../../repositories/IMailerRepository";
import { IMiddlewareRepository } from "../../../repositories/IMiddlewareRepository";
import { IUserRepository } from "../../../repositories/IUserRepository";
import { IForgotPasswordUserRequestDTO } from "./ForgotPasswordUserDTO";

export class ForgotPasswordUserUseCase {
    constructor(
        private userRepository: IUserRepository,
        private middlewareRepository: IMiddlewareRepository,
        private mailerRepository: IMailerRepository 
    ){}
    
    async execute(data: IForgotPasswordUserRequestDTO) {
        const user = new User(data);
        
        const content = await this.userRepository.findUserbyemail(String(user.email));

        if (!content.email) {
            throw 'Email not exist.';
        }

        const token = await this.middlewareRepository.generatePasswordResetToken(user);
        await this.userRepository.forgotPassword(token);
        await this.mailerRepository.mailerPasswordReset(token);
        
        return;
    }
}