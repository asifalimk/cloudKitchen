import { HttpClient } from '@angular/common/http';
import { TagPlaceholder } from '@angular/compiler/src/i18n/i18n_ast';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable, throwError } from 'rxjs';
import { tap } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class CoupensService {

  constructor(private httpClient: HttpClient) { }


  /**
   * fetch list of product categories
   */
  fetchCoupons(): Observable<Coupens> {
    return this.httpClient.get<Coupens>(`${environment.url}/coupons`)
      .pipe(
        tap((data) => { },
          (error: any) => throwError(error)
        )
      );
  }

    /**
   * fetch list of product categories
   */
  addCoupons(req): Observable<boolean> {
    
    return this.httpClient.post<any>(`${environment.url}/post`,req)
      .pipe(
        tap((data) => { },
          (error: any) => throwError(error)
        )
      );
  }


}


export interface Coupens {
  message: Message[];
  success: boolean;
}

interface Message {
  id: number;
  post:string,
  action:string,
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
