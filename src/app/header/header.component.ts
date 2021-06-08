import { Component, OnDestroy, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import { AuthService } from "../login/auth.service";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"],
})
export class HeaderComponent implements OnInit, OnDestroy {
  isAuthenticated = false;
  private userSub: Subscription;

  constructor(private authService: AuthService) {}

  ngOnInit() {
    console.log("isAuthenticated: " + this.isAuthenticated);
    this.userSub = this.authService.user.subscribe((user) => {
      console.log("User: " + user);
      this.isAuthenticated = !user ? false : true;

      console.log("isAuthenticated: " + this.isAuthenticated);
    });
  }
  onLogout() {
    this.authService.logout();
  }
  ngOnDestroy() {
    this.userSub.unsubscribe();
  }
}
