import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {MessageService} from 'primeng/api';
import {Observable, of} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import {AuthService} from './auth.service';
import {AcessosUsuarioService} from '../services/acessos-usuario/acessos-usuario.service';
import {AuthorizationService} from './authorization.service';
import {OAuthService} from 'angular-oauth2-oidc';

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {
    constructor(
        private router: Router,
        private authService: AuthService,
        private oauthService: OAuthService,
        private acessosUsuarioService: AcessosUsuarioService,
        private authorization: AuthorizationService,
        private messageService: MessageService) {
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
        | Observable<boolean | UrlTree>
        | Promise<boolean | UrlTree>
        | boolean
        | UrlTree {

        if (this.authService.isValidToken()) {
            if (this.acessosUsuarioService.isNotEmptyRoles()) {
                let regex = /^\/\?session_/;

                if (state.url.match(regex)) {
                    return true;
                }

                regex = /^\/([^\/?]*)/;
                const match = state.url.match(regex);
                return this.authorization.preAuthorize(match[0])
                    .pipe(
                        map((response: boolean) => {
                            if (response) {
                                return true;
                            }
                            this.router.navigate(['/acesso-negado']);
                            return false;
                        }), catchError((error) => {
                            this.messageService.add({
                                severity: 'error',
                                summary: 'Erro ao tentar verificar Authorização',
                                detail: error.message,
                                life: 3000
                            });
                            this.router.navigate(['/erro']);
                            return of(false);
                        }));
            } else {
                this.messageService.add({severity: 'error', summary: 'Erro', detail: 'Sem permissão para o acesso', life: 3000});
                this.router.navigate(['/acesso-negado']);
                return false;
            }
        }
        this.oauthService.initImplicitFlow();
        return false;
    }
}
