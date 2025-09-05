import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {LazyLoadEvent, MessageService} from 'primeng/api';
import {AppBreadcrumbService} from 'src/app/modules/main/breadcrumb/app.breadcrumb.service';
import {Cliente} from '../cliente.model';
import {ClienteService} from '../cliente.service';
import {Observable, of} from 'rxjs';
import {SortDirection} from '../../../shared/models/page-sort/sort-direction.enum';
import {PageRequest} from '../../../shared/models/page-sort/page-request.model';
import {strip} from '../../../shared/utilites/cpf.util';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {Page} from '../../../shared/models/page-sort/page.model';
import {cpfValidator} from '../../../shared/validators/cpf.validator';

@Component({
    selector: 'app-cliente-list',
    templateUrl: './cliente-list.component.html',
    styleUrls: ['./cliente-list.component.scss']
})
export class ClienteListComponent implements OnInit {

    public form: FormGroup;
    public totalElements: number = 0;
    public loading: boolean = false;
    public pageRequest: PageRequest;
    public rows: number = 5;
    public page: number = 0;
    public multiSortMeta: any[];
    public clientes$: Observable<Cliente[]> = of([]);
    public clientesSelecionados: Cliente[] = [];


    constructor(private readonly fb: FormBuilder,
                private messageService: MessageService,
                private router: Router,
                private clienteService: ClienteService,
                private breadcrumbService: AppBreadcrumbService) {
        this.breadcrumbService.setItems([
            {label: 'Clientes', routerLink: ['/cliente']},
            {label: 'Cadastro de Cliente', routerLink: ['/add-cliente']}
        ]);
    }

    ngOnInit(): void {
        this.form = this.fb.group({
            cpf: new FormControl(null, {
                validators: [cpfValidator()]
            })
        });
    }

    get cpf() {
        return this.form.get('cpf');
    }

    loadPage(event: LazyLoadEvent) {
        setTimeout(() => {
            this.multiSortMeta = event.sortField && event.sortOrder ?
                [{
                    column: event.sortField,
                    direction: event.sortOrder === 1 ?
                        SortDirection.ASCENDING : SortDirection.DESCENDING
                }] : null;

            this.page = Number(event.first) / Number(event.rows);
            this.rows = Number(event.rows);
            this.pageRequest = this.multiSortMeta ?
                new PageRequest(this.page, this.rows, this.multiSortMeta[0]) :
                new PageRequest(this.page, this.rows);

            this.getClientes();
        });
    }

    filter() {
        this.getClientes();
    }

    clear(){
        this.form.reset();
        this.getClientes();
    }

    getClientes() {
        this.loading = true;

        let clienteDTO: Cliente = null;
        if (this.form.touched) {
            clienteDTO = this.form.getRawValue();
            clienteDTO.cpf = strip(clienteDTO.cpf);
        }

        const request: Observable<Page<Cliente>> = this.clienteService.findClientes(clienteDTO, this.pageRequest);

        request.subscribe({
            next: res => {
                this.clientes$ = of(res.content as any || []);
                this.loading = false;
                this.totalElements = res.totalPages > 1 ? res.totalElements || res.content.length : res.numberOfElements;
            },
            error: (err) => {
                this.messageService.add({severity: 'error', summary: 'Erro ao tentar obter Clientes:', detail: err.message, life: 3000});
                this.loading = false;
            }
        });
    }

    onSelectionChange(clientes: Cliente[]) {
        this.clientesSelecionados = clientes;
    }


    addCliente(): void {
        this.router.navigate(['add-cliente']);
    }

    editCliente(cliente: Cliente): void {
        this.router.navigate(['edit-cliente'], {queryParams: {id: cliente.id.toString()}});
    }

    deleteCliente(cliente: Cliente): void {

    }
}
