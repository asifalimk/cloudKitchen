import { HttpClient } from '@angular/common/http';
import { TagPlaceholder } from '@angular/compiler/src/i18n/i18n_ast';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable, throwError } from 'rxjs';
import { tap } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class ProductCategoriesService {

  constructor(private httpClient: HttpClient) { }


  /**
   * fetch list of product categories
   */
  fetchProductCategories(): Observable<ProductCategories> {
    return this.httpClient.get<ProductCategories>(`${environment.url}/categories`)
      .pipe(
        tap((data) => { },
          (error: any) => throwError(error)
        )
      );
  }

    /**
   * fetch list of product categories
   */
  addProductCategories(req): Observable<ProductCategories> {
    return this.httpClient.post<ProductCategories>(`${environment.url}/api/v1/post`,req)
      .pipe(
        tap((data) => { },
          (error: any) => throwError(error)
        )
      );
  }


}


export interface ProductCategories {
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
