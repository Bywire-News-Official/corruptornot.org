import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Config } from '../config'

@Component({
  selector: 'app-result-most',
  templateUrl: './result-most.component.html',
  styleUrls: ['./result-most.component.css']
})
export class ResultMostComponent implements OnInit {

  conf = new Config();
  server_url = this.conf.serverBaseURL;
  politicians:any;
  corrupt_percent =  0;
  result = 'Corrupt';
  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.http.get(this.server_url+'/politician').subscribe((data:any) => {
      this.politicians = data;
      let x = 1;
      for(let p of this.politicians){
        let corrupt = p.corrupt;
        let not_corrupt = p.not_corrupt;
        let votes = p.votes; 
        this.corrupt_percent =  (corrupt / votes) * 100;  
        p.corrupt_percent = this.corrupt_percent;    
        if(this.corrupt_percent < 40){
          p.result = 'Not Corrupt';
        }else{
          p.result = 'Corrupt';
        }
        x += 1; 
      }
      console.dir(this.politicians);
      this.politicians.sort((a:any, b:any) => (a.corrupt_percent < b.corrupt_percent ? 1 : -1))
      console.log(this.politicians);
      }, error => console.error(error));  
  }

}
