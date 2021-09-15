export interface IResetPasswordUserRequestDTO {
    token: string;
    password: string;
    email: string;
}