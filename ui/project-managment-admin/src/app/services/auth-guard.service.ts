import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot} from "@angular/router";
import {Observable} from "rxjs/internal/Observable";

@Injectable({
  providedIn: 'root'
})
/**
 * This class is moved to auth module, Refer that
 */

export class AuthGuardService implements CanActivate {

  constructor() {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    console.log('called auth guard');
    return true;
  }
}
