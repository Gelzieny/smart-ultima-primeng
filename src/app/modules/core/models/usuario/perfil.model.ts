import {SistemaServico} from "./sistema-servico.model";

export class Perfil {
  codigo: number
  descricao: string;
  sistemaServico: SistemaServico[];
  indicaServico: string;
  tipoPerfil: string;
}
