import admin from 'firebase-admin';
import serviceAccount from './serviceAccountKey';
import * as dotenv from 'dotenv';
dotenv.config();
admin.initializeApp({
    credential: admin.credential.cert(JSON.parse(JSON.stringify(serviceAccount))),
    storageBucket: process.env.BUCKET_URL
});
export default admin;