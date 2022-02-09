import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Admin } from '../models/admin';
import {AdminService} from '../services/admin.service';

/*
 Service used to login & logout via the API
*/

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

    public currentAdminSubject: BehaviorSubject<any>;
    public currentAdmin: Observable<Admin>;

    constructor(private http: HttpClient, private adminService: AdminService) {
        let sessionCurrentAdmin = localStorage.getItem('currentAdmin');
        this.currentAdminSubject = new BehaviorSubject<Admin>(JSON.parse(sessionCurrentAdmin!));
        this.currentAdmin = this.currentAdminSubject.asObservable();
    }

    public get currentAdminValue(): Admin {
        return this.currentAdminSubject.value;
    }

    /*
      authenticate admin
    */
    async login(username: string, password: string){
        const admin = new Admin();
        admin.username = username;
        admin.password = password;
        const loginRes = await this.adminService.loginAdmin(admin);

        return loginRes;
    }

    logout() {
        // remove admin from the local storage to log admin out
        localStorage.removeItem('currentAdmin');
        this.currentAdminSubject.next(null);
    }
}
