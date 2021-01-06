import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { NgxSpinnerService } from 'ngx-spinner';
import { map, catchError } from 'rxjs/operators';

@Injectable()
export class AppInterceptor implements HttpInterceptor {

  constructor(private spinner: NgxSpinnerService) { }

  intercept(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<any>> {

    this.spinner.show();

    return next.handle(req).pipe(map((event: HttpEvent<any>) => {
      if (event instanceof HttpResponse) {
        this.spinner.hide();
      }
      return event;
    }),
      catchError((error): Observable<any> => {
        this.spinner.hide();
        return this.handleError(error);
      })
    );
  }

  private handleError(error: HttpErrorResponse): Observable<HttpErrorResponse> {
    console.error(`Error in HTTP: Status - ${error.status} - Message ${error.message}`);
    return throwError(error.error);
  }
}
