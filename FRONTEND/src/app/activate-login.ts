import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { AccountState } from 'shared/states/account-state';

@Injectable({
  providedIn: 'root'
})
export class ActivateLogin implements CanActivate {
  constructor(private router: Router, private store: Store) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    const isAuthenticated = this.store.selectSnapshot(AccountState.getAccount);

    if (isAuthenticated) {
      this.router.navigate(['/recap'], { queryParams: { returnUrl: state.url } });
      return false;
    }
    return true;
  }
  
}
