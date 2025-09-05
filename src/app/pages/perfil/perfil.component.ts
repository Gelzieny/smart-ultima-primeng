import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/modules/core/auth/auth.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss']
})
export class PerfilComponent implements OnInit {
  user: any;
  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.user = {
      name: this.authService.getGivenName(),
      email: this.authService.getEmailCorporativo(),
      user: this.authService.getUsername(),
      cpf: this.authService.getCpf()
    };
  }

}
