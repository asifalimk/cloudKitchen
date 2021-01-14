import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable, throwError } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private httpClient: HttpClient) { }


    /**
   * fetch list of product categories
   */
  fetchUsers(): Observable<Users> {
    return this.httpClient.get<Users>(`${environment.url}/users`)
      .pipe(
        tap((data) => { },
          (error: any) => throwError(error)
        )
      );
  }

  addUsers(req:UserReq): Observable<any> {
    return this.httpClient.post<any>(`${environment.url}/register`,req)
      .pipe(
        tap((data) => { },
          (error: any) => throwError(error)
        )
      );
  }
}


export interface Users {
  message: UserData;
  success: boolean;
}

export interface UserData {
  id: number;
  name: string;
  username: string;
  email?: any;
  dob?: any;
  country_code: string;
  mobile: string;
  role: string;
  avatar?: any;
  location?: string;
  device_id?: any;
  content?: Content;
  remember_token: string;
  token_expires_at: string;
  status: number;
  created_at: string;
  updated_at: string;
}

interface Content {
  location: string;
}


interface UserReq {
  username: string;
  password: string;
  role: string;
  store: number;
}