import { MessageMail } from "../../entities/MessageMail";
import { Token } from "../../entities/Token";
import NodeMailer from "../../utils/nodeMailer";
import { IMailerRepository } from "../IMailerRepository";

export class MailerRepository implements IMailerRepository {
    async mailerPasswordReset(token: Token): Promise<void | Error> {
        try {
            const nodeMailer = new NodeMailer();
            const message = new MessageMail({
                token: token.token,
                email: token.email,
                subject: `Forgot Password | <${token.email}>`,
                body: `Clique no link para alterar a senha ${token.token}`
            });

            await nodeMailer.sendMail(message);

            return;
        } catch (err) {
            throw err;
        }
    }

    async mailerPasswordChanged(token: Token): Promise<void | Error> {
        try {
            const nodeMailer = new NodeMailer();
            const message = new MessageMail({
                token: token.token,
                email: token.email,
                subject: `Reset Password | <${token.email}>`,
                body: `Sua senha foi alterada para ${token.password}`
            });

            await nodeMailer.sendMail(message);

            return;
        } catch (err) {
            throw err;
        }
    };
}