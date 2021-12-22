import { v4 } from "uuid";

export class User {
    public readonly id?: number;
    public hash?: string;
    public name?: string;
    public surname?: string;
    public email?: string;
    public bio?: string;
    public username?: string;
    public password?: string;
    public status?: Number;
    public telephone?: string;
    public end_state?: string;
    public end_city?: string;
    public end_number?: string;
    public end_district?: string;
    public end_cep?: string;
    public image?: Express.Multer.File;
    public reset_password_token?: string | null;
    public imageUrl?: string;

    constructor(props: User | User[], hash?: string | string[]) {
        Object.assign(this, props);
        if ( !hash && props ) {
            this.hash = v4();
        }
    }
}