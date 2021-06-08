import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { BehaviorSubject, throwError } from "rxjs";
import { catchError, tap } from "rxjs/operators";
import { Users } from "../admin/users.model";
import { User } from "./user.model";

interface AuthResponseData {
  name: string;
  role: string;
  token: string;
}
@Injectable({ providedIn: "root" })
export class AuthService {
  user = new BehaviorSubject<User>(null);
  constructor(private _http: HttpClient, private router: Router) {}


  signup(name:string,role:string, password:string){
    return this._http.post("https://clerk-new.herokuapp.com/user",
    {
      name:name,
      role:role,
      password:password
    })
  }

  updateuser(i,user:Users){
    return this._http.patch("https://clerk-new.herokuapp.com/user/"+i,
    user)
  }


  login(name: string, password: string) {
    return this._http
      .post<AuthResponseData>("https://clerk-new.herokuapp.com/user/login", {
        name: name,
        password: password,
      })
      .pipe(
        tap((resData) => {
          this.handleAuthentication(resData.name, resData.role, resData.token);
        })
      );
  }

  logout() {
    this.user.next(null);
    this.router.navigate(["/login-page"]);
    localStorage.removeItem("userData");
  }
  autoLogin() {
    const userData: {
      name: string;
      role: string;
      __token: string;
    } = JSON.parse(localStorage.getItem("userData"));
    if (!userData) {
      return;
    }

    const loadedUser = new User(userData.name, userData.role, userData.__token);
    if (loadedUser.token) {
      this.user.next(loadedUser);
    }
  }

  private handleAuthentication(name: string, role: string, __token: string) {
    const user = new User(name, role, __token);
    this.user.next(user);
    localStorage.setItem("userData", JSON.stringify(user));
  }

  // private handelError(errRes: HttpErrorResponse) {
  //   let errorMessage = "An unknown error occurred:";
  //   if (!errRes.error || !errRes.error.error) {
  //     return throwError(errorMessage);
  //   }
  //   return throwError(errorMessage);
  // }
}
