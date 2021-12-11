export class DataPaginate {
    
    public readonly data?: Array<[]>;
    public readonly pagination?: Object;

    constructor(props: DataPaginate) {
        Object.assign(this, props);
    }
}