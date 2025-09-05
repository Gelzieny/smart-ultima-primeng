import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { ConfirmationService, MessageService } from 'primeng/api';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { InputMaskModule } from 'primeng/inputmask';
import { TableModule } from 'primeng/table';
import { ToolbarModule } from 'primeng/toolbar';
import { By } from '@angular/platform-browser';

import { AppBreadcrumbService } from 'src/app/modules/main/breadcrumb/app.breadcrumb.service';
import { ClienteListComponent } from './cliente-list.component';
import { PopupInputsErrorComponent } from 'src/app/shared/components/popup-inputs-error/popup-inputs-error.component';
import { ConfirmDialogModule } from 'primeng/confirmdialog';

describe('ClienteListComponent', () => {
    let component: ClienteListComponent;
    let fixture: ComponentFixture<ClienteListComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [
                ClienteListComponent,
                PopupInputsErrorComponent
            ],
            imports: [
                ReactiveFormsModule,
                RouterModule.forRoot([]),
                HttpClientModule,
                InputMaskModule,
                TableModule,
                ToolbarModule,
                //ConfirmDialogModule,
            ],
            providers: [
                MessageService,
                AppBreadcrumbService,
                ConfirmationService
            ]
        })
            .compileComponents();

        fixture = TestBed.createComponent(ClienteListComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should call addCliente when "Novo" button is clicked', () => {
        spyOn(component, 'addCliente');
        const button = fixture.nativeElement.querySelector('button.p-button-success.mr-2');
        button.click();
        expect(component.addCliente).toHaveBeenCalled();
    });

    it('should initialize with the correct data', () => {
        expect(component.clientes$).toBeDefined();
        //expect(component.clientes$.length).toBeGreaterThan(0);
    });
});
