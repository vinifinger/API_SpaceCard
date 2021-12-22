export class SocialMedia {
    public id?: number;
    public facebook?: string;
    public linkedin?: string;
    public twitter?: string;
    public instagram?: string;
    public whatsapp?: string;
    public telegram?: string;
    public tiktok?: string;
    public spotify?: string;
    public youtube?: string;
    public wildcard_1?: string;
    public wildcard_2?: string;
    public wildcard_3?: string;

    constructor(props: SocialMedia) {
        Object.assign(this, props);
    }
}