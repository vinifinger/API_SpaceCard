import { Token } from "../../../entities/Token";
import { User } from "../../../entities/User";
import { IFirabaseRepository } from "../../../repositories/IFirebaseReposity";
import { IUserRepository } from "../../../repositories/IUserRepository";
import { IUpdateUserRequestDTO } from "./UpdateUserDTO";

export class UpdateUserUseCase {
    constructor(
        private userRepository: IUserRepository,
        private firabaseReposity: IFirabaseRepository 
    ){}
    
    async execute(data: IUpdateUserRequestDTO) {
        const user = new User(data, data.hash);
        
        await this.userRepository.readUserByHash(user);

        if (user.image) 
            user.imageUrl = await this.firabaseReposity.uploadImageAvatar(user); 
        return await this.userRepository.updateUser(user);
    }
}