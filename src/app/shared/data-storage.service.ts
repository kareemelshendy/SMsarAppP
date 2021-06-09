import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Clients } from "../main-page/client.model";
import { catchError, map, tap } from "rxjs/operators";

import { ClientsService } from "../main-page/client.service";
import { Transactions } from "../operations-page/transaction.model";
import { TransactionService } from "../operations-page/transaction.service";
import { AdminService } from "../admin/admin.service";
import { Users } from "../admin/users.model";
import { throwError } from "rxjs";
import { User } from "../login/user.model";

@Injectable({ providedIn: "root" })
export class DataStorageService {
  token;

  constructor(
    private __http: HttpClient,
    private clientService: ClientsService,
    private transactionService: TransactionService,
    private adminService: AdminService
  ) {}
  url = "https://clerk-new.herokuapp.com/client";

  // ***** Clients ****
  storeClients(newClient: any) {
    return this.__http.post(this.url, newClient,{headers:this.reqHeader()}).pipe(
      catchError((errorRes) => {
        let errorMessage = "";
        if (errorRes.error || errorRes.error.error) {
          errorMessage = errorRes.error.message;
          return throwError(errorMessage);
        }
      })
    );
  }

  fetchClient() {
    return this.__http.get<Clients[]>(this.url,{headers:this.reqHeader()}).pipe(
      tap((clients) => {
        this.clientService.setClients(clients);
        console.log(clients);
      })
    );
  }

  deleteClient(id) {
    this.__http
      .delete("https://clerk-new.herokuapp.com/client/" + id,{headers:this.reqHeader()})
      .subscribe((data) => {
        console.log(data);
      });
  }

  //  ****** Transaction ****

  storeTransaction(newTransaction: any) {
    return this.__http.post(
      "https://clerk-new.herokuapp.com/transactions/",
      newTransaction
    ,{headers:this.reqHeader()});
  }

  fetchtTransaction() {
    return this.__http.get<any>(
      `https://clerk-new.herokuapp.com/transactions`
    ,{headers:this.reqHeader()});
    // .subscribe((transactions) => {
    //   this.transactionService.SetTransaction(transactions);
    //   console.log(transactions);

    // });
  }

  deletetTransaction(id) {
    this.__http
      .delete("https://clerk-new.herokuapp.com/transactions/" + id,{headers:this.reqHeader()})
      .subscribe((data) => {
        console.log(data);
      });
  }

  updateTransaction(id, newTrasnaction) {
    this.__http
      .put("https://clerk-new.herokuapp.com/transactions/" + id, newTrasnaction,{headers:this.reqHeader()})
      .subscribe((res) => {
        console.log(res);
      });
  }

  // ********* Dashborad ******
  fetchTotal() {
    return this.__http.get(
      "https://clerk-new.herokuapp.com/transactions/dashboard",{headers:this.reqHeader()}
    );
  }

  // ************ users **********
  fetchUsers() {
    
    return this.__http
      .get<Users[]>("https://clerk-new.herokuapp.com/user",{headers:this.reqHeader()})
      .subscribe((usres) => {
        this.adminService.setusers(usres);
      });
  }

  updateUser(id, newUser) {
    this.__http
      .put("https://clerk-new.herokuapp.com/user/" + id, newUser,{headers:this.reqHeader()})
      .subscribe((res) => {
        console.log(res);
      });
  }

  deleteUser(id) {
    this.__http
      .delete("https://clerk-new.herokuapp.com/user/" + id,{headers:this.reqHeader()})
      .subscribe((data) => {
        console.log(data);
      });
  }


  // Handle req Header
  reqHeader(){
    // Get Token For  Authorization
    const userData: {
      name: string;
      role: string;
      __token: string;
    } = JSON.parse(localStorage.getItem("userData"));
    let reqHeader= new HttpHeaders({
      
      'Authorization': `Bearer ${userData.__token}`
    })
    return reqHeader
  }
}


