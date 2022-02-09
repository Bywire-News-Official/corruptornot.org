import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';

/*
  component to handle top bar area
*/
@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.css']
})
export class TopBarComponent implements OnInit {
  STORAGE_KEY = 'corrupt-or-not-';
  hasLogged = false;
  intervalID : any = null; 

  constructor(private authenticationService: AuthenticationService) { }

  ngOnInit(): void {
      // Check if user/admin is logged, display logout button
      this.intervalID = setInterval(() => {
        if(localStorage.getItem(this.STORAGE_KEY)) {
            let userData = JSON.parse(localStorage.getItem(this.STORAGE_KEY)!)
            this.hasLogged = !userData.hasLogged;
        }
        if (this.authenticationService.currentAdminValue) { 
            this.hasLogged = false;
        }
      }, 1000); 
  }
  onlogout():void{
    //logout user
    localStorage.removeItem(this.STORAGE_KEY)
    // logout admin too
    this.authenticationService.logout();
    window.location.reload();
  }

}
