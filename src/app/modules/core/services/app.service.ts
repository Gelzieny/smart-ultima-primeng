import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {MessageService} from 'primeng/api';
import {PortalService} from './portal/portal.service';
import {AuthService} from '../auth/auth.service';
import {Usuario} from '../models/usuario/usuario.model';
import {AcessosUsuarioService} from './acessos-usuario/acessos-usuario.service';
import {SessionStorageService} from '../../../shared/services/session-storage/session-storage.service';
import {Vinculo} from '../models/rhnet/vinculo.model';
import {RhNetService} from './rhnet/rh.service';
import {lastValueFrom} from 'rxjs';
import {AcessoUsuario} from '../models/usuario/acesso-usuario.model';

@Injectable({
    providedIn: 'root'
})
export class AppService {

    private acessosUsuario: AcessoUsuario | undefined;
    private vinculo: Vinculo | undefined;

    constructor(private portalService: PortalService,
                private rhnetService: RhNetService,
                private router: Router,
                private authService: AuthService,
                private sessionStorageService: SessionStorageService,
                private acessosUsuarioService: AcessosUsuarioService,
                private messageService: MessageService) {
    }

    async loadAccessData(): Promise<void> {
        try {
            if (this.authService.isValidToken()) {

                await this.acessosUsuarioService.load();

                if (this.acessosUsuarioService.isNotEmptyRoles()) {
                    await this.loadAppData();
                    this.router.initialNavigation();
                } else {
                    this.router.navigate(['/acesso-negado']);
                }

            } else {
                this.sessionStorageService.clear();
                this.router.initialNavigation();
            }
        } catch (error) {
            this.messageService.add({severity: 'error', summary: 'Erro', detail: 'Erro interno ao buscar dados da aplicação', life: 3000});
        }
    }

    async loadAppData(): Promise<void> {
        try {
            if (this.authService.isValidToken()) {
                this.acessosUsuario = await this.findAcessosUsuario();
                this.vinculo = await this.findVinculoUsuario();
                this.sessionStorageService.set('app_acessosUsuario', this.acessosUsuario);
                //this.menuService.loadMenus();

            }
        } catch (error) {
            console.log(error);
            this.messageService.add({severity: 'error', summary: 'Erro', detail: 'Erro interno ao buscar dados da aplicação', life: 3000});
        }
    }

    async findAcessosUsuario(): Promise<AcessoUsuario | undefined> {
        if (!this.sessionStorageService.isExist('app_acessos')) {
            return this.portalService.findAcessosUsuario().toPromise();
        } else {
            return this.sessionStorageService.get('app_acessos');
        }
    }

    async findVinculoUsuario(): Promise<Vinculo | undefined> {
        if (!this.sessionStorageService.isExist('app_vinculo')) {

            let vinculo = await lastValueFrom(this.rhnetService.findViculoByCpf())
                .catch(err => {
                    this.messageService.add({severity: 'error', summary: 'Erro', detail: err.error.detail, life: 3000});
                });
            if (vinculo) {
                return <any> vinculo;
            } else {
                return new Vinculo();
            }
        } else {
            return this.sessionStorageService.get('app_vinculo');
        }
    }

    getVinculo(): Vinculo {
        return (<any> this.vinculo)[0];
    }

    getUsuario(): Usuario {
        return this?.acessosUsuario ? this?.acessosUsuario : (<any> [0])?.usuario;
    }

    getAcessosUsuario(): AcessoUsuario | undefined {
        return this.acessosUsuario;
    }

    isAppDataOk(): boolean {
        // @ts-ignore
        return this.acessosUsuario['perfis'].length > 0;
    }
}
