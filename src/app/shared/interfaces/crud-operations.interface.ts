import { Observable } from 'rxjs';
import { PageRequest } from '../models/page-sort/page-request.model';
import {HttpParams} from '@angular/common/http';

export interface CrudOperations<T, ID> {
    save(t: T, httpParams?: HttpParams): Observable<T>;
    update(t: T, httpParams?: HttpParams): Observable<T>;
    findOne(id: ID, httpParams?: HttpParams): Observable<T>;
    findAll(pageRequest?: PageRequest, httpParams?: HttpParams): Observable<T[]>;
    delete(id: ID, httpParams?: HttpParams): Observable<T>;
}
