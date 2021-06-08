import { EventEmitter, Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { Clients } from "../main-page/client.model";
import { ClientsService } from "../main-page/client.service";
import { Transactions } from "./transaction.model";

@Injectable({
  providedIn: "root",
})
export class TransactionService {
  formClient = new Subject<number>();
  addToOperation = new Subject<Clients>();
  transactionChanged = new Subject<Transactions[]>();

  startShow = new Subject<number>();
  
  transaction:Transactions;

  constructor(private clientService:ClientsService){

  }

  

  private transactions: Transactions[] = [];

  // overRide the clients array
  SetTransaction(transactions) {
    this.transactions=transactions.pageOfItems;
    this.transactionChanged.next(this.transactions);
  }

  GetTransactions() {
    return this.transactions.slice();
  }

  GetTransaction(index: number) {
    return this.transactions[index];
  }

  AddTransaction(transaction: Transactions) {
    this.transactions.push(transaction);
    // console.log(this.transactions)
    this.transactionChanged.next(this.transactions.slice());
  }

  updateTransaction(index:number , newTrasnaction:Transactions){
    this.transactions[index] = newTrasnaction;
   console.log(this.transactions[index]);
    this.transactionChanged.next(this.transactions.slice());
  }

  deleteTransaction(index: number) {
    this.transactions.splice(index, 1);
    this.transactionChanged.next(this.transactions.slice());
  }

  // getClient(client:Clients){
  //   this.transaction.client = client
  // }


}
