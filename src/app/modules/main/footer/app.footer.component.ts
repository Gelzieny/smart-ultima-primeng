import {Component} from '@angular/core';
import {AppComponent} from '../../../app.component';
import {APP_VERSION} from '../../../../environments/version';

@Component({
    selector: 'app-footer',
    template: `
        <div class="layout-footer flex align-items-center p-4 shadow-2">


            <div style="display: flex; flex-direction: row; justify-content: space-between; width: 100%">
                <p>Copyright © {{ano}} - <strong><a style='text-decoration: none' target='_blank' href='https://goias.gov.br/governo'>Secretaria-Geral de Governo</a></strong> - Todos os direitos reservados.</p>

                <p><strong>Versão</strong> {{version}} </p>
            </div>
        </div>
    `
})
export class AppFooterComponent {
    public version = APP_VERSION.version;
    public ano = new Date().getFullYear();
    constructor(public app: AppComponent) {}
}
