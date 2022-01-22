import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Config } from '../config'
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponentComponent } from '../dialog-component/dialog-component.component';

const conf = new Config();
const baseUrl = conf.serverBaseURL;

@Component({
  selector: 'app-politicians',
  templateUrl: './politicians.component.html',
  styleUrls: ['./politicians.component.css']
})
export class PoliticiansComponent implements OnInit {
  politician = [{id:0, name:'', image:'', description:'', corrupt:0, not_corrupt:0, votes:0}]; // politicians.sort( () => Math.random() - 0.5);
  total_politicians = this.politician.length 
  politician_index = 0
  first_politician = this.politician[this.politician_index]
  message = '';
  requiredForm: FormGroup;
  data:any;
  hideBasicInfo = true;
  hideSignInfo = false;
  result = 'Corrupt';
  corrupt_percent = 0;
  not_corrupt_percent = 0;
  selected_percent = this.corrupt_percent;


  view= [700, 400];

  // options
  gradient: boolean = true;
  showLegend: boolean = true;
  showLabels: boolean = true;
  isDoughnut: boolean = false;
  legendPosition: string = 'below';
  chartData = [
    { name: "Corrupt", value: 0 },
    { name: "Not Corrupt", value: 0 },
  ];
  checkoutForm = this.formBuilder.group({
    name:  ['', Validators.required ],
    email: ['', Validators.required ]
  });
  colorScheme = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
  };

  constructor(private http: HttpClient, private formBuilder: FormBuilder, public dialog: MatDialog) { 
      //Object.assign(this, { single });
      this.requiredForm = this.formBuilder.group({
      name: ['', Validators.required ]
      });
       this.myForm();
  }
 private async request(method: string, url: string, data?: any, responseType?: any) {

    //console.log('request ' + JSON.stringify(data));
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
  updatePolitician() {
    //console.log('updatePolitician ' + JSON.stringify(this.first_politician));
    return this.request('post', `${baseUrl}/politician/${this.first_politician.id}`, this.first_politician);
  }
  api_call(){
    this.http.get('https://api.npms.io/v2/search?q=scope:angular').subscribe((data:any) => {
      this.data = data.total;
      console.log(this.data);
      }, error => console.error(error));    
  }
  ngOnInit(): void {
    this.refresh(); 
    
  }
  async refresh() {
    const data = await this.getPoliticians();
    //console.dir(data)
    this.politician = data.sort( () => Math.random() - 0.5);
    this.total_politicians = this.politician.length 
    this.politician_index = 0
    this.first_politician = this.politician[this.politician_index]
    this.chartData = [{ name: "Corrupt", value: this.first_politician.corrupt },
                      { name: "Not Corrupt", value: this.first_politician.not_corrupt}];

    this.calculate_result();
  }
  async corrupt() {
    let corrupt = this.first_politician.corrupt;
    let votes = this.first_politician.votes;
    corrupt += 1
    votes += 1;
    this.first_politician.corrupt = corrupt;
    this.first_politician.votes = votes;
    await this.updatePolitician();
    //window.alert('The politician is corrupt');
    this.message = "Thank you for voting, we got it!";
    this.calculate_result();
  }
  async not_corrupt() {
    let not_corrupt = this.first_politician.not_corrupt;
    let votes = this.first_politician.votes;
    not_corrupt += 1
    votes += 1;
    this.first_politician.not_corrupt = not_corrupt;
    this.first_politician.votes = votes;
    await this.updatePolitician();
    //window.alert('The politician is NOT corrupt');
    this.message = "Thank you for voting, we got it!";
    this.calculate_result();
  }
  on_next(){
    if(this.politician_index < this.total_politicians - 1){
      this.politician_index  += 1;
    }
    this.first_politician = this.politician[this.politician_index] //[this.getRandomInt(this.politician.length)]
    this.message = "";
    this.chartData = [{ name: "Corrupt", value: this.first_politician.corrupt },
                      { name: "Not Corrupt", value: this.first_politician.not_corrupt}];
    this.calculate_result();
    //this.hideBasicInfo = true;
  }
  getRandomInt(max:number) {
    return Math.floor(Math.random() * max);
  }

  calculate_result(){
    let corrupt = this.first_politician.corrupt;
    let not_corrupt = this.first_politician.not_corrupt;
    let votes = this.first_politician.votes;
    this.corrupt_percent =  (corrupt / votes) * 100;
    this.not_corrupt_percent =  (not_corrupt / votes) * 100;
    //console.warn(this.corrupt_percent,'=>', this.not_corrupt_percent)    
    if(this.corrupt_percent < 40){
      this.result = "Not Corrupt";
      this.selected_percent = this.not_corrupt_percent;
    }else{
      this.selected_percent = this.corrupt_percent;
      this.result = "Corrupt";
    }
    this.chartData = [{ name: "Corrupt", value: this.first_politician.corrupt },
                      { name: "Not Corrupt", value: this.first_politician.not_corrupt}];
  }

  onSelect(data:any): void {
    console.log('Item clicked', JSON.parse(JSON.stringify(data)));
  }

  onActivate(data:any): void {
    console.log('Activate', JSON.parse(JSON.stringify(data)));
  }

  onDeactivate(data:any): void {
    console.log('Deactivate', JSON.parse(JSON.stringify(data)));
  }
  onSubmit(): void {
    // Process result data 
    if(!this.checkoutForm.controls['name'].invalid && !this.checkoutForm.controls['email'].invalid){
      console.warn('Your email has been submitted');//, this.checkoutForm.value, '=>', this.checkoutForm.controls);
      this.checkoutForm.reset();
      this.hideBasicInfo = false;
      this.hideSignInfo = true;
      let el = document.getElementById('resultBox');
      this.scroll(el!)
      document.getElementById("resultBox")!.scrollIntoView({
        behavior: "smooth",
        block: "start",
        inline: "nearest"
      });

    }else{
      console.warn('Invalid form');//, this.checkoutForm.value, '=>', this.checkoutForm.controls['name'].value);
    }
      document.getElementById("resultBox")!.scrollIntoView({
        behavior: "smooth",
        block: "start",
        inline: "nearest"
      });
  }
   myForm() {
      this.requiredForm = this.formBuilder.group({
      name: ['', Validators.required ]
      });
   }
  scroll(el: HTMLElement) {
      el.scrollIntoView();
  }
  showDialog(){
    const dialogRef = this.dialog.open(DialogComponentComponent, {
      width: '450px',
      height: '200px'
    }); 
    setTimeout(() => {
      dialogRef.close();
    }, 10000);
  }
}
