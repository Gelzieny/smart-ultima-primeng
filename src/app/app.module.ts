import {DEFAULT_CURRENCY_CODE, LOCALE_ID, NgModule} from '@angular/core';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {BrowserModule} from '@angular/platform-browser';
import {HashLocationStrategy, LocationStrategy, registerLocaleData} from '@angular/common';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ConfirmationService, MessageService} from 'primeng/api';
import localePt from '@angular/common/locales/pt';
import {OAuthModule} from 'angular-oauth2-oidc';
import {NgxPermissionsModule} from 'ngx-permissions';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {MenuService} from './modules/main/menu-sidebar/app.menu.service';
import {AppBreadcrumbService} from './modules/main/breadcrumb/app.breadcrumb.service';
import {environment} from '../environments/environment';
import {LoadingComponent, LoadingInterceptor} from './shared/utilites/loading';

registerLocaleData(localePt);

@NgModule({
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        BrowserAnimationsModule,
        NgxPermissionsModule.forRoot(),
        OAuthModule.forRoot({
            resourceServer: {
                allowedUrls: [environment.apiUrl,
                    environment.apiPortalAcessos,
                    environment.apiPortalMenusSistemas,
                    environment.apiRhVinculos],
                sendAccessToken: true
            }
        }),
        LoadingComponent,
    ],
    declarations: [
        AppComponent,
    ],
    providers: [
        {
            provide: LocationStrategy,
            useClass: HashLocationStrategy
        },
        MenuService,
        AppBreadcrumbService,
        ConfirmationService,
        MessageService,
        {
            provide: DEFAULT_CURRENCY_CODE,
            useValue: 'BRL'
        },
        {
            provide: LOCALE_ID,
            useValue: 'pt-BR',
        },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: LoadingInterceptor,
            multi: true
        },
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
