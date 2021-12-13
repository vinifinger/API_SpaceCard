import { FirebaseRepository } from "../../../repositories/implementations/FirebaseRepository";
import { MysqlUserRepository } from "../../../repositories/implementations/MysqlUserRepository";
import { CreateUserController } from "./CreateUserController";
import { CreateUserUseCase } from "./CreateUserUseCase";

const  mysqlUserRepository = new MysqlUserRepository();
const firabaseRepository = new FirebaseRepository();

const createUserUseCase = new CreateUserUseCase(
    mysqlUserRepository,
    firabaseRepository
);

const createUserController = new CreateUserController(
    createUserUseCase
);

export { createUserUseCase, createUserController }