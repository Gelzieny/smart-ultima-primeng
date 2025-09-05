import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Location} from '@angular/common';
import {AppBreadcrumbService} from '../../../modules/main/breadcrumb/app.breadcrumb.service';
import {MessageService} from 'primeng/api';
import {ActivatedRoute, Router} from '@angular/router';
import {ClienteService} from '../cliente.service';
import {Cliente} from '../cliente.model';
import {cpfValidator} from '../../../shared/validators/cpf.validator';

@Component({
    selector: 'app-cliente-add',
    templateUrl: './cliente-edit.component.html'
})
export class ClienteEditComponent implements OnInit {

    clienteForm: FormGroup = new FormGroup({});
    loading = false;
    idCliente: string;
    cliente: any;

    constructor(private formBuilder: FormBuilder,
                private messageService: MessageService,
                private router: Router,
                private location: Location,
                private routerParam: ActivatedRoute,
                private clienteService: ClienteService,
                private breadcrumbService: AppBreadcrumbService) {

        this.breadcrumbService.setItems([
            {label: 'Clientes', routerLink: ['/cliente']},
            {label: 'Editar Cliente', routerLink: ['/edit-cliente']}
        ]);

        this.clienteForm = this.formBuilder.group({
            nome: new FormControl('', [Validators.required]),
            cpf: new FormControl('', {
                validators: [Validators.required, cpfValidator()]
            }),
            telefone: new FormControl('', [Validators.required]),
            endereco: new FormControl('', [Validators.required])
        });
    }

    ngOnInit(): void {
        this.idCliente = this.routerParam.snapshot.queryParams['id'];

        this.clienteService.getClienteById(this.idCliente).subscribe({
            next: (cliente: Cliente) => {
                this.cliente = cliente;
                this.clienteForm.patchValue(this.cliente);
                this.loading = false;
            },
            error: (err: any) => {
                this.messageService.add({
                    severity: 'error',
                    summary: 'Erro ao tentar obter o Cliente:',
                    detail: err.message,
                    life: 3000
                });
                this.loading = false;
            }
        });
    }

    salvar() {
        let updateCliente: Cliente = this.clienteForm.getRawValue();
        updateCliente.id = Number(this.idCliente);
        this.clienteService.update(updateCliente).subscribe({
            next: (cliente: Cliente) => {
                this.cliente = cliente;
                this.clienteForm.patchValue(this.cliente);
                this.loading = false;
            },
            error: (err: any) => {
                this.messageService.add({
                    severity: 'error',
                    summary: 'Erro ao tentar persistir o Cliente:',
                    detail: err.message,
                    life: 3000
                });
                this.loading = false;
            },
            complete: () => {
                this.messageService.add({
                    severity: 'info',
                    summary: 'Info',
                    detail: 'Cliente atualizado com sucesso!!',
                    life: 6000
                });
            }
        });
    }

    voltar() {
        this.location.back();
    }
}
