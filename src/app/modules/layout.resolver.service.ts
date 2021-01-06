import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { AuthService } from 'app/auth/auth.service';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LayoutResolverService implements Resolve<any>  {

  constructor(private auth: AuthService) { }

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> {


    // if it is authenticated in the on init phase, fetch the user profile and continue the stuffs
    if (this.auth.isAuthenticated()) {
      return this.auth.fetchProfile()
    } else {
      return of({});
    }
  }
}
