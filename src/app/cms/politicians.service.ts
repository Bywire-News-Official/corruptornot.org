import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Politician } from './politician';
import { Config } from '../config'


const conf = new Config();
const baseUrl = conf.serverBaseURL;

@Injectable({
  providedIn: 'root'
})
export class PoliticiansService {

  constructor(private http: HttpClient) { }

 private async request(method: string, url: string, data?: any, responseType?: any) {

    console.log('request ' + JSON.stringify(data));
    const result = this.http.request(method, url, {
      body: data,
      responseType: responseType || 'json',
      observe: 'body',
      headers: {
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

  createPolitician(politician: Politician) {
    console.log('createPolitician ' + JSON.stringify(politician));
    return this.request('post', `${baseUrl}/politician`, politician);
  }

  updatePolitician(politician: Politician) {
    console.log('updatePolitician ' + JSON.stringify(politician));
    return this.request('post', `${baseUrl}/politician/${politician.id}`, politician);
  }

  deletePolitician(id: number) {
    return this.request('delete', `${baseUrl}/politician/${id}`, null, 'text');
  }
}
