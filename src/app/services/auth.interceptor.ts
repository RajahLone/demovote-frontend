import { catchError, switchMap } from 'rxjs/operators';
import { throwError } from "rxjs";
import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AccountService } from './account.service';

@Injectable()

export class AuthInterceptor implements HttpInterceptor
{

  private authToken: string = "";

  private isRefreshing = false;

  constructor(private accountService: AccountService) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>>
  {
    const authToken = this.accountService.getAccessToken();

    const modified = request.clone({ headers: request.headers.append('Authorization', "Bearer " + authToken) });

    return next.handle(modified).pipe(
      catchError((error) => { if (error instanceof HttpErrorResponse && !request.url.includes('/sign/in') && error.status === 403) { return this.handle401Error(request, next); } return throwError(() => error); })
      );
  }

  private handle401Error(request: HttpRequest<any>, next: HttpHandler)
  {
    if (!this.isRefreshing)
    {
      this.isRefreshing = true;

      if (this.accountService.isLogged())
      {
        return this.accountService.updateToken().pipe(
          switchMap(() => {
            this.isRefreshing = false;
            const authToken = this.accountService.getAccessToken();
            const modified = request.clone({ headers: request.headers.append('Authorization', "Bearer " + authToken) });
            return next.handle(modified);
            }),
          catchError((error) => {
            this.isRefreshing = false;
            if (error.status == '403') { this.accountService.silentOut(); }
            return throwError(() => error);
            })
          );
      }
    }

    return next.handle(request);
  }

}
