
import { Injectable, Inject } from '@angular/core';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

export interface AuthData {
    authenticated: boolean;
    claims: {[key: string]: string};
    permissions: string[];
}

export interface User {
    name: string;
    email: string;
    claims: {[key: string]: string};
    permissions: string[];
}

const MAIL_CLAIM = 'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress';

@Injectable()
export class AuthUserService {

    private currentUserSubject: BehaviorSubject<User>;
    public currentUser: Observable<User>;

    constructor(private httpClient: HttpClient, @Inject('BASE_URL') private baseUrl: string, private router: Router) {
        this.currentUserSubject = new BehaviorSubject<User>(null);
        this.currentUser = this.currentUserSubject.asObservable();
        this.refreshAuthStatus();
    }

    /**
     * Refreshes the current auth status, returns immediately
     * to be notified about the actual results, subscribe to the currentUser observable
     */
    public refreshAuthStatus(): void {
        this.httpClient.get<AuthData>(this.baseUrl + 'Account/AuthStatus')
            .subscribe((data: AuthData) => {
                if (data.authenticated) {
                    const user: User = {
                        name: data.claims.name,
                        email: data.claims[MAIL_CLAIM],
                        claims: data.claims,
                        permissions: data.permissions,
                    };
                    this.currentUserSubject.next(user);
                } else {
                    this.currentUserSubject.next(null);
                }
            });
    }

}
