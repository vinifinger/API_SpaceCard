import { FirebaseRepository } from "../../../repositories/implementations/FirebaseRepository";
import { MysqlUserRepository } from "../../../repositories/implementations/MysqlUserRepository";
import { UpdateUserController } from "./UpdateUserController";
import { UpdateUserUseCase } from "./UpdateUserUseCase";

const  mysqlUserRepository = new MysqlUserRepository();
const firebaseRepository = new FirebaseRepository();

const updateUserUseCase = new UpdateUserUseCase(
    mysqlUserRepository,
    firebaseRepository
);

const updateUserController = new UpdateUserController(
    updateUserUseCase
);

export { updateUserUseCase, updateUserController }