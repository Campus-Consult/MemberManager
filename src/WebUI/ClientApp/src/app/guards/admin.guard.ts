import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AuthorizeService } from 'src/api-authorization/authorize.service';

export const FORBIDDEN_ROUTE_STRING='forbidden';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  constructor(private authorize: AuthorizeService,  private router: Router) {
  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      route.pathFromRoot
    return this.authorize.isAuthenticatedAdminUser().pipe(tap(isAuthenticated => this.handleAuthorization(isAuthenticated, state)));
  }

  private handleAuthorization(isAuthenticated: boolean, state: RouterStateSnapshot) {
    if (!isAuthenticated) {
      this.router.navigate(['./forbidden', {route: state.url}]);
    }
  }
  
}
