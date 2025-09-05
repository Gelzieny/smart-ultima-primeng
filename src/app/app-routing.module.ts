import {RouterModule} from '@angular/router';
import {NgModule} from '@angular/core';
import {AppMainComponent} from './modules/main/app.main.component';
import {AuthGuard} from './modules/core/auth/auth.guard.service';
import {DashboardComponent} from './pages/dashboard/dashboard.component';
import {PerfilComponent} from './pages/perfil/perfil.component';
import {ClienteListComponent} from './pages/clientes/cliente-list/cliente-list.component';
import {ClienteAddComponent} from './pages/clientes/cliente-add/cliente-add.component';
import {ClienteEditComponent} from './pages/clientes/cliente-edit/cliente-edit.component';
import {AppErrorComponent} from './shared/components/erros/app.error.component';
import {AppNotfoundComponent} from './shared/components/erros/app.notfound.component';
import {NonAuthGuard} from './modules/core/auth/non-auth.guard';
import {AppAccessDeniedComponent} from './shared/components/erros/app.accessdenied.component';

// tslint:disable-next-line:class-name
export class aIcone{path: string; icone: string; }

function AppAccessdeniedComponent() {

}

@NgModule({
    imports: [
        RouterModule.forRoot([
            {
                path: '',
                loadChildren: () => import('./modules/main/app-main.module').then(m => m.AppMainModule),
                canActivate: [AuthGuard]
            },
            {path: 'erro', component: AppErrorComponent, canActivate: [NonAuthGuard]},
            {path: 'acesso-negado', component: AppAccessDeniedComponent, canActivate: [NonAuthGuard]},
            {path: 'nao-encontrado', component: AppNotfoundComponent, canActivate: [NonAuthGuard]},
        ], {initialNavigation: 'disabled'})
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {
    icones: [aIcone] | undefined;
    public getIcon(path: string): string {
        if (!this.icones) {
            this.icones  = [
                {
                    path: '/cliente',
                    icone: 'pi pi-id-card'
                }
            ];
        }
        const rIcone: aIcone | undefined = this.icones.find(icone => icone.path === path);
        return rIcone?.icone;
    }
}
