import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user';
import { environment } from '../../environments/environment';

const baseUrl = environment.serverBaseURL;

/*
  service to invoke User API
*/


@Injectable({
  providedIn: 'root'
})
export class UserService {

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

  getUsers() {
    return this.request('get', `${baseUrl}/user`);
  }

  getUser(email: string) {
    return this.request('get', `${baseUrl}/user/${email}`);
  }

  createUser(user: User) {
    const userData = this.request('post', `${baseUrl}/user`, user);
    return userData;
  }

  updateUser(user: User) {
    return this.request('post', `${baseUrl}/user/${user.id}`, user);
  }

  deleteUser(id: number) {
    return this.request('delete', `${baseUrl}/user/${id}`, null, 'text');
  }

}
