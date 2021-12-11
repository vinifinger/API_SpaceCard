import { Paginate } from "../entities/Paginate";
import { Token } from "../entities/Token";
import { User } from "../entities/User";
import { DataPaginate } from "../entities/DataPaginate";

export interface IUserRepository {
    findUserbyemail(email: string): Promise<User>;

    createUser(user: User): Promise<User>;  
    
    readUser(paginate: Paginate): Promise<DataPaginate>;

    readUserByHash(User: User): Promise<User>;

    updateUser(user: User): Promise<number | Error>;

    deleteUser(user: User): Promise<number | Error>;

    loginUser(user: User): Promise<User>;

    createToken(user: User): Promise<Token>;

    deleteToken(token: Token): Promise<void>;

    forgotPassword(token: Token): Promise<void | Error>;

    resetPasswordUser(token: Token): Promise<void | Error>;
}