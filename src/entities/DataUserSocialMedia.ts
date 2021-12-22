import { SocialMedia } from "./SocialMedia";
import { User } from "./User";

export class DataUserSocialMedia {
    
    public readonly user?: User;
    public readonly social_media?: SocialMedia;

    constructor(props: DataUserSocialMedia) {
        Object.assign(this, props);
    }
}