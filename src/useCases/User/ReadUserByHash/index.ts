import { MysqlUserRepository } from "../../../repositories/implementations/MysqlUserRepository";
import { ReadUserByHashController } from "./ReadUserByHashController";
import { ReadUserByHashUseCase } from "./ReadUserByHashUseCase";

const  mysqlUserRepository = new MysqlUserRepository();

const readUserByHashUseCase = new ReadUserByHashUseCase(
    mysqlUserRepository
);

const readUserByHashController = new ReadUserByHashController(
    readUserByHashUseCase
);

export { readUserByHashUseCase, readUserByHashController }