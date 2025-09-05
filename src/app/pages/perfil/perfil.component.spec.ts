import { ComponentFixture, TestBed } from "@angular/core/testing";
import { PerfilComponent } from "./perfil.component";
import { DateTimeProvider, OAuthLogger, OAuthService, UrlHelperService } from "angular-oauth2-oidc";
import { HttpClientModule } from "@angular/common/http";

describe('PerfilComponent', () => {
    let component: PerfilComponent;
    let fixture: ComponentFixture<PerfilComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [
                HttpClientModule
            ],
            providers: [
                OAuthService,
                UrlHelperService,
                OAuthLogger,
                DateTimeProvider
            ]
        }).compileComponents();

        fixture = TestBed.createComponent(PerfilComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});