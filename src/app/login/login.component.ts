import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Router } from "@angular/router";
// import { ToastrService } from 'ngx-toastr';
import { AuthService } from "./auth.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent implements OnInit {
  isloginMode = true;
  isloading = false;
  error = "";

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {}
  onSubmit(form: NgForm) {
    const name = form.value.name;
    const password = form.value.password;
    form.reset();

    this.isloading = true;
    // login
    this.authService.login(name, password).subscribe(
      (resData) => {
        console.log(resData);
        setTimeout(() => {
          this.isloading = false;
        }, 3000);
        this.router.navigate(["/home"]);
      },
      (err) => {
        this.isloading = false;
        this.error = err.error.message;
        console.log(err.error.message);
      }
    );
  }
}
