import { MysqlUserRepository } from "../../../repositories/implementations/MysqlUserRepository";
import { ReadUserByUsernameController } from "./ReadUserByUsernameController";
import { ReadUserByUsernameUseCase } from "./ReadUserByUsernameUseCase";

const  mysqlUserRepository = new MysqlUserRepository();

const readUserByUsernameUseCase = new ReadUserByUsernameUseCase(
    mysqlUserRepository
);

const readUserByUsernameController = new ReadUserByUsernameController(
    readUserByUsernameUseCase
);

export { readUserByUsernameUseCase, readUserByUsernameController }