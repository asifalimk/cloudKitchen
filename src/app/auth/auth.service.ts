import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable, Subject, throwError } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';

const WEB_TOKEN_KEY = 'TOKEN';

@Injectable({
  providedIn: 'root'
})


export class AuthService {

  private user: any;
  private token: any;
  private authSubject = new Subject<boolean>();
  private window = window;


  constructor(private httpClient: HttpClient) { }

  /**
   * Get the user profile information
   * @returns User
   */
  getProfile(): User {
    return this.user;
  }

  //TODO
  /**
 * Return true if the user is recruiter
 * @returns boolean
 */
  isAdmin(): boolean {
    return !!this.token;
  }



  /**
 * Trigger the login 
 * @param  {LoginRequest} req
 * @returns Observable
 */
  login(req: LoginRequest): Observable<boolean> {
    return this.httpClient.post<any>(`${environment.url}/authenticate`, req)
      .pipe(
        map((data: any) => {
          console.log(data.data)
          // save the token in the web storage
          this.saveWebToken(data.message.token);
          // also store the token in the in memory
          this.token = data.message.data;
          this.updateAuthStatus();
          return true;
        },
          (error) => throwError(error)
        )
      );
  }


  /**
   * Save the token to the web storage
   * @param  {Token} token
   * @returns boolean
   */
  private saveWebToken(token: any): boolean {
    // TODO: ENCRYPT AND SAVE
    if (!!token) {
      this.window.localStorage.setItem(WEB_TOKEN_KEY, JSON.stringify(token));
      return true;
    }
    return false;
  }

  /**
 * Update the login subject if the token available
 */
  private updateAuthStatus(): void {
    this.authSubject.next(!!this.token);
  }

  /**
    * Logout and clear the in memory storage of user
    */
  logout(): Observable<any> {
    // clear the token from the web storage
    this.clearWebToken();
    // clear the in memory token and user
    this.token = null;
    this.user = null;
    this.updateAuthStatus();
    return this.httpClient.post<any>('api/logout', {});
  }

  /**
  * Return the token from the web storage
  * @returns Token
  */
  private getWebToken(): Token {
    const tokenStr = this.window.localStorage.getItem(WEB_TOKEN_KEY);
    if (tokenStr != null)
      return JSON.parse(tokenStr) as Token;
    else return null;
  }

  /**
  * Clear the token from the web storage
  */
  private clearWebToken() {
    this.window.localStorage.removeItem(WEB_TOKEN_KEY);
  }

  /**
 * Observable for the login status
 * This will return the boolean on subscription based on the login status
 * @returns Observable
 */
  onChange(): Observable<boolean> {
    return this.authSubject.asObservable();
  }

}

// TODO: CHANGE THE MODEL AS THE RESPONSE 
interface LoginRequest {
  name: string;
  code:string
  mobile: string;
}

// TODO: CHANGE THE MODEL AS THE RESPONSE 
export interface Token {
  name: string;
  role: string;
  email:string;
  avathar: string;
  location: string;
}

// TODO: CHANGE THE MODEL AS THE RESPONSE 
export interface User {
  firstName?: string;
  lastName?: string;
  email: string;
  dob?: Date;
  phoneCountry?: string;
  phone: number;
}