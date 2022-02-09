import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Admin } from '../models/admin';
import { environment } from '../../environments/environment';

const baseUrl = environment.serverBaseURL;

/*
 This class contains the method for requesting admin from the api,
*/

@Injectable({
  providedIn: 'root'
})
export class AdminService {

    constructor(private http: HttpClient) { }
   private async request(method: string, url: string, data?: any, responseType?: any) {

    const result = this.http.request(method, url, {
      body: data,
      responseType: responseType || 'json',
      observe: 'body',
    });
    return new Promise<any>((resolve, reject) => {
      result.subscribe(resolve as any, reject as any);
    });
  }

  getAdmins() {
    return this.request('get', `${baseUrl}/admin`);
  }
  getAdmin(admin: Admin) {
    return this.request('get', `${baseUrl}/admin/${admin.username}`);
  }
  loginAdmin(admin: Admin) {
    return this.request('post', `${baseUrl}/admin/login`, admin);
  }

  createAdmin(admin: Admin) {
    const adminData = this.request('post', `${baseUrl}/admin`, admin);
    return adminData;
  }

  updateAdmin(admin: Admin) {
    return this.request('post', `${baseUrl}/admin/${admin.id}`, admin);
  }

  deleteAdmin(id: number) {
    return this.request('delete', `${baseUrl}/admin/${id}`, null, 'text');
  }    
}
