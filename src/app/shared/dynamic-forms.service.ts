import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable, throwError } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DynamicFormsService {

  constructor(private httpClient: HttpClient) { }
  /**
   * returns create product categories form json structure
   */
  getProductCategoriesForm(): Observable<ProductCategoriesForm> {
    return this.httpClient.get<ProductCategoriesForm>(`${environment.url}/dynamicForm/category`)
      .pipe(
        tap((res) => { },
          (error: any) => throwError(error)
        )
      );
  }

  getCouponTypesForm(): Observable<CouponTypesForm> {
    return this.httpClient.get<CouponTypesForm>(`${environment.url}/dynamicForm/category`)
      .pipe(
        tap((res) => { },
          (error: any) => throwError(error)
        )
      );
  }
}





export interface ProductCategoriesForm {
  header: string;
  fields: Fields;
}

export interface CouponTypesForm {
  header: string;
  fields: Fields;
}

export interface CoupensForm {
  header: string;
  fields: Fields;
}

interface Fields {
  title: string;
  description: string;
  parent: string;
  image: string;
  status: string;
}