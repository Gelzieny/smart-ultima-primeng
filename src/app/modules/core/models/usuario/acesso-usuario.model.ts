import {Usuario} from "./usuario.model";
import {Perfil} from "./perfil.model";

export class AcessoUsuario {
    id: number
    usuario: Usuario
    perfis: Perfil[]
}
