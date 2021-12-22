import { Token } from '../../entities/Token';
import jwt from 'jsonwebtoken';
import { IMiddlewareRepository } from '../IMiddlewareRepository';
import { db } from '../../database/connection';
import * as dotenv from 'dotenv';
import { User } from '../../entities/User';
dotenv.config();
export class JwtMiddlewareRepository implements IMiddlewareRepository {
    async verifyToken(token: Token): Promise<Number | void> {
        
        const data = token.token;

        if (data === 'undefined')
            return 0; // No token provided

            
        return jwt.verify(String(data), String(process.env.SECRET_STRING), async (err, decoded) => {
            if (err) 
                return 1; // Token invalid
            
            if (decoded) {    
                decoded.user.token = data;
                const token = new Token(decoded.user);

                try {    
                    
                    const content = await db('user')
                    .where('email', token.email)
                    .andWhere('password', token.password)
                    .limit(1);

                    if (content.length) {
                        const response = await db('black_list')
                        .where('hash', token.token);

                        if (response.length)
                            return 4;
                        
                        return 2;
                    }

                    return 3;
                } catch (error) {
                    throw error;
                }
            } else {
                return 1;
            }
        });
    }

    async generatePasswordResetToken(user: User): Promise<Token | Error> {
        const result = { token: '', email: user.email, name: user.name };
        (user)
         result.token = jwt.sign({ user }, String(process.env.SECRET_STRING), {
            expiresIn: 3600
        });
        (result)


        return new Token(result);
    };

    async verifyPasswordResetToken(token: Token) {
        const data = token.token;

        if (data === 'undefined')
            return 0; // No token provided

            
        return jwt.verify(String(data), String(process.env.SECRET_STRING), async (err, decoded) => {
            if (err) 
                return 1; // Token invalid
            
            if (decoded) {    
                decoded.user.token = data;
                const token = new Token(decoded.user);

                try {    
                    
                    const content = await db('user')
                    .where('email', token.email)
                    .andWhere('reset_password_token', token.token)
                    .limit(1);

                    if (content.length)
                        return new User(content[0]);

                    return 3;
                } catch (error) {
                    throw error;
                }
            } else {
                return 1;
            }
        });
    }
}