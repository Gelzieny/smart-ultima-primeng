export abstract class BaseModel {
    protected originalState: any;
    static fromJson(json: any): BaseModel {
        if (json === undefined || json === null) {
            return null;
        }
        return Object.assign({}, json);
    }
    public hasChanged(): boolean {
        return JSON.stringify(this.originalState) !== JSON.stringify(this);
    }
}
