import { Token } from "../../entities/Token";
import { IMiddlewareRepository } from "../../repositories/IMiddlewareRepository";
import { IAuthDTO } from "./AuthDTO";

export class AuthUseCase {
    constructor(
        private middlewareRepository: IMiddlewareRepository
    ){}
    
    async execute(data: IAuthDTO) {
        const token = new Token(data);
        
        return await this.middlewareRepository.verifyPasswordResetToken(token);
    }   
}