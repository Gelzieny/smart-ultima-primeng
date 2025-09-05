import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {AuthService} from '../../auth/auth.service';
import {environment} from '../../../../../environments/environment';
import {Vinculo} from '../../models/rhnet/vinculo.model';

@Injectable({
    providedIn: 'root'
})
export class RhNetService {

    constructor(private http: HttpClient,
                private authService: AuthService) {
    }

    findViculoByCpf(): Observable<Vinculo> {
        return this.http.get<Vinculo>(`${environment.apiRhVinculos}/${this.authService.getCpf()}`, );
    }
}
