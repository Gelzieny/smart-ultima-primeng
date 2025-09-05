import {Component, OnDestroy} from '@angular/core';
import {AppBreadcrumbService} from './app.breadcrumb.service';
import {Subscription} from 'rxjs';
import {MenuItem} from 'primeng/api';
import {OAuthService} from 'angular-oauth2-oidc';
import {SessionStorageService} from 'src/app/shared/services/session-storage/session-storage.service';
import {AppMainComponent} from '../app.main.component';
import {AppComponent} from 'src/app/app.component';

@Component({
    selector: 'app-breadcrumb',
    templateUrl: './app.breadcrumb.component.html',
    styleUrls: ['./app.breadcrumb.component.scss']
})
export class AppBreadcrumbComponent implements OnDestroy {

    subscription: Subscription;

    items: MenuItem[];

    home: MenuItem;

    scale = 14;

    scales: number[] = [12, 13, 14, 15, 16];

    isInputBackgroundChanged = false;

    isLightMode: boolean = true;


    constructor(public breadcrumbService: AppBreadcrumbService,
                private oauthService: OAuthService,
                private sessionStorageService: SessionStorageService,
                public app: AppComponent,
                public appMain: AppMainComponent) {
        this.subscription = breadcrumbService.itemsHandler.subscribe(response => {
            this.items = response;
        });

        this.home = {icon: 'pi pi-home', routerLink: '/'};
    }

    ngOnDestroy() {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }

    onSubmit(request: any) {
        this.sessionStorageService.clear();
        document.forms[0].submit();
    }

    get idToken() {
        return this.oauthService.getIdToken();
    }

    get urlRedirect() {
        return (<any> this.oauthService).redirectUri;
    }

    get logoutUrl() {
        return (<any> this.oauthService.logoutUrl);
    }

    decrementScale() {
        this.scale--;
        this.applyScale();
    }

    incrementScale() {
        this.scale++;
        this.applyScale();
    }

    applyScale() {
        document.documentElement.style.fontSize = this.scale + 'px';
    }

    changeScale(scale: number) {
        this.scale = scale;
        this.applyScale();
    }

    replaceLink(linkElement, href, callback?) {
        if (this.isIE()) {
            linkElement.setAttribute('href', href);
            if (callback) {
                callback();
            }
        } else {
            const id = linkElement.getAttribute('id');
            const cloneLinkElement = linkElement.cloneNode(true);

            cloneLinkElement.setAttribute('href', href);
            cloneLinkElement.setAttribute('id', id + '-clone');

            linkElement.parentNode.insertBefore(cloneLinkElement, linkElement.nextSibling);

            cloneLinkElement.addEventListener('load', () => {
                linkElement.remove();
                cloneLinkElement.setAttribute('id', id);

                if (callback) {
                    callback();
                }
            });
        }
    }

    isIE() {
        return /(MSIE|Trident\/|Edge\/)/i.test(window.navigator.userAgent);
    }

    setLightMode(event, mode) {
        this.isLightMode = true;
        const appLogoLink: HTMLImageElement = document.getElementById('app-logo') as HTMLImageElement;
        this.app.layoutMode = mode;

        if (!this.isInputBackgroundChanged) {
            this.app.inputStyle = mode === 'dark' ? 'outlined' : 'filled';
        }

        if (mode != 'dark') {
            this.app.menuTheme = 'green';
            this.app.topbarTheme = 'green';
            appLogoLink.src = 'assets/layout/images/logo-governo-goias.png';
        }

        const layoutLink: HTMLLinkElement = document.getElementById('layout-css') as HTMLLinkElement;
        const layoutHref = 'assets/layout/css/layout-' + this.app.layoutMode + '.css';
        this.replaceLink(layoutLink, layoutHref);

        const themeLink = document.getElementById('theme-css');
        const urlTokens = themeLink.getAttribute('href').split('/');
        urlTokens[urlTokens.length - 1] = 'theme-' + this.app.layoutMode + '.css';
        const newURL = urlTokens.join('/');

        this.replaceLink(themeLink, newURL, this.appMain['refreshChart']);
    }

    setDarkMode(event, mode) {
        this.isLightMode = false;
        const appLogoLink: HTMLImageElement = document.getElementById('app-logo') as HTMLImageElement;
        this.app.layoutMode = mode;

        if (!this.isInputBackgroundChanged) {
            this.app.inputStyle = mode === 'dark' ? 'filled' : 'outlined';
        }

        if (mode === 'dark') {
            this.app.menuTheme = 'dark';
            this.app.topbarTheme = 'dark';
            appLogoLink.src = 'assets/layout/images/logo-governo-goias.png';
        }

        const layoutLink: HTMLLinkElement = document.getElementById('layout-css') as HTMLLinkElement;
        const layoutHref = 'assets/layout/css/layout-' + this.app.layoutMode + '.css';
        this.replaceLink(layoutLink, layoutHref);

        const themeLink = document.getElementById('theme-css');
        const urlTokens = themeLink.getAttribute('href').split('/');
        urlTokens[urlTokens.length - 1] = 'theme-' + this.app.layoutMode + '.css';
        const newURL = urlTokens.join('/');

        this.replaceLink(themeLink, newURL, this.appMain['refreshChart']);
    }

}
