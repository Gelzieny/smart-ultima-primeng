import { Component, OnInit } from "@angular/core";
import { AppComponent } from "../../../app.component";
import { PortalService } from "../../core/services/portal/portal.service";

@Component({
    selector: "app-menu",
    template: `
        <ul class="layout-menu">
            <li
                app-menuitem
                *ngFor="let item of model; let i = index"
                [item]="item"
                [index]="i"
                [root]="true"
            ></li>
        </ul>
    `,
})
export class AppMenuComponent implements OnInit {
    model: any[];

    constructor(public app: AppComponent, private portalService: PortalService) {}

    ngOnInit() {
        this.model = [
            {
                label: 'HOME',
                items: [
                    {
                        label: "Dashboard",
                        icon: "pi pi-fw pi-home",
                        routerLink: ["/"],
                    }
                ],
            },
            {
              label: 'Cadastros',
              items: [
                  {
                      label: "Clientes",
                      icon: "pi pi-id-card",
                      routerLink: ["/cliente"],
                  }
              ],
            },
            {
                label: "Documentação",
                items: [
                    {
                        label: "Documentação Template",
                        icon: "pi pi-fw pi-info-circle",
                        url: ["https://primefaces.org/ultima-ng/#/documentation"],
                        target: "_blank",
                    },
                ],
            },
        ];
    }
}
