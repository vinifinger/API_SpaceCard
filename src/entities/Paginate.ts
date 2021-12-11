export class Paginate {
    public limit!: number;
    public page!: number;

    constructor(props: Paginate) {
        Object.assign(this, props);
    }
}