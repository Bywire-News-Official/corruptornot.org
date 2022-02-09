import { Component } from '@angular/core';
import { AuthenticationService } from './services/authentication.service';
import { Admin } from './models/admin';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'Corrupt or Not? You decide! Who is the most corrupt politican?';
  currentAdmin: Admin | any;
  STORAGE_KEY = 'corrupt-or-not-';

  constructor(private authenticationService: AuthenticationService){
    this.register();
    this.authenticationService.currentAdmin.subscribe((x:any) => this.currentAdmin = x);
  }
  /*
    When the page loads, save the session.    
    */
    public register(){  
      let userData = JSON.stringify({name:'', email:'', hasLogged:false});
      if(!localStorage.getItem(this.STORAGE_KEY)) {
        localStorage.setItem(this.STORAGE_KEY, userData)
      }
    }

}
