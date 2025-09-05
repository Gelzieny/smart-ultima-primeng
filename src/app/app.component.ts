import {Component, OnInit} from '@angular/core';
import {OAuthErrorEvent, OAuthService} from 'angular-oauth2-oidc';
import {PrimeNGConfig} from 'primeng/api';
import {AuthService} from './modules/core/auth/auth.service';
import {AppService} from './modules/core/services/app.service';
import {SessionStorageService} from './shared/services/session-storage/session-storage.service';
import {authConfig} from './modules/core/oauth2.config';
import {JwksValidationHandler} from 'angular-oauth2-oidc-jwks';
import {LoadingService} from './shared/utilites/loading';
import {delay} from 'rxjs';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {

    topbarTheme = 'green';

    menuTheme = 'green';

    layoutMode = 'light';

    menuMode = 'static';

    inlineMenuPosition = 'bottom';

    inputStyle = 'filled';

    ripple = true;

    isRTL = false;

    loading: boolean;

    constructor(private oauthService: OAuthService,
                private appService: AppService,
                private sessionStorageService: SessionStorageService,
                private primengConfig: PrimeNGConfig,
                private loadingService: LoadingService) {

        this.oauthService.configure(authConfig);

        /** enable below validation only if jwks object is defined as part of oauthconfig obj */
        this.oauthService.tokenValidationHandler = new JwksValidationHandler();
        this.oauthService.setStorage(sessionStorageService.getSessionStorage());
        this.oauthService.setupAutomaticSilentRefresh();

        /** commented below because below resource is protected by some identity server ex: wso2 */
        this.oauthService.loadDiscoveryDocumentAndTryLogin({})
            .then(
                () => this.appService.loadAccessData()
            );

        this.oauthService.events.subscribe(event => {
            if (event instanceof OAuthErrorEvent) {
                if (event.type === 'code_error'
                    && (<any>event).params['error'] === 'access_denied') {
                    this.oauthService.initLoginFlow();
                }
            }
        });
    }

    ngOnInit() {
        this.primengConfig.ripple = true;
        this.listenToLoading();
    }

    listenToLoading(): void {
        this.loadingService.loadingSub
            .pipe(delay(0))
            .subscribe((loading) => {
                this.loading = loading;
            });
    }
}
