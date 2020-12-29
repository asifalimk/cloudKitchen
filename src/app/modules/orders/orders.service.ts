import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { throwError } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  constructor(private httpClient: HttpClient) { }

  getListOfOrders(){
    return this.httpClient.get<any>(`${environment.url}/orders`)
    .pipe(
      tap((res) => { },
        (error: any) => throwError(error)
      )
    );
  }

}
