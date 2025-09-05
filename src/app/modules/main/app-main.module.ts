import { NgModule } from "@angular/core";
import { AppMainRoutingModule } from "./app-main-routing.module";
import { InputMaskModule } from "primeng/inputmask";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { AppMainComponent } from "./app.main.component";
import { DashboardComponent } from "src/app/pages/dashboard/dashboard.component";
import { ClienteListComponent } from "src/app/pages/clientes/cliente-list/cliente-list.component";
import { ClienteAddComponent } from "src/app/pages/clientes/cliente-add/cliente-add.component";
import { ClienteEditComponent } from "src/app/pages/clientes/cliente-edit/cliente-edit.component";
import { PerfilComponent } from "src/app/pages/perfil/perfil.component";
import { AvatarModule } from "ngx-avatars";
import { ChartModule } from "primeng/chart";
import { MenuModule } from "primeng/menu";
import { ProgressBarModule } from "primeng/progressbar";
import { TimelineModule } from "primeng/timeline";
import { ConfirmDialogModule } from "primeng/confirmdialog";
import { TableModule } from "primeng/table";
import { ToolbarModule } from "primeng/toolbar";
import { BreadcrumbModule } from "primeng/breadcrumb";
import { CardModule } from "primeng/card";
import { PanelMenuModule } from "primeng/panelmenu";
import { SidebarModule } from "primeng/sidebar";
import { ToastModule } from "primeng/toast";
import { VirtualScrollerModule } from "primeng/virtualscroller";
import { SharedModule } from "src/app/shared/shared.module";
import { AppFooterComponent } from "./footer/app.footer.component";
import { AppBreadcrumbComponent } from "./breadcrumb/app.breadcrumb.component";
import { MenuDinamico } from "./menu-dinamico/menu-dinamico";
import { AppTopBarComponent } from "./topbar/app.topbar.component";
import { InputTextModule } from "primeng/inputtext";
import { AppConfigComponent } from "./app.config.component";
import { NgxPermissionsModule } from 'ngx-permissions';

@NgModule({
    declarations: [
        AppMainComponent,
        DashboardComponent,
        ClienteListComponent,
        ClienteAddComponent,
        ClienteEditComponent,
        PerfilComponent,
        AppFooterComponent,
        AppBreadcrumbComponent,
        MenuDinamico,
        AppTopBarComponent,
        AppConfigComponent
    ],
    imports: [
        AppMainRoutingModule,
        AvatarModule,
        BreadcrumbModule,
        CardModule,
        ChartModule,
        CommonModule,
        ConfirmDialogModule,
        FormsModule,
        InputMaskModule,
        InputTextModule,
        MenuModule,
        PanelMenuModule,
        ProgressBarModule,
        ReactiveFormsModule,
        SharedModule,
        SidebarModule,
        TableModule,
        TimelineModule,
        ToastModule,
        ToolbarModule,
        VirtualScrollerModule,
        NgxPermissionsModule.forChild()
    ]
})
export class AppMainModule {}