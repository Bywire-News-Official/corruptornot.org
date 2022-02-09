import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';

@Injectable({ providedIn: 'root' })
export class AuthChecker implements CanActivate  {
    constructor(
        private router: Router,
        private authenticationService: AuthenticationService
    ) { }

    // prevent unauthenticated users from accessing restricted routes
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const currentUser = this.authenticationService.currentAdminValue;
        if (currentUser) {
            // logged in, so return true
            return true;
        }
        // not logged in, so redirect to login page
        this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
        return false;
    }
}
