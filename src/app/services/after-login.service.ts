import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router'
import { Observable } from 'rxjs'
import { TokenService } from './token.service'

@Injectable({
  providedIn: 'root'
})
export class AfterLoginService implements CanActivate {
  constructor(private token: TokenService) { }
  
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> {

    return this.token.loggedIn();
  }
}
