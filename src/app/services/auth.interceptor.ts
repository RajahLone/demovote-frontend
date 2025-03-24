import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AccountService } from './account.service';

@Injectable()

export class AuthInterceptor implements HttpInterceptor
{

  private authToken: string = "";

  constructor(private accountService: AccountService) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>>
  {
    const authToken = this.accountService.getToken();

    const modified = request.clone({ headers: request.headers.append('Authorization', "Bearer " + authToken) });

    return next.handle(modified);
  }

}
