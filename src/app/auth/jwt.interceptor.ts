import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpParams
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

  private window = window;
  constructor() { }

  /**
 * Intercepts
 *   - Auth Token in Header
 *   - Application ID in Params (in URL PARAMS)
 *
 * @param request
 * @param next
 */
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let authReq = request;
    const httpParams = new HttpParams();
    const token = this.getJWT()
    if (token) {
      authReq = request.clone({
        setHeaders: {
          Authorization: "Bearer " + this.getJWT()
        },
        params: httpParams
      });
    }
    return next.handle(authReq);
  }



  getJWT(): string {
    return this.window.localStorage.getItem("token");
  }

}
