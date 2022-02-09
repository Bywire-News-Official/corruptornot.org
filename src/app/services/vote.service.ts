import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Vote } from '../models/vote';
import { environment } from '../../environments/environment';

const baseUrl = environment.serverBaseURL;

/*
  service to invoke Vote API
*/
@Injectable({
  providedIn: 'root'
})
export class VoteService {

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

  getVotes() {
    return this.request('get', `${baseUrl}/vote`);
  }

  getVote(id: number) {
    return this.request('get', `${baseUrl}/vote/${id}`);
  }
  getVoteForPolitician(userID: number, politicianID: number) {
    return this.request('get', `${baseUrl}/vote/user/${userID}/politician/${politicianID}`);
  }  

  createVote(vote: Vote) {
    return this.request('post', `${baseUrl}/vote`, vote);
  }

  updateVote(vote: Vote) {
    return this.request('post', `${baseUrl}/vote/${vote.id}`, vote);
  }

  deleteVote(id: number) {
    return this.request('delete', `${baseUrl}/vote/${id}`, null, 'text');
  }
}
