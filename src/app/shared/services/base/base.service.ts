import {Observable, ReplaySubject, take, tap, throwError} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import {HttpClient, HttpErrorResponse, HttpParams} from '@angular/common/http';
import {MessageService} from 'primeng/api';
import {Injector} from '@angular/core';
import {BaseModel} from '../../models/base.model';
import {PageRequest} from '../../models/page-sort/page-request.model';
import {Page} from '../../models/page-sort/page.model';
import {CrudOperations} from '../../interfaces/crud-operations.interface';
import {environment} from '../../../../environments/environment';

export abstract class BaseService<T extends BaseModel, ID> implements CrudOperations<T, number> {
    protected http: HttpClient;
    protected messageService: MessageService;

    private _entity$: ReplaySubject<T> = new ReplaySubject<T>();

    get entity$(): Observable<T> {
        return this._entity$.asObservable();
    }

    set entity(value: T) {
        this._entity$.next(value);
    }

    protected constructor(
        protected injector: Injector,
        protected base: string,
        protected jsonToResourceFn: (json: any) => T,
    ) {
        this.http = injector.get(HttpClient);
        this.messageService = injector.get(MessageService);
    }

    save(t: T, httpParams?: HttpParams): Observable<T> {
        return this.http.post<T>(this.base, t, {params: httpParams}).pipe(
            map(this.jsonToResourceFn.bind(this)),
            catchError(this.handleError.bind(this))
        );
    }

    update(t: T, httpParams?: HttpParams): Observable<T> {
        return this.http.put<T>(`${this.base}/`, t, {params: httpParams}).pipe(
            map(this.jsonToResourceFn.bind(this)),
            catchError(this.handleError.bind(this))
        );
    }

    findOne(id: number, httpParams?: HttpParams): Observable<T> {
        return this.http.get<T>(`${this.base}/${id}`, {params: httpParams}).pipe(
            map(this.jsonToResourceFn.bind(this)),
            tap((entity) => this.entity = entity as T),
            catchError(this.handleError.bind(this))
        );
    }

    page(pageRequest?: PageRequest): Observable<Page<T>> {
        const params: { [key: string]: any } = !pageRequest ? {} : {
            page: pageRequest.page,
            size: pageRequest.size,
            sort: pageRequest.sort.column + ',' + pageRequest.sort.direction
        };

        return this.http.get<Page<T>>(`${this.base}/paginado`, {params}).pipe(
            map(response => this.jsonToPage(response)),
            catchError(this.handleError.bind(this))
        );
    }

    findAll(): Observable<T[]> {
        return this.http.get<T[]>(`${this.base}/all`).pipe(
            map(response => this.jsonToResources(response)),
            catchError(this.handleError.bind(this))
        );
    }

    delete(id: number): Observable<T> {
        return this.http.delete<T>(`${this.base}/${id}`).pipe(
            map(() => null),
            catchError(this.handleError.bind(this))
        );
    }

    updateEntityProperty(propName: keyof T, newValue: any): void {
        this._entity$.pipe(take(1)).subscribe((entity) => {
            (entity as any)[propName] = newValue;
            this.entity = newValue as T
        });
    }

    protected jsonToResources(json: any): T[] {
        const resources: T[] = [];
        if (json !== undefined && json !== null) {
            json.forEach((e: T) => resources.push(this.jsonToResourceFn(e)));
        }
        return resources;
    }

    protected jsonToPage(json: any): Page<T> {
        return Page.fromJson(this.jsonToResources(json.content), json);
    }

    protected handleError(errorResponse: HttpErrorResponse): Observable<T> {
        this.messageService.add(
            {
                key: 'global',
                severity: 'error',
                summary: errorResponse ? `${errorResponse.error.status || 'Erro na requisição!'}` : 'Erro na requisição!',
                detail: errorResponse.error.message || 'Se o problema persistir, por favor, entre em contato com o administrador do sistema para obter assistência.',
                life: 6000
            }
        );
        return throwError(() => errorResponse);
    }
}

