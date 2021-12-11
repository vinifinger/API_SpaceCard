export class DataPaginate {
    
    public readonly data?: Array<[]> | unknown;
    public readonly pagination?: Object;

    constructor(props: DataPaginate) {
        Object.assign(this, props);
    }
}