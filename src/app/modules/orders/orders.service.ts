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

  getOrderStatusCount(){
    return this.httpClient.get<any>(`${environment.url}/countByOrderStatus`)
    .pipe(
      tap((res) => { },
        (error: any) => throwError(error)
      )
    );
  }

  getOrderDetails(req){
    return this.httpClient.get<any>(`${environment.url}/orderDetails/`+req)
    .pipe(
      tap((res) => { },
        (error: any) => throwError(error)
      )
    );
  }

  getDeliveryBoys(){
    return this.httpClient.get<any>(`${environment.url}/availableDeliveryBoys`)
    .pipe(
      tap((res) => { },
        (error: any) => throwError(error)
      )
    );
  }

  changeOrderStatus(req){

    return this.httpClient.post<any>(`${environment.url}/changeOrderStatus`,req)
      .pipe(
        tap((req) => { },
          (error: any) => throwError(error)
        )
      );
  }

  changeOrderPreparedStatus(req){

    return this.httpClient.post<any>(`${environment.url}/changeOrderPreparedStatus`,req)
      .pipe(
        tap((req) => { },
          (error: any) => throwError(error)
        )
      );
  }

  assignDeliveryBoy(req){

    return this.httpClient.post<any>(`${environment.url}/assignDeliveryBoy`,req)
      .pipe(
        tap((req) => { },
          (error: any) => throwError(error)
        )
      );
  }

  getDeliveryBoyDetails(req){
    return this.httpClient.get<any>(`${environment.url}/deliveryBoy/`+req)
    .pipe(
      tap((res) => { },
        (error: any) => throwError(error)
      )
    );
  }

}
