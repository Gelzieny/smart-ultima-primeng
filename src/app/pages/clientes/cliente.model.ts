import {BaseModel} from '../../shared/models/base.model';

export class Cliente extends BaseModel{
  id: number;
  nome: string;
  cpf: string;
  telefone: string;
  endereco: string;

    constructor(obj: any) {
        super();
        this.assign(obj);
    }

    protected assign(obj: any) {
        Object.assign(this as any, obj);
        this.originalState = { ...this };
    }

    static fromJson(json: any): Cliente {
        if (json === undefined || json === null) {
            return null;
        }
        return new Cliente(json);
    }

}
