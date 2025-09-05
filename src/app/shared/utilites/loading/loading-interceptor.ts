import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {finalize, Observable} from 'rxjs';
import {LoadingService} from './loading.service';

@Injectable()
export class LoadingInterceptor implements HttpInterceptor {

    constructor(
        private loadingService: LoadingService
    ) {
    }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        this.loadingService.setLoading(true, request.url);
        return next.handle(request)
            .pipe(
                finalize(() => {
                    this.loadingService.setLoading(false, request.url);
                })
            );
    }
}
