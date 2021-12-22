import { Token } from "../../../entities/Token";
import { SocialMedia } from "../../../entities/SocialMedia";
import { IUserRepository } from "../../../repositories/IUserRepository";
import { ICreateUserSocialMediaRequestDTO } from "./CreateUserSocialMediaDTO";
import { AES } from "crypto-ts";
import { IFirabaseRepository } from "../../../repositories/IFirebaseReposity";
import { User } from "../../../entities/User";

export class CreateUserSocialMediaUseCase {
    constructor(
        private userRepository: IUserRepository,
        private firabaseReposity: IFirabaseRepository
    ){}
    
    async execute(data: ICreateUserSocialMediaRequestDTO) {
        const user = new User(data, data.hash);
        const socialMedia = new SocialMedia(data);
        const currentUser = new User(await this.userRepository.readUserByHash(user));
        return await this.userRepository.createUserSocialMedia(currentUser, socialMedia);
    }
}