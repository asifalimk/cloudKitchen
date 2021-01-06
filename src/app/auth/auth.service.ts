import { HttpClient } from '@angular/common/http';
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


  constructor(private httpClient: HttpClient) {

    // If the window storage contains token, set in the in memory and change the login state
    this.token = this.getWebToken();
  }

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
    return !!this.token && this.user.role == 'Admin';
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
      this.window.localStorage.setItem(WEB_TOKEN_KEY, token);
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
   //TODO Change or remove logout api call and add subject behaviour without window reloading
  logout(): Observable<any> {
    // clear the token from the web storage
    this.clearWebToken();
    // clear the in memory token and user
    this.token = null;
    this.user = null;
    this.updateAuthStatus();
    window.location.reload();
    return this.httpClient.post<any>('api/logout', {});
  }

  /**
  * Return the token from the web storage
  * @returns Token
  */
  private getWebToken() {
    const tokenStr = this.window.localStorage.getItem(WEB_TOKEN_KEY);
    if (tokenStr != null)
      return tokenStr;
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


  /**
 * Check the user is authenticated or not
 * @returns boolean
 */
  isAuthenticated(): boolean {
    return !!this.token;
  }


  /**
   * Fetching the user profile
   * @returns Observable
   */
  fetchProfile(): Observable<boolean> {
    return this.httpClient.post<any>(`${environment.url}/userDetails`, {})
      .pipe(
        tap((data) => {
          if (data && data.success) {
            this.user = data.success;
            return true
          } else {
            return false;
          }

        },
          (error: any) => throwError(error)
        )
      );
  }


}

// TODO: CHANGE THE MODEL AS THE RESPONSE 
interface LoginRequest {
  name: string;
  code: string
  mobile: string;
}

// TODO: CHANGE THE MODEL AS THE RESPONSE 


export interface Token {
  id: number;
  name: string;
  email: string;
  dob?: any;
  country_code: string;
  mobile: string;
  role: string;
  avatar: any;
  location: any;
  device_id: any;
  content: any;
  remember_token: any;
  token_expires_at: any;
  status: number;
  created_at: string;
  updated_at: string;
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