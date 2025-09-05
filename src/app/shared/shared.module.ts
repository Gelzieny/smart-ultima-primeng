import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {PageSortingComponent} from './components/page-sorting/page-sorting.component';
import {PopupInputsErrorComponent} from './components/popup-inputs-error/popup-inputs-error.component';
import {AppErrorComponent} from './components/erros/app.error.component';
import {AppNotfoundComponent} from './components/erros/app.notfound.component';
import {AppAccessDeniedComponent} from './components/erros/app.accessdenied.component';
import {ButtonModule} from 'primeng/button';
import {RippleModule} from 'primeng/ripple';
import {ToolbarModule} from 'primeng/toolbar';


@NgModule({
    declarations: [
        PageSortingComponent,
        PopupInputsErrorComponent,
        AppErrorComponent,
        AppAccessDeniedComponent,
        AppNotfoundComponent
    ],
    imports: [
        CommonModule,
        ButtonModule,
        RippleModule,
        ToolbarModule,
    ],
    exports: [
        PageSortingComponent,
        PopupInputsErrorComponent,
        AppErrorComponent,
        AppAccessDeniedComponent,
        AppNotfoundComponent
    ]
})
export class SharedModule {
}
