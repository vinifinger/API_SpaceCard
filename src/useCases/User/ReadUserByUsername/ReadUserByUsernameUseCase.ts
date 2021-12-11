import { Token } from "../../../entities/Token";
import { User } from "../../../entities/User";
import { IUserRepository } from "../../../repositories/IUserRepository";
import { IReadUserByUsernameRequestDTO } from "./ReadUserByUsernameDTO";

export class ReadUserByUsernameUseCase {
    constructor(
        private userRepository: IUserRepository 
    ){}
    
    async execute(data: IReadUserByUsernameRequestDTO) {
        const user = new User(data, data.username);

        const content = await this.userRepository.readUserByUsername(user);
        return content; 
    }
}