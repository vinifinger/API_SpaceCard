import { User } from '../../entities/User';
import * as path from 'path';
import admin from '../../utils/firebaseAdmin';
import { IFirabaseRepository } from '../IFirebaseReposity';

export class FirebaseRepository implements IFirabaseRepository {
    async uploadImageAvatar(user: User): Promise<string> {
        try {
            const image = user.image;
            const filePah = (image?.path ? image?.path : `${user.hash}.jpg`);
            const fileName = user.hash + path.extname(image?.originalname ? image?.originalname : '.jpg');
            const result = await admin.storage().bucket().upload(filePah, {
                public: true,
                destination: `${user.hash}/${fileName}`,
                metadata : { contentType: 'image/jpeg' }
            });

            return result[0].publicUrl();
        } catch (error) {
            throw error;
        }
    }
}