import { Paginate } from "../../../entities/Paginate";
import { Token } from "../../../entities/Token";
import { User } from "../../../entities/User";
import { IUserRepository } from "../../../repositories/IUserRepository";
import { IReadUserRequestDTO } from "./ReadUserDTO";

export class ReadUserUseCase {
    constructor(
        private userRepository: IUserRepository 
    ){}
    
    async execute(data: IReadUserRequestDTO) {
        const paginate = new Paginate(data);
        const response = await this.userRepository.readUser(paginate);
        return response; 
    }
}