export class MessageMail {
    
    public readonly token?: string;
    public readonly email?: string;
    public readonly subject?: string;
    public readonly body?: string;

    constructor(props: MessageMail) {
        Object.assign(this, props);
    }
}