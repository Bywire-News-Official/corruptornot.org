import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Politician } from '../models/politician';
import { environment } from '../../environments/environment';

const baseUrl = environment.serverBaseURL;

/*
  Service to invoke politician API.
*/

@Injectable({
  providedIn: 'root'
})
export class PoliticiansService {

  constructor(private http: HttpClient) { }

 private async request(method: string, url: string, data?: any, responseType?: any) {

    const result = this.http.request(method, url, {
      body: data,
      responseType: responseType || 'json',
      observe: 'body',
      headers: {
        Authorization: 'basic ' + btoa('admin:supersecret')
      }
    });
    return new Promise<any>((resolve, reject) => {
      result.subscribe(resolve as any, reject as any);
    });

  }

  getPoliticians() {
    return this.request('get', `${baseUrl}/politician`);
  }

  getPolitician(id: string) {
    return this.request('get', `${baseUrl}/politician/${id}`);
  }

  getResults() {
    return this.request('get', `${baseUrl}/vote/`);
  }
  getResult(id: number) {
    return this.request('get', `${baseUrl}/vote/result/${id}`);
  }

  createPolitician(politician: Politician) {
    return this.request('post', `${baseUrl}/politician`, politician);
  }

  updatePolitician(politician: Politician) {
    return this.request('post', `${baseUrl}/politician/${politician.id}`, politician);
  }

  deletePolitician(id: number) {
    return this.request('delete', `${baseUrl}/politician/${id}`, null, 'text');
  }
}
