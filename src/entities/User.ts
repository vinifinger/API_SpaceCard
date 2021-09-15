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
    public facebook?: string;
    public linkedin?: string;
    public status?: Number;
    public twitter?: string;
    public telephone?: string;
    public instagram?: string;
    public whatsapp?: string;
    public telegram?: string;
    public tiktok?: string;
    public spotify?: string;
    public youtube?: string;
    public wildcard_1?: string;
    public wildcard_2?: string;
    public wildcard_3?: string;
    public end_state?: string;
    public end_city?: string;
    public end_number?: string;
    public end_district?: string;
    public end_cep?: string;
    public reset_password_token?: string | null;

    constructor(props: User | User[], hash?: string | string[]) {
        Object.assign(this, props);
        if ( !hash && props ) {
            this.hash = v4();
        }
    }
}