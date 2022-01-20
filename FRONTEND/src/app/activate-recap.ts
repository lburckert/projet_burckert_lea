import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { AccountState } from 'shared/states/account-state';
import { Client } from './form/client';

@Injectable({
  providedIn: 'root'
})
export class ActivateRecap implements CanActivate {

  @Select(AccountState.getAccount) client$!: Observable<Client>;

  constructor(private router: Router, private store: Store) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    const isAuthenticated = this.store.selectSnapshot(AccountState.getAccount);

    if (!isAuthenticated) {
      this.router.navigate(['username'], { queryParams: { returnUrl: state.url } });
      return false;
    }
    return true;
  }

}
