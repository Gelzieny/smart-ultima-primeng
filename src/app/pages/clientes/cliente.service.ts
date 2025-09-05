import {HttpClient, HttpParams} from '@angular/common/http';
import {Injectable, Injector} from '@angular/core';
import {environment} from 'src/environments/environment';
import {Cliente} from './cliente.model';
import {BaseService} from '../../shared/services/base';
import {PageRequest} from '../../shared/models/page-sort/page-request.model';
import {Observable} from 'rxjs';
import {Page} from '../../shared/models/page-sort/page.model';
import {catchError, map} from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class ClienteService extends BaseService<Cliente, number> {
    constructor(protected injector: Injector) {
        super(injector, `${environment.apiUrl}`, Cliente.fromJson);
    }

    getClienteById(id: string): Observable<Cliente> {
        return this.http.get<Page<Cliente>>(`${environment.apiUrl}/${id}`).pipe(
            map(response => response),
            catchError(this.handleError.bind(this))
        );
    }

    findClientes(paramClienteDto: any, pageRequest?: PageRequest): Observable<Page<Cliente>> {
        const pageable: { [key: string]: any } = !pageRequest ? {} : {
            page: pageRequest.page || 0,
            size: pageRequest.size || 5,
            sort: pageRequest.sort.column + ',' + pageRequest.sort.direction
        };

        const params = new HttpParams()
            .set('page', pageable.page)
            .set('size', pageable.size)
            .set('sort', pageable.sort);

        return this.http.post<Page<Cliente>>(`${environment.apiUrl}/paginado`, {...paramClienteDto}, {params}).pipe(
            map(response => response),
            catchError(this.handleError.bind(this))
        );
    }


}
