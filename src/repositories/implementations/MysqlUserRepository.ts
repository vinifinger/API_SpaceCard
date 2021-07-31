import { db } from "../../database/connection";
import { Token } from "../../entities/Token";
import { User } from "../../entities/User";
import { IUserRepository } from "../IUserRepository";
import jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv';
import { AES, enc } from "crypto-ts";
dotenv.config();

export class MysqlUserRepository implements IUserRepository {
    async findUserbyemail(email: string): Promise<User> {
        try {
            const result = await db('user').where('email', email);

            return new User(result[0]);
        } catch (err) {
            throw err;
        }
    }

    async createUser(user: User): Promise<User> {
    
        const {
            hash,
            name,
            surname,
            email,
            facebook,
            linkedin,
            twitter,
            password,
            telephone,
            instagram,
            whatsapp,
            telegram,
            tiktok,
            spotify,
            youtube,
            wildcard_1,
            wildcard_2,
            wildcard_3,
            end_state,
            end_city,
            end_number,
            end_district,
            end_cep
        } = user;

        const trx = await db.transaction();

        try {
            
            await trx('user').insert({
                hash,
                name,
                surname,
                email,
                facebook,
                linkedin,
                status: 1,
                twitter,
                password,
                telephone,
                instagram,
                whatsapp,
                telegram,
                tiktok,
                spotify,
                youtube,
                wildcard_1,
                wildcard_2,
                wildcard_3,
                end_state,
                end_city,
                end_number,
                end_district,
                end_cep
            });

            trx.commit();

            return user;
        } catch (err) {
            throw err;
        }
    };

    async readUser(): Promise<User[]> {

        try {
            
            const data = await db('user').where('status', 1);
            const users:User[] = [];
            data.forEach((i) => {
                users.push(new User(i, i.hash));
            });

            return users;

        } catch (err) {
            throw err;
        }
    };

    async readUserByHash(user: User): Promise<User> {

        const { hash } = user;

        if (!hash) {
            throw 'No hash provided.';
        }

        try {
            
            const data = await db('user').where('status', 1).andWhere('hash', hash);

            if (!data[0])
                throw 'Hash invalid.';

            return new User(data[0], data[0].hash);

        } catch (err) {
            throw err;
        }
    };

    async updateUser(user: User): Promise<number | Error> {

        const {
            hash,
            name,
            surname,
            email,
            facebook,
            linkedin,
            status,
            twitter,
            password,
            telephone,
            instagram,
            whatsapp,
            telegram,
            tiktok,
            spotify,
            youtube,
            wildcard_1,
            wildcard_2,
            wildcard_3,
            end_state,
            end_city,
            end_number,
            end_district,
            end_cep
        } = user;

        try {
            
            const trx = await db.transaction();

            await trx('user').update({
                name,
                surname,
                email,
                facebook,
                linkedin,
                status,
                twitter,
                password,
                telephone,
                instagram,
                whatsapp,
                telegram,
                tiktok,
                spotify,
                youtube,
                wildcard_1,
                wildcard_2,
                wildcard_3,
                end_state,
                end_city,
                end_number,
                end_district,
                end_cep
            }).where('hash', hash);

            trx.commit();

            return 1;
        } catch (err) {
            throw err;
        }
    };

    async deleteUser(user: User): Promise<number | Error> {
        
        const { hash } = user;
        
        const trx = await db.transaction();

        try {
            
            await trx('user').update({
                status: 0
            }).where('hash', hash);

            trx.commit();

            return 1;
        } catch (err) {
            throw err;
        }
    };

    async createToken(user: User): Promise<Token> {
        const result = { token: '' };
        (user)
         result.token = jwt.sign({ user }, String(process.env.SECRET_STRING), {
            expiresIn: 28800
        });
        (result)


        return new Token(result);
    };

    async loginUser(user: User): Promise<User> {

        const {
            email,
            password
        } = user;

        try {
            const data = await db('user').where('email', email).limit(1);

            if (!data.length) 
                throw 'Invalid email and / or password.';

            const decryptPassword = AES.decrypt(data[0].password, String(process.env.SECRET_STRING)).toString(enc.Utf8);
            if (decryptPassword == password){
                const users = new User(data[0]);

                return users;
            } else {
                throw 'Invalid email and / or password.';
            }

            
        } catch (err) {
            throw err;
        }
    }

    async deleteToken(token: Token): Promise<void> {
        try {

            await db('blackList').insert({
                token: token.token
            });

            return;
        } catch (err) {
            throw err;
        }
    };
}