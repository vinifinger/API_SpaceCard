import { Token } from "../../../entities/Token";
import { User } from "../../../entities/User";
import { IUserRepository } from "../../../repositories/IUserRepository";
import { ICreateUserRequestDTO } from "./CreateUserDTO";
import { AES } from "crypto-ts";

export class CreateUserUseCase {
    constructor(
        private userRepository: IUserRepository 
    ){}
    
    async execute(data: ICreateUserRequestDTO) {
        const user = new User(data);
        
        const content = await this.userRepository.findUserbyemail(String(user.email));

        if (content.email) {
            throw 'Email already exists.';
        }

        user.password = AES.encrypt(String(user.password), String(process.env.SECRET_STRING)).toString();

        const params = await this.userRepository.createUser(user);
        const result = await this.userRepository.createToken(params);
        return new Token(result);
    }
}