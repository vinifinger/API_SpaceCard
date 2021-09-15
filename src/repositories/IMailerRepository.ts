import { Token } from "../entities/Token";

export interface IMailerRepository {
    mailerPasswordReset(token: Token): Promise<void | Error>;

    mailerPasswordChanged(token: Token): Promise<void | Error>;
}