import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {OAuthService} from 'angular-oauth2-oidc';
import {forkJoin, Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import authRequest from '../../../../assets/data/request.json';
import {environment} from '../../../../environments/environment';
import {AuthStore} from './state/auth.store';
import {AuthZ} from './auth.model';
import {AuthService} from './auth.service';

@Injectable({
    providedIn: 'root'
})
export class AuthorizationService {

    private auth: AuthZ = authRequest;

    constructor(private oauthService: OAuthService,
                private authService: AuthService,
                private httpClient: HttpClient,
                private authStore: AuthStore,
                private router: Router) {
    }

    preAuthorize(url: string): Observable<boolean> {
        this.auth.Request.Action.Attribute = [{AttributeId: authRequest.Request.Action.Attribute[0].AttributeId, Value: 'validarRota'}];
        this.auth.Request.Resource.Attribute = [{AttributeId: authRequest.Request.Resource.Attribute[0].AttributeId, Value: url}];

        this.auth.Request.AccessSubject.Attribute = [{
            AttributeId: authRequest.Request.AccessSubject.Attribute[0].AttributeId,
            Value: (<any> this.oauthService.getIdentityClaims())['sub']
        }];

        this.auth.Request.Environment.Attribute = [{
            AttributeId: authRequest.Request.Environment.Attribute[0].AttributeId,
            Value: environment.idSistemaPortal
        }];

        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            })
        };


        const loadRolesUser = this.httpClient.get(`${environment.apiPortalAcessos}/actions?login=${this.authService.getUsername()}&sistema=${environment.idSistemaPortal}`);

        forkJoin([loadRolesUser]).subscribe(results => {
            const roles = Object.keys(results[0]).map(function(actionIDIndex) {
                const action = (<any> results)[0][actionIDIndex];
                return action.um_attr_value;
            });
            this.authStore.setState(roles);
        });

        return this.httpClient.post(`${environment.authorizationUrl}/pdp`, this.auth, httpOptions)
            .pipe(
                map((response) => {
                    if ((<any> response)['Response'][0].Decision.includes('Permit')) {
                        return true;
                    } else {
                        this.router.navigateByUrl(`/acesso-negado`);
                        return false;
                    }
                }));
    }
}
