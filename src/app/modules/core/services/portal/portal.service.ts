import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {AuthService} from '../../auth/auth.service';
import {environment} from '../../../../../environments/environment';
import {Menu} from '../../models/portal/menu.model';
import {ActionID} from '../../models/portal/action-id.model';
import {AcessoUsuario} from '../../models/usuario/acesso-usuario.model';
import {UnidadeAcesso} from './unidade-acesso.model';

@Injectable({
    providedIn: 'root'
})
export class PortalService {

    headers: HttpHeaders;

    constructor(private http: HttpClient,
                private authService: AuthService) {
        this.headers = new HttpHeaders({
            Authorization: `Bearer ${this.authService.getUserToken()}`
        });
    }

    findActionsUsuario(): Observable<ActionID[]> {
        let params = new HttpParams();
        params = params.append('login', this.authService.getUsername());
        params = params.append('sistema', environment.idSistemaPortal);
        return this.http.get<ActionID[]>(`${environment.apiPortalAcessos}/actions`, {
            headers: this.headers,
            params
        });
    }

    findMenus(): Observable<Menu[]> {
        let params = new HttpParams();
        params = params.append('sistema', environment.idSistemaPortal);
        return this.http.get<Menu[]>(`${environment.apiPortalMenusSistemas}/`, {headers: this.headers, params});
    }

    findUnidadesAcesso(): Observable<UnidadeAcesso[]> {
        let params = new HttpParams();
        params = params.append('login', this.authService.getUsername());
        params = params.append('sistema', environment.idSistemaPortal);
        this.headers = new HttpHeaders({
            Authorization: `Bearer ${this.authService.getUserToken()}`
        });
        return this.http.get<UnidadeAcesso[]>(`${environment.apiUnidadesAcesso}/`, {headers: this.headers, params});
    }

    findAcessosUsuario(): Observable<AcessoUsuario> {
        let params = new HttpParams();
        params = params.append('codigo', this.authService.getUsername());
        params = params.append('siglaSistema', environment.idSistemaPortal);
        return this.http.get<AcessoUsuario>(`${environment.apiPortalAcessos}/acessos`, {headers: this.headers, params});
    }
}
