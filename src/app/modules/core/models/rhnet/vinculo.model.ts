import {PessoaFisica} from './pessoa.model';
import {UnidadeAdministrativa} from './unidade-admnistrativa.model';
import {VinculoVaga} from './vinculo-vaga.model';

export class Vinculo {
    codigo: number;
    regimeJuridicoCodigo: number;
    situacaoFuncionalCodigo: number;
    situacaoEspVinculo: number;
    pessoaFisica: PessoaFisica;
    unidadeAdministrativaOficial: UnidadeAdministrativa;
    vinculosVaga: VinculoVaga[];
}
