import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Location} from '@angular/common';
import {AppBreadcrumbService} from '../../../modules/main/breadcrumb/app.breadcrumb.service';
import {MessageService} from 'primeng/api';
import {ActivatedRoute, Router} from '@angular/router';
import {ClienteService} from '../cliente.service';
import {cpfValidator} from '../../../shared/validators/cpf.validator';
import {Cliente} from '../cliente.model';

@Component({
    selector: 'app-cliente-add',
    templateUrl: './cliente-add.component.html'
})
export class ClienteAddComponent implements OnInit {

    clienteForm: FormGroup = new FormGroup({});
    loading = false;
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
            {label: 'Cadastrar Cliente', routerLink: ['/add-cliente']}
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

    }

    salvar() {
        const newCliente: Cliente = this.clienteForm.getRawValue();
        this.clienteService.save(newCliente).subscribe({
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
                    detail: 'Cliente registrado com sucesso!!',
                    life: 6000
                });
            }
        });
    }

    voltar() {
        this.location.back();
    }
}
