export class Pageable {
    public sort: Sort;
    public pageNumber: number;
    public pageSize: number;
    public offset: number;
    public unpaged: boolean;
    public paged: boolean;
    constructor(obj: any) {
        if (obj.hasOwnProperty('sort')){
            obj.sort = obj.sort ? Sort.fromJson(obj.sort) : obj.sort;
        }
        Object.assign(this, obj);
    }
    static fromJson(json: any): Pageable {
        return new Pageable(json);
    }

}
export class Sort {
    public sorted: boolean;
    public unsorted: boolean;
    public empty: boolean;
    constructor(obj: any) {
        Object.assign(this, obj);
    }
    static fromJson(json: any): Sort {
        return new Sort(json);
    }
}
export class Order {
    public direction: string;
    public property: string;
    public ascending: boolean;
    public descending: boolean;
    constructor(obj: any) {
        Object.assign(this, obj);
    }
    static fromJson(json: any): Order {
        return new Order(json);
    }
}
