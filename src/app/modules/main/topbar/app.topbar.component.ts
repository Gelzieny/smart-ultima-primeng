import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {animate, AnimationEvent, style, transition, trigger} from '@angular/animations';
import {AppComponent} from '../../../app.component';
import {AppMainComponent} from '../app.main.component';
import {OAuthService} from 'angular-oauth2-oidc';
import {SessionStorageService} from 'src/app/shared/services/session-storage/session-storage.service';
import {Router} from '@angular/router';
import {Usuario} from '../../core/models/usuario/usuario.model';
import {AuthService} from '../../core/auth/auth.service';

@Component({
    selector: 'app-topbar',
    templateUrl: './app.topbar.component.html',
    animations: [
        trigger('topbarActionPanelAnimation', [
            transition(':enter', [
                style({opacity: 0, transform: 'scaleY(0.8)'}),
                animate('.12s cubic-bezier(0, 0, 0.2, 1)', style({opacity: 1, transform: '*'})),
            ]),
            transition(':leave', [
                animate('.1s linear', style({opacity: 0}))
            ])
        ])
    ]
})
export class AppTopBarComponent implements OnInit {
    public usuario: Usuario;

    activeItem: number;

    @ViewChild('searchInput') searchInputViewChild: ElementRef;

    constructor(public appMain: AppMainComponent,
                private authService: AuthService,
                public app: AppComponent,
                private oauthService: OAuthService,
                private sessionStorageService: SessionStorageService,
                private router: Router) {
    }

    ngOnInit(): void {
        this.usuario = {
            nome: this.authService.getGivenName() || this.authService.getUsername(),
            email: this.authService.getEmail() || this.authService.getEmailCorporativo()
        };
    }

    onSearchAnimationEnd(event: AnimationEvent) {
        switch (event.toState) {
            case 'visible':
                this.searchInputViewChild.nativeElement.focus();
                break;
        }
    }

    goToProfile() {
        this.router.navigate(['perfil']);
    }
}
