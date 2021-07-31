import { Token } from "../../../entities/Token";
import { User } from "../../../entities/User";
import { IUserRepository } from "../../../repositories/IUserRepository";
import { IReadUserByHashRequestDTO } from "./ReadUserByHashDTO";

export class ReadUserByHashUseCase {
    constructor(
        private userRepository: IUserRepository 
    ){}
    
    async execute(data: IReadUserByHashRequestDTO) {
        const user = new User(data, data.hash);

        const content = await this.userRepository.readUserByHash(user);
        return content; 
    }
}