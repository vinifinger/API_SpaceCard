import { db } from "../../database/connection";
import { Token } from "../../entities/Token";
import { User } from "../../entities/User";
import { IUserRepository } from "../IUserRepository";
import jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv';
import { AES, enc } from "crypto-ts";
import { Paginate } from "../../entities/Paginate";
import { DataPaginate } from "../../entities/DataPaginate";
import { SocialMedia } from "../../entities/SocialMedia";
import { DataUserSocialMedia } from "../../entities/DataUserSocialMedia";
dotenv.config();

export class MysqlUserRepository implements IUserRepository {
    async findUserbyemail(email: string): Promise<User> {
        try {
            const result = await db('user').where('email', email).andWhere('status', 1);

            return (result[0] ? new User(result[0], result[0].hash) : new User(result[0]));
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
            bio,
            username,
            password,
            telephone,
            end_state,
            end_city,
            end_number,
            end_district,
            end_cep,
            imageUrl
        } = user;

        const trx = await db.transaction();

        try {
            
            await trx('user').insert({
                hash,
                name,
                surname,
                email,
                bio,
                username,
                password,
                telephone,
                end_state,
                end_city,
                end_number,
                end_district,
                end_cep,
                imageUrl
            });

            trx.commit();

            return user;
        } catch (err) {
            throw err;
        }
    };

    async createUserSocialMedia(user: User, socialMedia: SocialMedia) {
        const {
            facebook,
            linkedin,
            twitter,
            instagram,
            whatsapp,
            telegram,
            tiktok,
            spotify,
            youtube,
            wildcard_1,
            wildcard_2,
            wildcard_3,
        } = socialMedia;

        const items = new Array;

        (facebook ? items.push('facebook') : null);
        (linkedin ? items.push('linkedin') : null);
        (twitter ? items.push('twitter') : null);
        (instagram ? items.push('instagram') : null);
        (whatsapp ? items.push('whatsapp') : null);
        (telegram ? items.push('telegram') : null);
        (tiktok ? items.push('tiktok') : null);
        (spotify ? items.push('spotify') : null);
        (youtube ? items.push('youtube') : null);
        (wildcard_1 ? items.push('wildcard_1') : null);
        (wildcard_2 ? items.push('wildcard_2') : null);
        (wildcard_3 ? items.push('wildcard_3') : null);

        const id_user = user.id;

        const trx = await db.transaction();

        try {
            await trx('social_media')
            .insert({
                id_user,
                facebook,
                linkedin,
                twitter,
                instagram,
                whatsapp,
                telegram,
                tiktok,
                spotify,
                youtube,
                wildcard_1,
                wildcard_2,
                wildcard_3
            })
            .onConflict('id_user')
            .merge(items);

            trx.commit();
        } catch (err) {
            throw err;
        }
    }

    async readSocialMedia(): Promise<SocialMedia> {
        try {
            const data = await db('social_media');

            return new SocialMedia(data[0]);
        } catch (err) {
            throw err;
        }
    }

    async readUser(paginate: Paginate): Promise<DataPaginate> {

        const { page, limit } = paginate;

        try {
            
            const data = await db.select(
                'hash', 
                'name', 
                'surname', 
                'email', 
                'bio', 
                'username', 
                'telephone', 
                'imageUrl'
            ).from('user').where('status', 1).paginate({ perPage: limit, currentPage: page, isLengthAware: true });
            const users = new DataPaginate(data);

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

    async readUserByUsername(user: User): Promise<DataUserSocialMedia> {

        const { username } = user;

        if (!username) {
            throw 'No username provided.';
        }

        try {
            
            const user = await db.select(
                'hash', 
                'name', 
                'surname', 
                'email', 
                'bio', 
                'username', 
                'telephone', 
                'imageUrl'
                ).from('user').where('username', username);
                
            if (!user[0])
                throw 'Username invalid.';


            const social_media = await db('social_media').leftJoin('user', 'social_media.id_user', '=', 'user.id')
            .select(
                'facebook',
                'linkedin',
                'twitter',
                'instagram',
                'whatsapp',
                'telegram',
                'tiktok',
                'spotify',
                'youtube',
                'wildcard_1',
                'wildcard_2',
                'wildcard_3',
            ).where('user.username', username);

            if (!social_media[0])
                throw `Need to register user's social media links.`;
            
            const data = {
                user: user[0],
                social_media: social_media[0]
            }

            return data;

        } catch (err) {
            throw err;
        }
    };

    async updateUser(user: User): Promise<number | Error> {

        const {
            hash,
            name,
            surname,
            bio,
            telephone,
            end_state,
            end_city,
            end_number,
            end_district,
            end_cep,
            imageUrl
        } = user;

        try {
            
            const trx = await db.transaction();

            await trx('user').update({
                name,
                surname,
                bio,
                telephone,
                end_state,
                end_city,
                end_number,
                end_district,
                end_cep,
                imageUrl
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
        const result = { token: '', email: user.email, name: user.name };
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

            await db('black_list').insert({
                token: token.token
            });

            return;
        } catch (err) {
            throw err;
        }
    };

    async forgotPassword(token: Token): Promise<void | Error> {
        try {

            const trx = await db.transaction();

            await trx('user').update({
                reset_password_token: token.token
            }).where('email', token.email);

            trx.commit();

        return;
        } catch (err) {
            throw err;
        }
    };

    async resetPasswordUser(user: User): Promise<void | Error> {
        try {
            console.log(user);
            const {
                hash,
                password,
                reset_password_token
            } = user;

            const trx = await db.transaction();

            await trx('user').update({
                password,
                reset_password_token
            }).where('hash', hash);

            trx.commit();

        return;
        } catch (err) {
            throw err;
        }
    }
}