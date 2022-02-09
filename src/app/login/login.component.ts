import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { first } from "rxjs/operators";
import { Router, ActivatedRoute } from "@angular/router";
import { AuthenticationService } from "../services/authentication.service";
import { environment } from '../../environments/environment';

/*
 admin login script
*/

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
})
export class LoginComponent implements OnInit {
  loginForm: any;
  loading = false;
  submitted = false;
  returnUrl: string = "";
  error = "";

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService
  ) {
    // redirect to Admin page if already logged in
    if (this.authenticationService.currentAdminValue) {
      this.router.navigate(["/admin"]);
    }
  }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username: ["", Validators.required],
      password: ["", Validators.required],
    });

    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams["returnUrl"] || "/";
  }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    }

    this.loading = true;
    this.authenticationService
      .login(this.f.username.value, this.f.password.value)
      .then((val) => {
        if (val == null) {
          this.error = environment.loginFailMsg;
          this.loading = false;
        } else {
          localStorage.setItem("currentAdmin", JSON.stringify(val));
          this.authenticationService.currentAdminSubject.next(val);
          this.router.navigate([this.returnUrl]);
          //return admin;
        }
      });
  }
  // convenience getter for easy access to form fields
  get f() {
    return this.loginForm.controls;
  }
}
