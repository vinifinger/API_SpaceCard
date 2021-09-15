import { Token } from "../entities/Token";

export interface IMiddlewareRepository {
    verifyToken(token: Token): Promise<Number | void>;

    generatePasswordResetToken(token: Token): Promise<Error | Token>;

    verifyPasswordResetToken(token: Token);
}