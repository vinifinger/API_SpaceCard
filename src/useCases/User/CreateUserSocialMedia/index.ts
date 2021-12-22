import { FirebaseRepository } from "../../../repositories/implementations/FirebaseRepository";
import { MysqlUserRepository } from "../../../repositories/implementations/MysqlUserRepository";
import { CreateUserSocialMediaController } from "./CreateUserSocialMediaController";
import { CreateUserSocialMediaUseCase } from "./CreateUserSocialMediaUseCase";

const  mysqlUserRepository = new MysqlUserRepository();
const firabaseRepository = new FirebaseRepository();

const createUserSocialMediaUseCase = new CreateUserSocialMediaUseCase(
    mysqlUserRepository,
    firabaseRepository
);

const createUserSocialMediaController = new CreateUserSocialMediaController(
    createUserSocialMediaUseCase
);

export { createUserSocialMediaUseCase, createUserSocialMediaController }