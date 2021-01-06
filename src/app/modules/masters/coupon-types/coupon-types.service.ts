import { HttpClient } from '@angular/common/http';
import { TagPlaceholder } from '@angular/compiler/src/i18n/i18n_ast';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable, throwError } from 'rxjs';
import { tap } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class CouponTypesService {

  constructor(private httpClient: HttpClient) { }


  /**
   * fetch list of product categories
   */
  fetchCouponTypes(): Observable<CouponTypes> {
    return this.httpClient.get<CouponTypes>(`${environment.url}/couponTypes`)
      .pipe(
        tap((data) => { },
          (error: any) => throwError(error)
        )
      );
  }

    /**
   * fetch list of product categories
   */
  addCouponTypes(req): Observable<CouponTypes> {
    return this.httpClient.post<CouponTypes>(`${environment.url}/post`,req)
      .pipe(
        tap((data) => { },
          (error: any) => throwError(error)
        )
      );
  }


}


export interface CouponTypes {
  message: Message[];
  success: boolean;
}

interface Message {
  id: number;
  parent_id?: any;
  content: Content;
  created_at: string;
  updated_at: string;
  sub_category?: any;
}

interface Content {
  title?: string;
  description?: string;
  image?: string;
  status: boolean | number;
}
