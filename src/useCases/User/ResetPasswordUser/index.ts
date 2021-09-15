import { JwtMiddlewareRepository } from "../../../repositories/implementations/JwtMiddlewareRepository";
import { MailerRepository } from "../../../repositories/implementations/MailerRepository";
import { MysqlUserRepository } from "../../../repositories/implementations/MysqlUserRepository";
import { ResetPasswordUserController } from "./ResetPasswordUserController";
import { ResetPasswordUserUseCase } from "./ResetPasswordUserUseCase";

const  mysqlUserRepository = new MysqlUserRepository();

const jwtMiddlewareRepository = new JwtMiddlewareRepository();

const mailerRepository = new MailerRepository();

const resetPasswordUserUseCase = new ResetPasswordUserUseCase(
    mysqlUserRepository,
    jwtMiddlewareRepository,
    mailerRepository
);

const resetPasswordUserController = new ResetPasswordUserController(
    resetPasswordUserUseCase
);

export { resetPasswordUserUseCase, resetPasswordUserController }