import { enc, AES } from "crypto-ts";
import { Token } from "../../../entities/Token";
import { User } from "../../../entities/User";
import { IMailerRepository } from "../../../repositories/IMailerRepository";
import { IMiddlewareRepository } from "../../../repositories/IMiddlewareRepository";
import { IUserRepository } from "../../../repositories/IUserRepository";
import { IResetPasswordUserRequestDTO } from "./ResetPasswordUserDTO";

export class ResetPasswordUserUseCase {
    constructor(
        private userRepository: IUserRepository,
        private middlewareRepository: IMiddlewareRepository,
        private mailerRepository: IMailerRepository 
    ){}
    
    async execute(data: IResetPasswordUserRequestDTO) {
        const token = new Token(data);
        
        const content = await this.userRepository.findUserbyemail(String(token.email));
        console.log(content.hash); 
        const user = new User({hash: content.hash, password: token.password, reset_password_token: null}, content.hash);
        user.password = AES.encrypt(String(user.password), String(process.env.SECRET_STRING)).toString();
        await this.userRepository.resetPasswordUser(user);
        await this.mailerRepository.mailerPasswordChanged(token);

        return;
    }
}