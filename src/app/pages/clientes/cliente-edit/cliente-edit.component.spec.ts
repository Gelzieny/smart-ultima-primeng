import { ComponentFixture, TestBed } from "@angular/core/testing";
import { ClienteEditComponent } from "./cliente-edit.component";
import { ReactiveFormsModule } from "@angular/forms";
import { ConfirmationService, MessageService } from "primeng/api";
import { RouterModule } from "@angular/router";
import { HttpClientModule } from "@angular/common/http";
import { AppBreadcrumbService } from "src/app/modules/main/breadcrumb/app.breadcrumb.service";
import { InputMaskModule } from "primeng/inputmask";
import { ConfirmDialogModule } from "primeng/confirmdialog";
import { ToolbarModule } from "primeng/toolbar";
import { CardModule } from "primeng/card";
import { By } from '@angular/platform-browser';

describe('ClienteEditComponent', () => {
    let component: ClienteEditComponent;
    let fixture: ComponentFixture<ClienteEditComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [
                ClienteEditComponent,
            ],
            imports: [
                ReactiveFormsModule,
                RouterModule.forRoot([]),
                HttpClientModule,
                InputMaskModule,
                ToolbarModule,
                CardModule
            ],
            providers: [
                MessageService,
                AppBreadcrumbService
            ]
        }).compileComponents();

        fixture = TestBed.createComponent(ClienteEditComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should navigate back when button is clicked', () => {
        spyOn(component, 'voltar');
        const button = fixture.nativeElement.querySelector('button.p-button-info.mr-2');
        button.click();
        expect(component.voltar).toHaveBeenCalled();
    });

    it('should have a save button', () => {
        const button = fixture.debugElement.query(By.css('button.p-button-success'));
        expect(button).toBeTruthy();
    });

    it('should call save method when save button is clicked', () => {
        spyOn(component, 'salvar');
        const button = fixture.debugElement.query(By.css('button.p-button-success')).nativeElement;
        button.click();
        expect(component.salvar).toHaveBeenCalled();
    });
});