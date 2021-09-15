import { JwtMiddlewareRepository } from "../../repositories/implementations/JwtMiddlewareRepository";
import { AuthController } from "./AuthController";
import { AuthUseCase } from "./AuthUseCase";

const  jwtMiddlewareRepository = new JwtMiddlewareRepository();

const authUseCase = new AuthUseCase(
    jwtMiddlewareRepository
);

const authController = new AuthController(
    authUseCase
);

export { authUseCase, authController }