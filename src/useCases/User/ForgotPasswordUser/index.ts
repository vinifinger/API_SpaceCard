import { JwtMiddlewareRepository } from "../../../repositories/implementations/JwtMiddlewareRepository";
import { MailerRepository } from "../../../repositories/implementations/MailerRepository";
import { MysqlUserRepository } from "../../../repositories/implementations/MysqlUserRepository";
import { ForgotPasswordUserController } from "./ForgotPasswordUserController";
import { ForgotPasswordUserUseCase } from "./ForgotPasswordUserUseCase";

const  mysqlUserRepository = new MysqlUserRepository();

const jwtMiddlewareRepository = new JwtMiddlewareRepository();

const mailerRepository = new MailerRepository();

const forgotPasswordUserUseCase = new ForgotPasswordUserUseCase(
    mysqlUserRepository,
    jwtMiddlewareRepository,
    mailerRepository
);

const forgotPasswordUserController = new ForgotPasswordUserController(
    forgotPasswordUserUseCase
);

export { forgotPasswordUserUseCase, forgotPasswordUserController }