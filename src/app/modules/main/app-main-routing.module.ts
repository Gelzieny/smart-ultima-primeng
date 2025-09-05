import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
import { ClienteListComponent } from '../../pages/clientes/cliente-list/cliente-list.component';
import { ClienteAddComponent } from '../../pages/clientes/cliente-add/cliente-add.component';
import { ClienteEditComponent } from '../../pages/clientes/cliente-edit/cliente-edit.component';
import { PerfilComponent } from '../../pages/perfil/perfil.component';
import { AppMainComponent } from './app.main.component';

const routes: Routes = [
    {
        path: '', component: AppMainComponent,
        children: [
            { path: '', component: DashboardComponent },
            { path: 'cliente', component: ClienteListComponent },
            { path: 'add-cliente', component: ClienteAddComponent },
            { path: 'edit-cliente', component: ClienteEditComponent },
            { path: 'perfil', component: PerfilComponent },
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AppMainRoutingModule { }
