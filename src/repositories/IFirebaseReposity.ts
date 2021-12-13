import { User } from "../entities/User";

export interface IFirabaseRepository {
    uploadImageAvatar(user: User): Promise<string>;
}