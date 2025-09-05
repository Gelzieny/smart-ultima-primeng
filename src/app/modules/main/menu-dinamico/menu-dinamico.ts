import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import {PortalService} from '../../core/services/portal/portal.service';
import {Router} from '@angular/router';
import {UnidadeAcesso} from '../../core/models/portal/unidade-acesso.model';
import {Menu} from '../../core/models/portal/menu.model';
import {AppRoutingModule} from '../../../app-routing.module';
import {environment} from '../../../../environments/environment';

@Component({
    // tslint:disable-next-line:component-selector
    selector: 'menu-dinamico',
    templateUrl: './menu-dinamico.html'
})
// tslint:disable-next-line:component-class-suffix
export class MenuDinamico implements OnInit {
    items: MenuItem[] | undefined;
    itemsInicial: MenuItem[] =  [];
    itemsFinal: MenuItem[] = [];
    unidadesAcesso: UnidadeAcesso[] | undefined;
    menu: Menu[] | undefined;
    searchTerm: string = '';
    filteredItems: MenuItem[] | undefined;

    usaLegado = false;

    constructor(
        private portalService: PortalService,
        private router: Router,
        private appRoutingModule: AppRoutingModule
    ) {}

    ngOnInit() {

        // Apenas Remover caso não tenha Inicial -> array vazio já instanciado -> []
        this.itemsInicial = [
            {
                label: 'HOME',
                items: [
                    {
                        label: "Dashboard",
                        icon: "pi pi-fw pi-home",
                        routerLink: ["/"],
                    }
                ],
            }
        ];

        // Apenas Remover caso não tenha Final -> array vazio já instanciado  -> []
        this.itemsFinal = [
            {
                label: "Documentação",
                items: [
                    {
                        label: "Documentação Template",
                        icon: "pi pi-fw pi-info-circle",
                        url: "https://primefaces.org/ultima-ng/#/documentation",
                        target: "_blank",
                    },
                ],
            },
        ];

        this.items = [];
        this.items.push(...this.itemsInicial,
            // {
            //     label: 'Cadastros',
            //     items: [
            //         {
            //             label: "Cliente",
            //             icon: "pi pi-id-card",
            //             routerLink: ["/cliente"],
            //         }
            //     ],
            // },
    ...this.itemsFinal);

        this.filteredItems = this.items;


        this.portalService.findUnidadesAcesso().subscribe((data) => {
            this.unidadesAcesso = data;
            this.montaMenu();
        });

        this.portalService.findMenus().subscribe((data) => {
            this.menu = data;
            this.montaMenu();
        });
    }

    montaMenu(){
        if (this.menu && this.unidadesAcesso) {
            const primordiais = this.mapearMenuEItens(this.menu, null);
            if (primordiais.length > 0) {
                for (const item of primordiais) {
                    this.mapearFilhos(this.menu, item);
                }
            }
            if (primordiais.length > 0) {
                for (const item of primordiais) {
                    this.mapearUAFilhos(this.unidadesAcesso, item);
                }
            }
            this.items = [];
            this.items.push(...this.itemsInicial,
                ...primordiais,
                ...this.itemsFinal);
            this.filteredItems = this.items;
        }
    }

    filterMenu(){
        if(!this.searchTerm){
            this.filteredItems = this.items;
        } else {
            this.filteredItems = this.filterItems(this.items, this.searchTerm.toLocaleLowerCase());
        }
    }

    filterItems(items: MenuItem[] | undefined, searchTerm: string): MenuItem[] | undefined {
        if (!items) return [];

        return items
            .map(item => {
                const filteredSubItems = this.filterItems(item.items, searchTerm);
                if (item.label.toLowerCase().includes(searchTerm) || (filteredSubItems && filteredSubItems.length > 0)) {
                    return {
                        ...item,
                        expanded: filteredSubItems && filteredSubItems.length > 0,
                        items: filteredSubItems
                    };
                }
                return null;
            })
            .filter(item => item !== null) as MenuItem[];
    }


    mapearUAFilhos(data: any, item: MenuItem){
        const mi = this.mapearUnidadeAcesso(data, item);
        if (mi.length > 0) {
            if (!item.items) {item.items = []; }
            item.items = item.items.concat(mi)
                .sort((a, b) => this.sortItens(a, b));
        }
        if (item.items) {
            for (const i of item.items) {
                this.mapearUAFilhos(data, i);
            }
        }
    }

    mapearFilhos(data: any, item: MenuItem){
        const mi = this.mapearMenuEItens(data, item);
        if (mi.length > 0) {
            item.items = mi;
            for (const i of item.items) {
                this.mapearFilhos(data, i);
            }
        }
    }

    mapearMenuEItens = (itensJson, itemMenu) => {
        // tslint:disable-next-line:max-line-length triple-equals
        const itensFiltradosPrimordiais = itensJson.filter(item => (itemMenu === null) ? item.menuPai === null : (item.menuPai === itemMenu.menuCodigo && item.siglaModulo === itemMenu.siglaModulo));
        const maxPosicao = itensFiltradosPrimordiais.reduce((max, item) =>
            (item.posicao > max && item.posicao !== 0) ? item.posicao : max, 0);
        return itensFiltradosPrimordiais
            .map(item => {
                return {
                    label: item.descricao,
                    menuCodigo: item.menuCodigo,
                    siglaModulo: item.siglaModulo,
                    posicao: (item.posicao && item.posicao !== 0) ? item.posicao : maxPosicao + 1
                };
            })
            .filter(item => item !== null)
            .sort((a, b) => this.sortItens(a, b));
    }

    mapearUnidadeAcesso = (unidadesDeAcessoJson, itemMenu) => {
        const unidadesDeAcessoFiltrados = unidadesDeAcessoJson.filter(
            unidade =>
                Number(unidade.menuSistema) === itemMenu.menuCodigo
                && unidade.menuModuloSigla === itemMenu.siglaModulo);
        const maxPosicaoUnidade = unidadesDeAcessoFiltrados.reduce((max, unidade) =>
            (unidade.posicao > max && unidade.posicao !== 0) ? unidade.posicao : max, 0);

        const maxPosicaoItemMenu = itemMenu.items ?  itemMenu.items .reduce((max, itemDeMenu) =>
            (itemDeMenu.posicao > max && itemDeMenu.posicao !== 0) ? itemDeMenu.posicao : max, 0) : 0;

        const maxPosicao = maxPosicaoUnidade + maxPosicaoItemMenu;

        return unidadesDeAcessoFiltrados
            .map(unidade => {
                // label: Define o rótulo do item de menu.
                // icon: Define o ícone do item de menu.
                // command: Uma função a ser executada quando o item de menu é clicado.
                // url: Define uma URL para navegação quando o item de menu é clicado.
                // items: Permite a criação de subitens, tornando o item de menu um submenu.
                // style: Define um estilo inline para o item de menu.
                // styleClass: Define uma classe CSS para o item de menu.
                const retorno: any =  {
                    label: unidade.descricao,
                    menuCodigo: unidade.menuCodigo,
                    siglaModulo: unidade.siglaModulo,
                    posicao: (unidade.posicao && unidade.posicao !== 0) ? unidade.posicao : maxPosicao + 1
                };
                //Avalia se Possui sistema legado
                const configLegado: boolean | false = (environment["siglaLegado"]);
                if ( !configLegado || unidade.url.startsWith('/pdp-') ) {
                    retorno.command = () => {
                        this.vaiParaRota(unidade.url);
                    };
                    retorno.icon = this.appRoutingModule.getIcon(unidade.url);
                    retorno.legado = false;
                } else {
                    retorno.command = () => {
                        this.vaiParaRotaLegado(unidade.url);
                    };
                    retorno.legado = true;
                }
                return retorno;
            })
            .filter(item => item !== null)
            .sort((a, b) => this.sortItens(a, b));
    }

    sortItens(a: any, b: any): number{
       if (a.legado !== b.legado) {
           return !a.legado ? -1 : 1;
       }
       return (a.posicao === b.posicao) ? a.label.localeCompare(b.label) : a.posicao - b.posicao;
    }


    vaiParaRota(url: string): void {
        this.router.navigate([url]);
    }

    vaiParaRotaLegado(url: string): void {
        this.router.navigate(['legado'], {queryParams: { show: url}});
    }


}
